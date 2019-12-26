<template>
    <div>
        <el-carousel
                :autoplay="false"
                :loop="false"
                indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
                <base-subject v-bind:test-list="senderList"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
    import BaseSubject from "../baseSubject";
    import {requestDefaultTest} from "../../../../axios/test";
    export default {
        name: "practiseSubject",
        components: {BaseSubject},
        data() {
            return {
                loading:true,
                testList: {
                    singleChoiceSubjects: [],
                    multipleChoiceSubjects: [],
                    judgeSubjects: []
                },
                senderList:{
                    singleChoiceSubjects: [],
                    multipleChoiceSubjects: [],
                    judgeSubjects: []
                }
            }
        },
        methods: {
            init() {
                requestDefaultTest().then(result => {
                    this.loading = false;
                    this.testList = result;
                    this.pickOne()
                })
            },
            onChange(){
                this.pickOne();
            },
            pickOne(){

            }

        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>