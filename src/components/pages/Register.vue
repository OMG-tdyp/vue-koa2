<template>
    <div>
       <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
       <div class="register-panel">
           <van-field label="用户名" icon="clear" @click-icon="username=''" placeholder="请输入用户名" required v-model="username" :error-message="usernameMessage"></van-field>
           <van-field label="密码" type="password" placeholder="请输入密码" required v-model="password" :error-message="passwordMessage"></van-field>
           <div class="register-button">
               <van-button type="primary" @click="checkRegister" :loading="openloading" size="large">马上注册</van-button>
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
                openloading: false, //是否开启用户注册的loading
                usernameMessage: '', //当用户名输入错误的提示
                passwordMessage: '', //当密码输入错误的提示
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            checkRegister() { //表单验证
                let flag = true;
                this.username.length < 5 ? [this.usernameMessage,flag] = ['用户名不能少于5位',false] : this.usernameMessage = '';
                this.password.length < 6 ? [this.passwordMessage,flag] = ['密码不能少于6位',false] : this.passwordMessage = '';
                flag && this.register();
            },
            register() { //注册提交
                this.openloading = true; 
                axios({
                    url: url.registerUser,
                    method: 'post',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                }).then(response => {
                    if(response.data.code === 200) {
                        Toast.success(response.data.message);
                        this.$router.push('/');
                    } else {
                        Toast.fail('注册失败');
                        this.openloading = false;
                    }
                }).catch(err => {
                    Toast.fail('注册失败');
                    this.openloading = false;
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .register-panel {
        width: 96%;
        border-radius: 5px;
        margin: 2rem auto;
        padding-bottom: 10rem;
        .register-button {
            padding-top: 1rem;
        }
    }
</style>