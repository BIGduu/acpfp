<template>
    <el-card>
        <el-divider>登陆页面</el-divider>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="用户名">
                <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密  码">
                <el-input type="password" v-model="form.password"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="gotoLogon">注册</el-button>
                <el-button type="primary" @click="onSubmit('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import {requestLogin} from "../../../axios/login";

    export default {
        name: "login",
        data() {
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    password: '',
                    rememberMe: false
                },
                rules: {
                    password: [{validator: validatePassword, trigger: 'blur'}]
                }
            }
        },
        methods: {
            gotoLogon(){
                this.$router.push({name:'logon'})
            },
            onSubmit(formName) {
                this.$refs[formName].validate(
                    (valid) => {
                        if (valid) {
                            this.doLogin();
                        } else {
                            return false;
                        }
                    }
                );
            },
            doLogin() {
                requestLogin(this.form).then((response) => {
                    this.$router.push({name: 'home'})
                })
            }
        }

    }
</script>

<style scoped>

</style>