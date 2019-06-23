/**
 * 模块名称：
 * 功能说明：
 * @Author: tangyubin
 * @Date: 2018/4/18 下午5:08
 */

const ProtocolUtil = {
  sSerialNo: new Date().getTime(), //报文流水号
  cEncryptMode: '0',  //报文加密标志  0:明文

  /**
     * 获得len位流水号
     *
     * @param {any} len
     * @returns
     */
  getSerialNo(len) {
    this.sSerialNo++;
    let str_36 = this.sSerialNo.toString(36).toUpperCase();
    let slen = str_36.length;
    if (slen == len) {
      return str_36;
    } else if (slen > len) {
      return str_36.substring(0, len);
    } else {
      for (let i = 0; i < len - slen; i++) {
        str_36 = '0' + str_36;
      }
      return str_36;
    }
  },

  /**
     * 获取报文加密标志  0:明文
     *
     * @returns
     */
  getEncryptMode() {
    return this.cEncryptMode;
  },

}

export default ProtocolUtil;