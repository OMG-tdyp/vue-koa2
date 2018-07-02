<template>
    <div>
       <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
       <div class="login-panel">
           <van-field label="用户名" icon="clear" @click-icon="username=''" placeholder="请输入用户名" required v-model="username" :error-message="usernameMessage"></van-field>
           <van-field label="密码" type="password" placeholder="请输入密码" required v-model="password" :error-message="passwordMessage"></van-field>
           <div class="login-button">
               <van-button type="primary" @click="checkLogin" :loading="openloading" size="large">登陆</van-button>
           </div>
       </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openloading: false, //是否开启用户登陆的loading
                usernameMessage: '', //当用户名输入错误的提示
                passwordMessage: '', //当密码输入错误的提示
            }
        },
        created() {
            localStorage.userInfo && this.$router.push('/');
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            checkLogin() { //表单验证
                let flag = true;
                this.username.length < 5 ? [this.usernameMessage,flag] = ['用户名不能少于5位',false] : this.usernameMessage = '';
                this.password.length < 6 ? [this.passwordMessage,flag] = ['密码不能少于6位',false] : this.passwordMessage = '';
                flag && this.login();
            },
            login() { //登陆提交
                this.openloading = true; 
                axios({
                    url: url.login,
                    method: 'post',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                }).then(response => {                   
                    if(response.data.code === 200 && response.data.message) {
                        new Promise((resolve,reject) => {
                            localStorage.userInfo = {userName: this.username};
                            setTimeout(() => {resolve()},500);
                        }).then(() => {
                            Toast.success('登陆成功');
                            this.$router.push('/');
                        }).catch(err => {
                            Toast.fail('登陆状态保存失败');
                        });                        
                    } else {
                        Toast.fail('登陆失败');
                        this.openloading = false;
                    }
                }).catch(err => {
                    Toast.fail('登陆失败');
                    this.openloading = false;
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login-panel {
        width: 96%;
        border-radius: 5px;
        margin: 2rem auto;
        padding-bottom: 10rem;
        .login-button {
            padding-top: 1rem;
        }
    }
</style>