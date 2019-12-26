<template>
    <div>
        <!--        单选题-->
        <el-card v-if="oneSubject != null && oneSubject.type === 'single'">
            <el-divider>单选题</el-divider>
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{oneSubject.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-radio
                        border
                        size="small"
                        v-model="oneSubject.tmp"
                        :key="option_index"
                        v-for="(option,option_index) in oneSubject.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, oneSubject)})"
                >
                    {{option.description}}
                </el-radio>
                <el-divider/>
            </el-card>
        </el-card>

        <!--        多选题-->
        <el-card v-if="oneSubject != null && oneSubject === 'multiple'">
            <el-divider>多选题</el-divider>
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{oneSubject.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-checkbox
                        border
                        size="small"
                        :key="option_index"
                        v-model="oneSubject[option_index]"
                        v-for="(option,option_index) in oneSubject.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, oneSubject)})"
                >
                    {{option.description}}
                </el-checkbox>
                <el-divider/>
            </el-card>
        </el-card>

        <!--        判断题-->
        <el-card v-if="oneSubject !== null && oneSubject === 'judge'">
            <el-divider>判断题</el-divider>
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="19">
                        <p>{{oneSubject.question}}</p>
                    </el-col>
                    <el-col :span="1">
                        <div>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === true" size="mini" icon="el-icon-check"
                                       type="success" circle/>
                            <el-button v-if="oneSubject.did === true && oneSubject.right === false" size="mini" icon="el-icon-close"
                                       type="danger" circle/>
                        </div>
                    </el-col>
                </el-row>
                <el-radio
                        border
                        size="small"
                        v-model="oneSubject.tmp"
                        :key="option_index"
                        v-for="(option,option_index) in oneSubject.options"
                        :label="option.index"
                        @change="((label)=>{putSolution(option.index, oneSubject)})"
                >
                    {{option.description}}
                </el-radio>
                <el-divider/>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import {requestLogErrorSubject} from "../../../../axios/subject";

    export default {
        name: "basePractiseSubject",
        props:{
            oneSubject:null
        },
        methods:{
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
                if (!item.right){
                    item.errorLog = true;
                    this.errorLogSubjectLog(item);
                }
            }

        }
    }
</script>

<style scoped>

</style>