<template>
    <div>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-row>
                    <el-col :span="2">
                        <el-button type="primary" @click="gotoDefaultTest">随机试卷</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="gotoAllTest">所有试题</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="gotoMultiple">多选题</el-button>
                    </el-col>
                    <el-col :span="4" :offset="10">
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
    import {requestOnlineUser} from "../../axios/user";

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
                this.$router.push({name: 'defaultTest'})
            },
            gotoAllTest(){
              this.$router.push({name:'allTest'})
            },
            gotoMultiple(){
              this.$router.push({name:'multiple'})
            },
            getOnlineUser() {
                requestOnlineUser({})
                    .then(result => {
                        this.user.name = result.data.username;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$router.push({name:'login'})
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