<template>
  <div class="containerBoxD">
    <div class="container">
      <div class="personalInfos">
        <p>{{userNames}}</p>
        <p class="phone">{{userPhones}}</p>
      </div>
      <ul class="addressCount">
        <li v-for="item in addressList" class= "addressGrop" :key= "item.id">
          <div class="addressInfo">
            <p>{{`${item.city} ${item.area} ${item.street}`}}</p>
            <span class="editImg">
              <img src="../../assets/img/edit.png" alt="">
            </span>
          </div>
        </li>
      </ul>
      <div class="addressFooter">
        <p class="add"> + 添加新地址</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '苏珊娜',
      userPhone: '15981395797',
      addressList: [
        {
          id: 1,
          city: '北京市',
          area: '朝阳区',
          street: '麦子西街'
        },
        {
          id: 2,
          city: '北京市',
          area: '海淀区',
          street: '新华街'
        },
        {
          id: 3,
          city: '北京市',
          area: '昌平区',
          street: '无街'
        }
      ]
    };
  },
  computed: {
    userNames() {
      let name = this.userName.split('');
      name.splice(0, 2, '**');
      return name.join('');
      console.log(name.join(''));
    },
    userPhones() {
      let phone = this.userPhone.split('');
      phone.splice(3, 4, '****');
      return phone.join('');
    }
  },
  methods: {}
};
</script>
<style lang="less">
.containerBoxD {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .personalInfos {
      display: flex;
      justify-content: flex-start;
      padding: 10px;
      background: #ccc;
      .phone {
        margin-left: 15px;
      }
    }
    .addressCount {
      // height: 100%;
      flex: 1;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      .addressGrop {
        background: rgb(247, 245, 245);
        margin: 10px 0;
        padding: 0 14px;
        position: relative;
        .addressInfo {
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 1px solid #e9e9e9;
          padding: 10px 0;

          p {
            width: 620px;
            display: inline-block;
            font-size: 14px;
          }
          .editImg {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 10px;
            right: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .addressFooter {
      .add {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
      }
    }
  }
}
</style>