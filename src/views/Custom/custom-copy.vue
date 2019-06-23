<template>
  <div class="quotationTabs">
    <tabs v-model='all' @getMarketType=getMarketType>
      <pane v-for="item in tradeType" :key="item.id" class="tabTitle" :label="item.title"  >
            <div class="tableBox">
              <v-table
                :columns="item.columns"
                :table-data="item.data"
                :height="500"
                :show-vertical-border='false'
                :show-horizontal-border='false'
                is-horizontal-resize
                is-vertical-resize 
                :column-cell-class-name="columnCellClass"
                :row-click="handleClick"
                style="width:100%; height: 100%"
              ></v-table>
           </div>
      </pane>
    </tabs>
  </div>
</template>
<script>
import tabs from '../../components/Quotation/tabs.vue';
import pane from '../../components/Quotation/pane.vue';
import nameTwo from '../../components/Quotation/nameTwo.vue';
// import { CheetahWS } from '../../assets/js/CheetahWS.js';
// import { ReqMsg } from '../../assets/js/BaseMsg';
import Vue from 'vue';
Vue.component('nameTwo', nameTwo);
export default {
  name: 'frozen-title-olcolumns',
  components: {
    tabs,
    pane
  },
  data() {
    return {
      all: 0,
      marketType: 100,
      columnsAsync: [
        {
          title: '名称代码',
          field: 'name',
          isResize: true,
          width: 45,
          // titleAlign: 'center',
          // columnAlign: 'center',
          componentName: 'nameTwo'
        },
        {
          title: '最新价',
          field: 'newPrice',
          isResize: true,
          width: 10
        },
        {
          title: '涨跌额',
          field: 'upDown',
          isResize: true,
          width: 30,
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            return rowData.upDown >= 0 ? '+' + rowData.upDown : rowData.upDown;
          }
        },
        {
          title: '涨跌幅',
          field: 'upDownRate',
          isResize: true,
          width: 15,
          formatter: (rowData, rowIndex, pagingIndex, field) => {
            let num = Number(rowData.upDownRate) * 100;
            return this.formateData(num) + '%';
          }
        }
      ],
      columnsStatic: [
        {
          title: '时间',
          field: 'createDate',
          isResize: true,
          width: 5,
          titleAlign: 'center',
          columnAlign: 'center',
          componentName: 'nameTwo'
        },
        {
          title: '黄金延期',
          field: 'auDirection',
          isResize: true,
          width: 20,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter: this.formateDirection
        },
        {
          title: '迷你黄金延期',
          field: 'mAuDirection',
          isResize: true,
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter: this.formateDirection
        },
        {
          title: '白银延期',
          field: 'agDirection',
          isResize: true,
          width: 25,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter: this.formateDirection
        }
      ],
      tradeType: []
    };
  },
  async created() {
    document.title = '行情';
    // await this.wsInit();
    await this.wsSendMsg();
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      //查询分类
      // let res = await this.$http.getTD('categorys', {});
      let res = {
        data: {
          code: 200,
          data: [
            {
              id: 2,
              code: '100',
              name: '上海黄金'
            },
            {
              id: 3,
              code: '200',
              name: '外汇'
            },
            {
              id: 4,
              code: '300',
              name: '商品'
            },
            {
              id: 5,
              code: '400',
              name: '全球'
            },
            {
              id: 6,
              code: '500',
              name: '方向'
            }
          ]
        }
      };
      // if (res.data.code === 200) {
      //   this.tradeType = res.data.data.map(item => {
      //     let columns =
      //       item.code === '500' ? this.columnsStatic : this.columnsAsync;
      //     return {
      //       title: item.name,
      //       id: item.id,
      //       code: item.code,
      //       columns,
      //       data: []
      //     };
      //   });
      // }

      if (res.data.code === 200) {
        this.tradeType = res.data.data.map(item => {
          let columns =
            item.code === '500' ? this.columnsStatic : this.columnsAsync;
          return {
            title: item.name,
            id: item.id,
            code: item.code,
            columns: columns,
            data: []
          };
        });
      }
      this.getContractList(100);
    },
    formateDirection(rowData, field) {
      if (rowData.auDirection === '010') {
        return '多付空';
      }
      if (rowData.auDirection === '020') {
        return '空付多';
      }
      if (rowData.auDirection === '030') {
        return '持平';
      }
    },
    // formattDirection(rowData, rowIndex, pagingIndex, field) {
    //   let codeToData = {
    //     '010': '多付空',
    //     '020': '空付多',
    //     '030': '持平'
    //   };
    //   return codeToData[rowData[field]];
    // },
    formateData(data) {
      let num = Number(data);
      if (num === 0) {
        return '0.00';
      }
      if (num > 0 && num < 0.1) {
        return '+0.01';
      }
      if (num > -0.01 && num < 0) {
        return '-0.01';
      }
      return num > 0 ? '+' + num.toFixed(2) : num.toFixed(2);
    },
    //交易列表
    async getContractList(category) {
      let res;
      category = Number(category);
      if (category !== 500) {
        // res = await this.$http.getTD('contracts?category=' + category, {});
        res = {
          data: {
            code: 200,
            data: [1, 2, 3, 1, 2, 3, 1, 2, 3].map(item => {
              return {
                name: `行情${item}`,
                newPrice: (item + 2) * category,
                upDown: (item - 2) * 10,
                upDownRate: ((item - 2) * 10) / ((item + 2) * category),
                status: item > 2 ? 'sale' : ''
              };
            })
          }
        };
        res.data.data.forEach(item => {
          item.isUp = item.upDown >= 0 ? true : false;
        });
      } else {
        //递延方向
        // res = await this.$http.getTD('deferredDirections', {});
        res = {
          data: {
            code: 200,
            data: [1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 1, 2].map(item => {
              return {
                name: `2017-05-0${item}`,
                auDirection: `0${item}0`,
                mAuDirection: `0${item}0`,
                agDirection: `0${item}0`
              };
            })
          }
        };
        // ********************************************
        res.data.data.forEach(item => {
          item.show = true;
        });
      }

      this.tradeType.forEach(item => {
        if (item.code == category) {
          this.$set(item, 'data', res.data.data);
        }
      });
    },

    async getMarketType(val) {
      this.marketType = this.tradeType[val].code;
      await this.getContractList(this.marketType);
    },

    //点击跳转页面
    handleClick(rowIndex, rowData, column) {
      // console.log(rowIndex, rowData, column);
      this.goTo('tdMarketDetail', {
        marketType: this.marketType,
        isTrade: rowData.status,
        code: rowData.code
      });
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (
        columnName === 'newPrice' ||
        columnName === 'upDown' ||
        columnName === 'upDownRate'
      ) {
        // console.log(rowData);
        if (rowData.isUp) {
          return 'color-red';
        } else {
          return 'color-green';
        }
      }
      if (
        columnName === 'auDirection' ||
        columnName === 'mAuDirection' ||
        columnName === 'agDirection'
      ) {
        if (rowData[columnName] === '010') {
          return 'color-red';
        } else if (rowData[columnName] === '020') {
          return 'color-green';
        } else {
          return 'color-black';
        }
      }
      return '';
    },
    //Ws连接
    // async wsInit() {
    //   await CheetahWS.getInstance().connWebSocket({
    //     wsUrl: $globalVar.TD_WS_LINK,
    //     certID: 'C000',
    //     charSet: 'UTF-8'
    //   });
    //   CheetahWS.getInstance().registerSendHandler(reqMsg => {
    //     // console.log("-->请求报文：" + JSON.stringify(reqMsg));
    //   });
    //   CheetahWS.getInstance().registerConnectHandler(() => {
    //     // let wsUrl = CheetahWS.getInstance().wsConfig.wsUrl + "?Charset=" + CheetahWS.getInstance().wsConfig.charSet + "&CertID=" + CheetahWS.getInstance().wsConfig.certID;
    //     // console.log('服务器连接中... ' + wsUrl);
    //   });
    //   CheetahWS.getInstance().registerOpenHandler(() => {
    //     // console.log('服务器连接成功！');
    //   });
    //   CheetahWS.getInstance().registerCloseHandler(() => {
    //     // console.log('服务器连接已关闭！');
    //   });
    //   CheetahWS.getInstance().registerNotifyHandler(this.getPushMsg);
    // },
    async wsSendMsg(contractCode) {
      // JSU7BN2E01061108000000001
      const state = {
        sExchCode: '106110',
        cMsgType: 0,
        sUserID: '',
        sSessionID: '',
        reqBody: `{"oper_flag" : "1","list_subs_prod_code" : ["Au(T+D)", "mAu(T+D)", "Ag(T+D)"]}`
        // reqBody: `{"oper_flag" : "1","list_subs_prod_code" : ["USD", "USDRMB", "USDCNH"]}`
        // reqBody: `{"oper_flag" : "1","list_subs_prod_code" : ["000001", "000300"]}`
      };
      // let reqMsg = new ReqMsg(state.sExchCode);
      // reqMsg.cEncryptMode = 0; //报文加密标志  0:明文
      // reqMsg.sExchCode = state.sExchCode; //交易代码
      // reqMsg.cMsgType = state.cMsgType; //报文类型  0：客户请求 1：服务端应答 2：服务端推送
      // reqMsg.sUserID = state.sUserID; //用户ID
      // reqMsg.sSessionID = state.sSessionID; //会话ID
      // reqMsg.sSrcJsonMsg = state.reqBody; //业务报文体  字符串Json原文
      // this.setState({
      //   sSerialNo: reqMsg.sSerialNo
      // })
      // this.addRspMsg("-->请求报文：" + JSON.stringify(reqMsg));
      // console.log('reqMsg :', reqMsg);
      // let resMsg = await CheetahWS.getInstance().sendMsgAsync(reqMsg);
      // if (resMsg.optionCode == 0) {
      //   // console.log('--->响应报文(成功):'+ JSON.stringify(resMsg.sBody));
      // } else if (resMsg.optionCode == 3) {
      //   // console.log("-->响应报文(失败)：" + JSON.stringify(resMsg));
      // } else {
      //   // console.log("-->发送失败：" + JSON.stringify(resMsg));
      // }
    },
    //关闭Ws
    // wsColsed() {
    //   CheetahWS.getInstance().closeWebSocket();
    // },
    getPushMsg(res) {
      // this.dealWsData(data)
      const sUserID = res.sUserID.replace(/\s/g, '');
      const sBody = this.arr2obj(res.sBody);
      const shGold = this.tradeType.find(item => item.id === 2);
      shGold.data.map(item => {
        if (item.nameCode === sUserID) {
          item.upDown = !sBody.upDown ? item.upDown : sBody.upDown;
          item.upDownRate = !sBody.upDownRate
            ? item.upDownRate
            : sBody.upDownRate;
          item.isUp = item.upDown >= 0 ? true : false;
          item.newPrice = Number(sBody.last || item.newPrice || '--');
        }
      });
    },
    //处理推送数据转为页面数据
    dealWsData(data) {
      const sUserID = res.sUserID.replace(/\s/g, '');
      const sBody = this.arr2obj(res.sBody);
    },
    // 将ws二维数组转为对象
    arr2obj(arr) {
      var obj = {};
      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
          obj[arr[i][0]] = arr[i][1];
        }
      }
      return obj;
    }
  }
};
</script>
<style lang="less" scoped>
.v-table-views {
  border: none;
  overflow: visible;
  /deep/ .v-table-body-cell {
    height: 100% !important;
    margin-bottom: px2rem(20px);
    line-height: 1 !important;
  }
  /deep/ .table-title {
    //名称代码距离
    padding: 0 px2rem(30px);
  }
  /deep/ .v-table-body-class {
    border-top: 1px solid #ccc;
    padding-top: px2rem(20px);
    padding-left: px2rem(15px) !important;
  }
  /deep/.v-table-btable {
    //白银延期距离
    padding-left: px2rem(30px) !important;
  }
  /deep/ .v-table-row {
    .color-red {
      color: red;
    }
    .color-green {
      color: green;
    }
    .color-black {
      color: black;
    }
  }
}
//修改外汇表格样式
// /deep/ .v-table-row td{
//   width:px2rem(187.5px);
//   /deep/ .v-table-body-cell{
//     width:px2rem(187.5px)!important;
//   }
//   span{
//     width:100%;
//     display:inline-block;
//   }
// }
.containerMarket {
  width: 100%;
  height: 100%;
  .marketData {
    width: 100%;
    .table {
      .tableHead {
        display: flex;
        justify-content: space-around;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        align-content: center;
        margin-top: 20px;
        border-bottom: 1px solid #ccc;
        .tableItem {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-content: center;
          height: 15px;
          line-height: 15px;
        }
        .tableItem li {
          width: 100%;
        }
      }
      .tableBody {
        display: flex;
        justify-content: space-around;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        align-content: center;
        text-align: center;
        margin-top: 15px;
      }
    }
    .tableBox {
      // padding-left: px2rem(25px);
      flex: 1;
      display: flex;
      // justify-content: space-around;
      // align-content: center;
    }
  }
}
</style>