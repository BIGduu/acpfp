<template>
    <div>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span>user</span>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>