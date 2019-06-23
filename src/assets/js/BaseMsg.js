/**
 * 模块名称：
 * 功能说明：
 * @Author: tangyubin
 * @Date: 2018/4/19 上午10:54
 */

import CommonProtocol from "./ProtocolUtil";

export class ReqMsg {
  constructor(exchCode) {
    this.sSerialNo = CommonProtocol.getSerialNo(8); //交易流水号 8位
    this.cEncryptMode = CommonProtocol.getEncryptMode(); //报文加密标志  0:明文
    this.sExchCode = exchCode; //交易代码
    this.cMsgType = "0"; //报文类型  0：客户请求 1：服务端应答 2：服务端推送
    this.sUserID = ""; //用户ID
    this.sSessionID = ""; //会话ID
    this.sSrcJsonMsg = ""; //业务报文体  字符串Json原文
  }
}

export class ResMsg {
  constructor() {
    this.sSerialNo = ""; //交易流水号
    this.cEncryptMode = ""; //报文加密标志  0:明文
    this.sExchCode = ""; //交易代码
    this.cMsgType = ""; //报文类型  0：客户请求 1：服务端应答 2：服务端推送
    this.sUserID = ""; //用户ID
    this.sSessionID = ""; //会话ID
    this.sBody = ""; //业务报文体
    //操作码  0:正常且成功, 10:收到响应但RspCode失败，1:连接断开，网络异常，2：请求超时，3：数据异常，4：连接初始化失败，-1：取消请求，
    this.optionCode = "";
    this.errorMsg = "";
    this.srcContent = ""; //响应源数据字符串
  }
}
