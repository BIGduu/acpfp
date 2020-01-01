<template>
    <div>
        <!--        单选题-->
        <el-card shadow="hover" v-if="testList.singleChoiceSubjects != null && testList.singleChoiceSubjects.length !== 0">
            <el-divider>单选题</el-divider>
            <el-card shadow="hover" :key="index" v-for="(item,index) in testList.singleChoiceSubjects">
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
                                       type="danger">错误</el-button>
                        </div>
                    </el-col>
                </el-row>

                <el-radio
                        style="display: block"
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
        <el-card shadow="hover" v-if="testList.multipleChoiceSubjects != null && testList.multipleChoiceSubjects.length !== 0">
            <el-divider>多选题</el-divider>
            <el-card shadow="hover" :key="index" v-for="(item,index) in testList.multipleChoiceSubjects">
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
                                       type="danger">
                                <p :key="anIndex" v-for="(answer,anIndex) in item.answer">{{answer.index}}</p>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
                        <el-checkbox
                                style="display: block;"
                                size="small"
                                :key="option_index"
                                v-model="item[option_index]"
                                v-for="(option,option_index) in item.options"
                                :label="option.index"
                                @change="((label)=>{putMultipleSolution(option.index, item)})"
                        >
                            {{option.description}}
                        </el-checkbox>
                <el-row>
                   <el-col :span="2" :offset="20">
                       <el-button size="small" @click="isMultipleSolutionRight(item)" icon="el-icon-check" type="primary">提交</el-button>
                   </el-col>
                </el-row>
                <el-divider/>
            </el-card>
        </el-card>

        <!--        判断题-->
        <el-card shadow="hover" v-if="testList.judgeSubjects != null && testList.judgeSubjects.length !== 0">
            <el-divider>判断题</el-divider>
            <el-card shadow="hover" :key="index" v-for="(item,index) in testList.judgeSubjects">
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
                        style="display: block"
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
    import {requestLogErrorSubject} from "../../../axios/subject";
    import {requestPatchTest} from "../../../axios/test";

    export default {
        name: "baseSubject",
        props:{
            testList: {
                singleChoiceSubjects: [],
                multipleChoiceSubjects: [],
                judgeSubjects: []
            }
        },
        data() {
            return {
            }
        },
        methods: {
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
                if (item[5]) {
                    solution.push({index: "F"})
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
                if (!item.right){
                    if (!item.errorLog){
                        item.errorLog = true;
                        this.errorLogSubjectLog(item);
                    }
                }
                this.updateTest();
            },
            putMultipleSolution(index, item) {
                item.did = true;
                this.updateSubject(index, item);
                this.updateTest();
            },
            isMultipleSolutionRight(item){
                item.right = this.isRight(item);
                this.$forceUpdate();
                if (!item.right){
                    if (!item.errorLog){
                        item.errorLog = true;
                        this.errorLogSubjectLog(item);
                    }
                }
            },
            errorLogSubjectLog(subject){
                requestLogErrorSubject(subject)
                    .then(response =>{
                        this.$notify({
                            title: '错题记录成功'
                        });
                    })
                    .catch(error=>{
                        this.$notify({
                            title: '错题记录失败',
                            message: '请检查网络'
                        });
                    });
            },
            updateTest(){
                requestPatchTest(this.testList)
                .catch(error=>{
                    this.$notify({
                        title: '做题记录记录失败',
                        message: '请检查网络'
                    });
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>
    .el-checkbox.is-bordered+.el-checkbox.is-bordered {
         margin-left: 0;
    }
    .el-checkbox{
        margin-right: 0;
    }
    .el-checkbox__label {
        display: inline;
    }

    .el-checkbox, .el-checkbox__input {
        white-space: normal;
    }
</style>
