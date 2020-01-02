<template>
    <el-collapse>
        <el-collapse-item title="观点分享">
            <el-table v-model="commentList">
                <el-table-column
                        prop="username"
                />
                <el-table-column
                        prop="body"
                />
            </el-table>
            <el-form-item>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
                <el-button type="success" icon="el-icon-check" circle @click=""/>
            </el-form-item>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    export default {
        name: "comment",
        props:{
            commentList:{
                username:String,
                body:String
            }
        },
        data(){
            return{
                textarea:''
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>