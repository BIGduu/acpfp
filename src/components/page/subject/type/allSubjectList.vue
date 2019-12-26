<template>
    <div v-loading.fullscreen.lock="loading">
        <base-subject v-bind:test-list="testList"/>
    </div>
</template>

<script>
    import {requestAllTest} from "../../../../axios/test";
    import baseSubject from "../baseSubject";

    export default {
        name: "allSubjectList",
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
                requestAllTest().then(result => {
                    this.loading = false;
                    this.testList = result;
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