<template>
  <div class="containerBox">
    <div class="containerList">
      <ul class="group">
        <li class="groupItem">
          <div>
            <img :src="`${baseUrl}${image}`">
          </div>
          <div class="content">
            <h3>{{title}}</h3>
            <p>{{specs}}</p>
            <span>{{time}}</span>
          </div>
          <button class='btn' >{{detail}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    specs: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },

    detail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  }
};
</script>
<style lang="less">
.group {
  width: 100%;
  .groupItem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    .content {
      line-height: 30px;
      h3 {
        color: rgb(241, 157, 21);
        font-size: 14px;
      }
      p {
        color: #000;
        font-size: 14px;
      }
    }
    .btn {
      font-size: 12px;
      width: 70px;
      line-height: 20px;
      background: rgb(231, 109, 8);
      border: none;
      border-radius: 4px;
      color: #fff;
      margin-bottom: 15px;
    }
  }
}
</style>