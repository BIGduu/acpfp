<template>
    <div v-loading.fullscreen.lock="loading">
        <base-subject v-bind:test-list="testList"/>
    </div>
</template>

<script>
    import baseSubject from "@/components/page/subject/baseSubject";
    import {requestErrorTest, requestMultipleTest} from "@/axios/test";

    export default {
        name: "errorSubjectList",
        components: {baseSubject},
        data() {
            return {
                loading: true,
                testList: {
                    singleChoiceSubjects: [],
                    multipleChoiceSubjects: [],
                    judgeSubjects: []
                }
            }
        },
        methods: {
            init() {
                requestErrorTest().then(result => {
                    this.loading = false;
                    this.testList = result.data;
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>