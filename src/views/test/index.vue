<template>
    <div class="test-container">
        <Calendar :schedule="schedule" @pick="onPickDay" />
        <el-dialog title="新增促销活动" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="formRules" label-width="100px" ref="form">
                <el-form-item label="活动名称:" prop="title">
                    <el-input v-model="form.title" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="开始日期：" prop="startDate">
                    <el-date-picker v-model="form.startDate" type="date" style="width: 300px" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：" prop="endDate">
                    <el-date-picker v-model="form.endDate" type="date" style="width: 300px" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onDialogBtnClick('cancel')">取 消</el-button>
                <el-button type="primary" @click="onDialogBtnClick('confirm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
    components: {
        Calendar
    },
    data() {
        return {
            schedule: [
                {
                    title: '日常促销1',
                    startDate: '2022-06-01',
                    endDate: '2022-06-03',
                    id: 1
                },
                {
                    title: '日常促销1',
                    startDate: '2022-06-02',
                    endDate: '2022-06-04',
                    id: 2
                },
                {
                    title: '日常促销2',
                    startDate: '2022-06-03',
                    endDate: '2022-06-06',
                    id: 3
                },
                {
                    title: '日常促销3',
                    startDate: '2022-06-04',
                    endDate: '2022-06-05',
                    id: 4
                },
                {
                    title: '日常促销4',
                    startDate: '2022-06-07',
                    endDate: '2022-06-08',
                    id: 4
                },
                {
                    title: '日常促销5',
                    startDate: '2022-06-07',
                    endDate: '2022-06-09',
                    id: 5
                },
                {
                    title: '日常促销6',
                    startDate: '2022-06-17',
                    endDate: '2022-06-19',
                    id: 6
                },
                {
                    title: '日常促销7',
                    startDate: '2022-06-18',
                    endDate: '2022-06-22',
                    id: 7
                }
            ],
            dialogFormVisible: false,
            form: {
                title: '',
                startDate: '',
                endDate: ''
            },
            formRules: {
                title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                startDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
                endDate: [{ required: true, message: '请选择日期', trigger: 'change' }]
            }
        }
    },
    methods: {
        onPickDay(day) {
            const { formatedDate } = day
            this.dialogFormVisible = true
            this.form.startDate = formatedDate
        },
        onDialogBtnClick(type) {
            if (type === 'cancel') {
                this.dialogFormVisible = false
            } else if (type === 'confirm') {
                this.$refs['form'].validate(async (valid) => {
                    if (valid) {
                        this.dialogFormVisible = false
                        const { schedule, form } = this
                        const newId = schedule[schedule.length - 1].id + 1
                        const newScheduleItem = {
                            ...form,
                            id: newId
                        }
                        this.schedule.push(newScheduleItem)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.test-container {
    width: 50%;
    margin: 0 auto;
}
</style>
