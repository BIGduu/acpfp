<template>
    <div v-loading.fullscreen.lock="loading">
        <base-subject v-bind:test-list="testList"/>
    </div>
</template>

<script>
    import {requestDefaultTest} from "../../../../axios/test";
    import baseSubject from "../baseSubject";

    export default {
        name: "defaultSubject",
        components: {baseSubject},
        data() {
            return {
                loading:true,
                testList: {
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