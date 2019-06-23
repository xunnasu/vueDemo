/**
 * 模块名称：Cheetah WebSocket
 * 功能说明：
 * @Author= tangyubin
 * @Date= 2018/4/18 上午11:01
 */

// import _ from 'lodash';
const _ = {
  isFunction: (target) => {
    // return typeof target === 'function';
    return Object.prototype.toString.call(target) === '[object Function]';
  }
}

const Constants = {
  //protocol
  LEN_HEADER: 37, //35, //协议头长度
  LEN_SESSION_ID: 12, //10, //协议sSessionID字段长度
}

const RspCode = {
  SUCCEED: '000000', //处理成功
  ER9999: 'ER9999', //处理失败
}

export const Api = {
  getBaseWsURL() {
    return 'ws://svn.wecheetah.com:19090/cheetah';
  },
}

export class WsConfig {
  constructor(url, charSet, certID) {
    this.wsUrl = url;
    this.needReconnect = true; // 是否需要重连
    this.connectTimeout = 0; //0s 使用默认
    this.requestTimeout = 20; //20s

    this.connectType = 1; //连接类型 1：长连接，2：定时短连接
    this.shortConnectTimeout = 60 * 1000; //60s 短连接超时时间

    this.charSet = charSet || 'UTF-8'; //字符集
    this.certID = certID || 'C000'; //证书编码
  }
}

export class CheetahWS {
  static instance = null;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new this;
    }
    return this.instance;
  }

  constructor() {
    this._host_ip = ""; //（服务器IP地址）
    this._host_port = ""; //（服务器端口）
    this._charset = ""; //（字符集，默认为  utf-8）
    this._cert_id = ""; //(证书编号，需程序主动设置）
    this._public_key = ""; //(证书公钥，通过 CN01 交易查询获得)
    this._des3_default_key = ""; //(3DES加密的默认密钥，通过 CN01 交易查询获得）
    this._des3_iv = ""; // (3DES加密的IV向量，通过 CN01 交易查询获得)

    this.MAX_SEND_TIMEOUT = 15000; //发送超时时间
    this.connStatus = 0; //0:断开，1：已连接
    this.ws = null;
    this.wsConfig = new WsConfig(Api.getBaseWsURL(), null, null);

    // this.msgSendQueue = {}; //消息回调集合 {sSerialNo:[{interval:0,callback:function}]}
    this.msgSendQueue = {}; //消息发送队列
    this.timeoutTimer = null;
    this.reConnTimer = null;

    this.connectHandler = null;
    this.openHandler = null;
    this.closeHandler = null;
    this.sendHandler = null;
    this.notifyHandlerList = [];
    this.messageHandler = null;

    this.lastUpateTimestamp = Date.parse(new Date());
    this.shortConnectTimer = null;
  }

  registerConnectHandler(callback) {
    this.connectHandler = callback;
  }

  unRegisterConnectHandler() {
    this.connectHandler = null;
  }

  registerOpenHandler(callback) {
    this.openHandler = callback;
  }

  unRegisterOpenHandler() {
    this.openHandler = null;
  }

  registerCloseHandler(callback) {
    this.closeHandler = callback;
  }

  unRegisterCloseHandler() {
    this.closeHandler = null;
  }

  registerSendHandler(callback) {
    this.sendHandler = callback;
  }

  unRegisterSendHandler() {
    this.sendHandler = null;
  }

  registerNotifyHandler(callback) {
    this.notifyHandlerList.push(callback);
  }

  registerMessageHandler(callback) {
    this.messageHandler = callback;
  }

  unRegisterMessageHandler() {
    this.messageHandler = null;
  }

  unRegisterNotifyHandler(callback) {
    let mark = -1;
    for (let i = 0; i < this.notifyHandlerList.length; i++) {
      if (this.notifyHandlerList[i] == callback) {
        mark = i;
        break;
      }
    }
    if (mark != -1) {
      this.notifyHandlerList.splice(mark, 1);
    }
  }

  /**
   * 连接WebSocket
   * @param config
   */
  async connWebSocket(config, state) {
    if (!window.WebSocket) {
      alert("浏览器不支持  WebSocket!");
    }

    this.lastUpateTimestamp = Date.parse(new Date());

    if (this.connStatus == 1) {
      this.closeWebSocket();
    }

    CheetahWS.getInstance().connectHandler && CheetahWS.getInstance().connectHandler();

    if (config) { // _.isObject(config)) {
      this.wsConfig = config;
    }

    if (this.wsConfig.connectType == 2 && this.shortConnectTimer == null) {
      this.shortConnectTimer = setInterval(() => {
        let now = Date.parse(new Date());
        if (now - this.lastUpateTimestamp > this.wsConfig.shortConnectTimeout) {
          CheetahWS.getInstance().closeWebSocket();

          clearInterval(this.shortConnectTimer);
          this.shortConnectTimer = null;
        }
      }, 1000)
    }
    try {
      let wsUrl = this.wsConfig.wsUrl + "?Charset=" + this.wsConfig.charSet +
        "&CertID=" + this.wsConfig.certID;
      // console.log('-->connecting ws...:', wsUrl);
      this.ws = new WebSocket(wsUrl);
      this.ws.binaryType = 'blob';
      //监听消息
      this.ws.onmessage = function (event) {
        // console.log('onmessage----> :', onmessage);
        var crspMsg = event.data;
        if (event.data instanceof Blob) {
          var blob = event.data;

          var newblob = blob.slice(0, blob.size);

          var reader = new FileReader();
          reader.readAsText(newblob);
          //当读取操作成功完成时调用.
          reader.onload = function (evt) {

            if (evt.target.readyState == FileReader.DONE) {
              CheetahWS.getInstance().lastUpateTimestamp = Date.parse(new Date());

              var result = evt.target.result;
              let resultMap = {}; //new ResMsg();
              resultMap.optionCode = 0;
              resultMap.sSerialNo = result.substr(0, 8);
              resultMap.cEncryptMode = result.substr(8, 1);
              resultMap.sExchCode = result.substr(9, 5);
              resultMap.cMsgType = result.substr(14, 1); //0：客户请求 1：服务端应答 2：服务端推送
              resultMap.sUserID = result.substr(15, 10);
              resultMap.sSessionID = result.substr(25, Constants.LEN_SESSION_ID);

              // var e_codeAtype = result.substring(10, 10 + 5);
              if (resultMap.sExchCode) { //行情信息push
                // console.log('-->push 行情 msg',)
                CheetahWS.getInstance().progHq(result.substring(0, Constants.LEN_HEADER), crspMsg, (lfvResult) => {
                  // console.log('---->lfvResult', lfvResult);
                  resultMap.sBody = lfvResult;
                  CheetahWS.getInstance().callbackResMsg(resultMap);
                });
              } else {
                try {
                  resultMap.sBody = JSON.parse(result.substr(Constants.LEN_HEADER));
                  // console.log('WS res ResultMap --->' + JSON.stringify(resultMap));
                  if (resultMap.sBody) {
                    if (resultMap.sBody.RspCode != RspCode.SUCCEED) {
                      // resultMap.optionCode = resultMap.sBody.RspCode;
                      resultMap.optionCode = 3;
                      resultMap.errorMsg = resultMap.sBody.RspMsg;
                      //CheetahMessage.warn(resultMap.sBody.RspMsg);
                    }
                  } else {
                    resultMap.optionCode = 3;
                    resultMap.errorMsg = '数据协议内容不能为空';
                    resultMap.srcContent = result;
                    console.log('数据协议内容不能为空');
                    //CheetahMessage.error('数据协议内容不能为空');
                  }
                  CheetahWS.getInstance().callbackResMsg(resultMap);
                } catch (e) {
                  console.log('数据协议格式解析错误');
                  //CheetahMessage.error('数据协议格式解析错误');
                  resultMap.optionCode = 3;
                  resultMap.errorMsg = '数据协议格式解析错误';
                  resultMap.srcContent = result;
                  CheetahWS.getInstance().callbackResMsg(resultMap);
                }

              }
            }
          }
        } //end if
      } //end this.ws.onmessage

      //关闭WebSocket
      this.ws.onclose = function (event) {
        CheetahWS.getInstance().connStatus = 0;
        console.log('-- ws onclose');
        CheetahWS.getInstance().closeHandler && CheetahWS.getInstance().closeHandler();
        CheetahWS.getInstance().onConnectFailed();
      }
      //打开WebSocket
      this.ws.onopen = function (event) {
        CheetahWS.getInstance().connStatus = 1;
        console.log('-- ws onopen');
        CheetahWS.getInstance().onConnectSuccess();
        CheetahWS.getInstance().openHandler && CheetahWS.getInstance().openHandler();

      }
      this.ws.onerror = function (event) {
        CheetahWS.getInstance().connStatus = 0;
        console.log('-- ws onerror');
        alert('网络错误，请稍后再试')
        CheetahWS.getInstance().closeHandler && CheetahWS.getInstance().closeHandler();
        CheetahWS.getInstance().onConnectFailed();
      }
    } catch (err) {
      console.log('连接异常' + err.stack);
    }
  }

  /**
   * 关闭WebSocket
   */
  closeWebSocket(state) {
    console.log('-- closeWebSocket ', state)
    if (this.connStatus == 1) {
      // 关闭连接将订阅回调清空--lijing
      this.notifyHandlerList = [];
      // end
      this.ws.close();
      this.connStatus = 0;
    }

    if (state === 1) {
      if (this.wsConfig.needReconnect) {
        if (this.reConnTimer == null) {
          this.reConnTimer = setInterval(() => {
            this.connWebSocket(null, 0);
          }, 5000)
        }
      }
    } else if (state === 2) {
      if (this.reConnTimer != null) {
        clearTimeout(this.reConnTimer);
        this.reConnTimer = null;
      }
    }
  }

  /**
   * 发送消息，异步方式
   * @param reqMsg
   * @returns {Promise}
   */
  sendMsgAsync(reqMsg) {
    return new Promise((resolve, reject) => {
      try {
        CheetahWS.getInstance().sendMsgWithCallback(reqMsg, (result) => {
          resolve(result);
        })
      } catch (e) {
        reject(e);
      }
    })
  }

  /**
   * 发送消息
   * @param reqMsg
   * @param callback
   */
  sendMsgWithCallback(reqMsg, callback) {
    this.lastUpateTimestamp = Date.parse(new Date());

    if (!reqMsg) return;

    if (this.connStatus == 0) {
      // //CheetahMessage.error('服务器连接失败，请稍后重试');
      // callback({
      //     optionCode: 1,
      //     errorMsg:'服务器连接中...'
      // })
      this.msgSendQueue[reqMsg.sSerialNo] = {
        interval: 0,
        reqMsg,
        callback,
      };
      this.connWebSocket(null, 1);
      return;
    }

    // if (!this.msgSendQueue[reqMsg.sSerialNo]) {
    //     this.msgSendQueue[reqMsg.sSerialNo] = {};
    // }
    // this.msgSendQueue[reqMsg.sSerialNo].push({
    //     interval: 0,
    //     callback: callback,
    // });
    this.msgSendQueue[reqMsg.sSerialNo] = {
      interval: 0,
      reqMsg,
      callback,
    };

    var reqJson = reqMsg.sSrcJsonMsg; //document.getElementById("reqJson").value;
    //组报文头
    var cEncryptMode = reqMsg.cEncryptMode; //document.getElementById("cEncryptMode").value;
    var hear = "" + reqMsg.sSerialNo; //this.getSerialNo();
    // document.getElementById("sSerialNo").value = hear;
    hear += cEncryptMode;

    hear += this.addLeftSpace(reqMsg.sExchCode, 5);

    hear += reqMsg.cMsgType; //document.getElementById("cMsgType").value;

    hear += this.addLeftSpace(reqMsg.sUserID, 10);

    hear += this.addRightSpace(reqMsg.sSessionID, Constants.LEN_SESSION_ID);

    if (cEncryptMode == 0) {
      CheetahWS.getInstance().sendHandler && CheetahWS.getInstance().sendHandler(reqMsg);
      // console.log('reqMsg', reqMsg)
      try {
        this.ws.send(hear + reqJson);
      } catch (e) {
        console.log('-->e', e);
      }
    } else if (cEncryptMode == 3) {
      // addRspMsg("send>" + hear
      //     + en3des("FAJA2LFA9WR9FSASF92FMMAF", "8A402C31", reqJson));
      this.ws.send(hear +
        this.en3des("FAJA2LFA9WR9FSASF92FMMAF", "8A402C31", reqJson));
    } else if (cEncryptMode == 4) {

    }
  }

  onConnectSuccess() {
    if (this.reConnTimer != null) {
      clearTimeout(this.reConnTimer);
      this.reConnTimer = null;
    }

    if (this.timeoutTimer == null) {
      this.timeoutTimer = setInterval(() => {
        this.checkSendTimeout();
      }, 1000);
    }

    Object.keys(this.msgSendQueue).forEach((key, index) => {
      let item = this.msgSendQueue[key];
      this.sendMsgWithCallback(item.reqMsg, item.callback);
    })
  }

  onConnectFailed() {
    if (this.timeoutTimer) {
      clearInterval(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    Object.keys(this.msgSendQueue).forEach((key, index) => {
      let item = this.msgSendQueue[key];
      item.callback({
        optionCode: 1,
        errorMsg: '服务器连接失败，请稍后重试',
        sBody: {
          RspMsg: '服务器连接失败，请稍后重试'
        },
        '请求报文: ': this.msgSendQueue[key],
      })
    })
    this.msgSendQueue = {};

    if (this.wsConfig.needReconnect) {
      if (this.reConnTimer == null) {
        this.reConnTimer = setInterval(() => {
          this.connWebSocket(null, 0);
        }, 5000)
      }
    }
  }

  /**
   * 消息回调
   * @param resultMap
   */
  callbackResMsg(resultMap) {
    if (resultMap.cMsgType == 1) { //iq响应
      let sendMsg = this.msgSendQueue[resultMap.sSerialNo];
      if (sendMsg && _.isFunction(sendMsg.callback)) {
        sendMsg.callback(resultMap);
        delete this.msgSendQueue[resultMap.sSerialNo];
      }
    } else if (resultMap.cMsgType == 2) { //message推送
      if (resultMap.sExchCode == "12846") {
        if (_.isFunction(this.messageHandler) && resultMap.sBody.oper_flag < 3) {
          this.messageHandler(resultMap); //sExchCode:12841
        } else {
          this.notify(resultMap);
        }
      } else {
        // console.log("接收到了推送数据" + resultMap.sExchCode);
        this.notify(resultMap);
      }
    }
  }

  /**
   * 发送超时检测
   */
  checkSendTimeout() {
    Object.keys(this.msgSendQueue).forEach((key, index) => {
      let item = this.msgSendQueue[key];
      if (item.interval > this.MAX_SEND_TIMEOUT) { //发送超时
        console.log('请求超时,请稍后重试');
        alert('请求超时,请稍后重试')
        //CheetahMessage.error('请求超时,请稍后重试');
        item.callback({
          optionCode: 2,
          errorMsg: '请求超时,请稍后重试',
          sBody: {
            RspMsg: '请求超时,请稍后重试',
          },
          sSerialNo: key,
        })
        delete this.msgSendQueue[key]
      } else {
        item.interval += 1000;
      }
    })
  }

  //通知
  notify(pushMsg) {
    for (let callback of this.notifyHandlerList) {
      callback(pushMsg);
    }
  }

  /**
   * 初妈化行情属性值   序号 对应的英文名称
   * @returns {any[]}
   */
  getLfvFields() {
    let lfv_fields = new Array();
    lfv_fields[0] = "lastSettle";
    lfv_fields[1] = "lastClose";
    lfv_fields[2] = "open";
    lfv_fields[3] = "high";
    lfv_fields[4] = "low";
    lfv_fields[5] = "last";
    lfv_fields[6] = "close";
    lfv_fields[7] = "settle";
    lfv_fields[8] = "bid1";
    lfv_fields[9] = "bidLot1";
    lfv_fields[10] = "bid2";
    lfv_fields[11] = "bidLot2";
    lfv_fields[12] = "bid3";
    lfv_fields[13] = "bidLot3";
    lfv_fields[14] = "bid4";
    lfv_fields[15] = "bidLot4";
    lfv_fields[16] = "bid5";
    lfv_fields[17] = "bidLot5";
    lfv_fields[18] = "ask1";
    lfv_fields[19] = "askLot1";
    lfv_fields[20] = "ask2";
    lfv_fields[21] = "askLot2";
    lfv_fields[22] = "ask3";
    lfv_fields[23] = "askLot3";
    lfv_fields[24] = "ask4";
    lfv_fields[25] = "askLot4";
    lfv_fields[26] = "ask5";
    lfv_fields[27] = "askLot5";
    lfv_fields[28] = "volume";
    lfv_fields[29] = "weight";
    lfv_fields[30] = "highLimit";
    lfv_fields[31] = "lowLimit";
    lfv_fields[32] = "Posi";
    lfv_fields[33] = "upDown";
    lfv_fields[34] = "turnOver";
    lfv_fields[35] = "average";
    lfv_fields[36] = "sequenceNo";
    lfv_fields[37] = "quoteTime";
    lfv_fields[38] = "upDownRate";
    lfv_fields[39] = "bid6";
    lfv_fields[40] = "bidLot6";
    lfv_fields[41] = "bid7";
    lfv_fields[42] = "bidLot7";
    lfv_fields[43] = "bid8";
    lfv_fields[44] = "bidLot8";
    lfv_fields[45] = "bid9";
    lfv_fields[46] = "bidLot9";
    lfv_fields[47] = "bid10";
    lfv_fields[48] = "bidLot10";
    lfv_fields[49] = "ask6";
    lfv_fields[50] = "askLot6";
    lfv_fields[51] = "ask7";
    lfv_fields[52] = "askLot7";
    lfv_fields[53] = "ask8";
    lfv_fields[54] = "askLot8";
    lfv_fields[55] = "ask9";
    lfv_fields[56] = "askLot9";
    lfv_fields[57] = "ask10";
    lfv_fields[58] = "askLot10";
    lfv_fields[59] = "tradeState";
    lfv_fields[60] = "instID";
    lfv_fields[61] = "name";
    lfv_fields[62] = "quoteDate";
    lfv_fields[63] = "bidLot";
    lfv_fields[64] = "askLot";
    lfv_fields[65] = "midBidLot";
    lfv_fields[66] = "midAskLot";
    lfv_fields[67] = "quoteMinute";
    lfv_fields[68] = "quoteDateMinute";
    lfv_fields[69] = "turnOverBillion";
    lfv_fields[70] = "marketCode";
    lfv_fields[71] = "priceUnit";
    return lfv_fields;
  }

  /**
   * 解析单个LFV  返回长度为2的数组   0 为英文名，  1为值
   * @param srcLFV
   * @returns {any[]}
   */
  decodingLFV(srcLFV) {
    let lfv_fields = this.getLfvFields();
    var fh; //符号
    var xs_n; //小数位数
    var ls = srcLFV.substring(0, 8);

    if (ls.substring(0, 1) == "0")
      fh = "";
    else
      fh = "-";

    xs_n = ls.substring(1, 4);
    xs_n = parseInt(xs_n, 2); //转十进制
    //值长度 字节
    var v_n = ls.substring(4, 8);
    v_n = parseInt(v_n, 2); //转十进制
    //行情的字段序号
    var fs = srcLFV.substring(8, 16);
    fs = parseInt(fs, 2); //转十进制
    //字段值
    var vs = srcLFV.substring(16, 16 + 8 * v_n);
    vs = "" + parseInt(vs, 2); //转十进制
    if (xs_n == 0) { //quoteTime的序号为37  09:45:53
      if (fs == 37) {
        if (vs.length < 6)
          vs = "0" + vs;
        vs = vs.substring(0, 2) + ":" + vs.substring(2, 4) + ":" +
          vs.substring(2, 4);
      }
    } else {
      if (vs.length == xs_n)
        vs = "0." + vs;
      else if (xs_n < vs.length)


        vs = vs.substring(0, vs.length - xs_n) + "." +
        vs.substring(vs.length - xs_n, vs.length);
      else { //小数位大于实际值位数
        // lijing fix
        var firstLength = vs.length;
        // console.log('小数位 :', xs_n);
        // console.log('vs.length :', vs.length);
        for (var i = 0; i < xs_n - firstLength; i++)
          vs = "0" + vs;
        vs = "0." + vs;
      }
    }
    // ret = lfv_fields[fs] + "=" + fh + vs;

    var lfv = new Array();
    lfv[0] = lfv_fields[fs];
    lfv[1] = fh + vs;
    return lfv;
  }

  /**
   十进制数字 转成 二进制
   */
  toBinary(num) {

    var str = "" + num;
    var fh = "";
    if ("-" == str.substring(0, 1)) {
      fh = "-";
      str = str.substring(1);
    }
    var snum = new Number(str);
    var result = snum.toString(2);
    var len = result.length;
    var ys = len % 8;
    if (ys != 0) {
      for (var i = 0; i < 8 - ys; i++)
        result = "0" + result;
    }
    return fh + result;
  }

  progHq(hqhead, srcMsg, callback) {
    let lfvResult = [];
    var ExchCode = hqhead.substring(9, 14).trim();
    var prod_code = hqhead.substring(15, 25).trim();
    var hq_time = hqhead.substring(25, Constants.LEN_HEADER).trim();

    //直接解行情 报文体部分
    var newblob = srcMsg.slice(Constants.LEN_HEADER, srcMsg.size);
    var reader = new FileReader();
    reader.readAsArrayBuffer(newblob);
    reader.onload = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
        var readAsArrayBuffer = evt.target.result;
        //Int8Array  1  8 位二补码有符号整数
        //Uint8Array 1  8 位无符号整数
        // var ret = "";
        var arr = new Uint8Array(readAsArrayBuffer);
        var arr_index = 0;
        while (arr_index < arr.length) {
          var l = CheetahWS.getInstance().toBinary(arr[arr_index++]);
          var vlen = parseInt(l.substring(4), 2); //二进制 转 十进制

          var f = CheetahWS.getInstance().toBinary(arr[arr_index++]);
          var v = "";

          for (var i = 0; i < vlen; i++)
            v += CheetahWS.getInstance().toBinary(arr[arr_index++]);

          //名值数组
          var kv = CheetahWS.getInstance().decodingLFV(l + f + v);
          lfvResult.push(kv);
          // updateHq("hq" + prod_code + kv[0], kv[1]);
          // ret += kv[0] + "=" + kv[1] + ",";
        } // end while
        // addRspMsg(ExchCode + " " + prod_code + "[" + hq_time + "] :"
        //     + ret);
        callback(lfvResult);
      }
    } //end reader.onload
  }

  addRightSpace(srcdata, len) {
    var slen = srcdata.length;
    if (slen == len)
      return srcdata;
    else if (slen > len)
      return srcdata.substring(0, len);

    for (var i = 0; i < len - slen; i++)
      srcdata += " ";
    return srcdata;
  }

  addLeftSpace(srcdata, len) {
    var slen = srcdata.length;
    if (slen == len)
      return srcdata;
    else if (slen > len)
      return srcdata.substring(0, len);

    for (var i = 0; i < len - slen; i++)
      srcdata = " " + srcdata;
    return srcdata;
  }


  en3des(key, iv, srcMsg) {

  }

  de3des() {

  }
}
