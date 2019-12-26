<template>
    <div v-loading.fullscreen.lock="loading">
        <!--        单选题-->
        <el-card v-if="testList.singleChoiceSubjects != null && testList.singleChoiceSubjects.length !== 0">
            <el-divider>单选题</el-divider>
            <el-card :key="index" v-for="(item,index) in testList.singleChoiceSubjects">
                <el-divider>第{{index}}题</el-divider>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{item.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="item.did === true && item.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="item.did === true && item.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-radio
                        border
                        size="small"
                        v-model="item.tmp"
                        :key="option_index"
                        v-for="(option,option_index) in item.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, item)})"
                >
                    {{option.description}}
                </el-radio>
                <el-divider/>
            </el-card>
        </el-card>

        <!--        多选题-->
        <el-card v-if="testList.multipleChoiceSubjects != null && testList.multipleChoiceSubjects.length !== 0">
            <el-divider>多选题</el-divider>
            <el-card :key="index" v-for="(item,index) in testList.multipleChoiceSubjects">
                <el-divider>第{{index}}题</el-divider>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{item.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="item.did === true && item.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="item.did === true && item.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-checkbox
                        border
                        size="small"
                        :key="option_index"
                        v-model="item[option_index]"
                        v-for="(option,option_index) in item.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, item)})"
                >
                    {{option.description}}
                </el-checkbox>
                <el-divider/>
            </el-card>
        </el-card>

        <!--        判断题-->
        <el-card v-if="testList.judgeSubjects != null && testList.judgeSubjects.length !== 0">
            <el-divider>判断题</el-divider>
            <el-card :key="index" v-for="(item,index) in testList.judgeSubjects">
                <el-divider>第{{index}}题</el-divider>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{item.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="item.did === true && item.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="item.did === true && item.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-radio
                        border
                        size="small"
                        v-model="item.tmp"
                        :key="option_index"
                        v-for="(option,option_index) in item.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, item)})"
                >
                    {{option.description}}
                </el-radio>
                <el-divider/>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import {requestAllTest} from "../../../axios/test";

    export default {
        name: "childSubject",
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
                requestAllTest().then(result => {
                    this.loading = false;
                    this.testList = result;
                })

            },
            updateMultipleSubject(item) {
                let solution = item.solution;
                solution = [];
                if (item[0]) {
                    solution.push({index: "A"})
                }
                if (item[1]) {
                    solution.push({index: "B"})
                }
                if (item[2]) {
                    solution.push({index: "C"})
                }
                if (item[3]) {
                    solution.push({index: "D"})
                }
                if (item[4]) {
                    solution.push({index: "E"})
                }
                return solution;
            },
            updateSubject(index, item) {
                let solution = item.solution;
                if (item.type === 'single' || item.type === 'judge') {
                    solution = [{index: index}]
                } else if (item.type === 'multiple') {
                    solution = this.updateMultipleSubject(item);
                }
                item.solution = solution;
            },
            isRight(item) {
                let answer = item.answer;
                let solution = item.solution;
                if (answer.length !== solution.length) {
                    return false;
                } else {
                    let flag = true;
                    for (let i = 0; i < answer.length; i++) {
                        if (answer[i].index !== solution[i].index) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                }
            },
            putSolution(index, item) {
                item.did = true;
                this.updateSubject(index, item);
                item.right = this.isRight(item);
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
