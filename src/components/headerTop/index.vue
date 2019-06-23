<template>
    <div class="headerTop">
        <div class="headerTop_left">
             <city-select></city-select>
        </div>
        <div class="headerTop_right">
            <div v-if="pageStatus === 'login'">
                <span>{{userInfo.name}}</span>
                <router-link to="/userCenter">用户中心</router-link>
                <span @click="handleLogOut">退出</span>
            </div>
            <div v-else>
                <router-link to="/Login">登录</router-link>
                <router-link to="/Register">注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import citySelect from '@/components/citySelect'

export default {
    data() {
        return {
            userInfo: {
                name: '17704335023',
                imgs: 'www.baidu.com'
            },
            pageStatus: 'logOut'
        }
    },
    methods: {
        handleLogOut() {
            this.pageStatus = 'logOut'
        }
    },
    components: {
        citySelect,
        
    }
}
</script>
<style lang="less">
.headerTop {
    display: flex;
    justify-content: space-between;
}
</style>
