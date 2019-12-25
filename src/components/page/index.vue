<template>
    <div>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-row>
                    <el-col :span="20">
                        <el-button type="primary" @click="gotoDefaultTest">生成试卷</el-button>
                    </el-col>
                    <el-col :span="4">
                        <span>欢迎 , {{user.name}}</span>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {requestLogin} from "../../axios/login";

    export default {
        name: "index",
        data() {
            return {
                user: {
                    name: ''
                }
            }
        },
        methods: {
            gotoDefaultTest() {
                this.$router.push({name: 'test'})
            },
            getOnlineUser() {
                requestLogin({})
                    .then(result => {
                        this.user.name = result;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            this.getOnlineUser();
        }
    }
</script>

<style scoped>

</style>