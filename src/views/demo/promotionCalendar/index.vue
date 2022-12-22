<template>
    <demo :data="demoInfo">
        <calendar :schedule="schedule" @pick-day="onPickDay" @pick-schedule="onPickSchedule" />
        <el-dialog title="新增促销活动" v-model="dialogFormVisible" width="500px">
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
            <template #footer>
                <el-button @click="onDialogBtnClick('cancel')">取 消</el-button>
                <el-button type="primary" @click="onDialogBtnClick('confirm')">确 定</el-button>
            </template>
        </el-dialog>
    </demo>
</template>

<script>
import Demo from '@/components/Demo/index.vue';
import Calendar from '@/components/Calendar/index.vue';
export default {
    components: {
        Demo,
        Calendar
    },
    name: 'PromotionCalendar',
    data() {
        return {
            demoInfo: {
                title: '促销日历',
                url: ''
            },
            schedule: [],
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
        };
    },
    created() {
        this.getScheduleList();
    },
    methods: {
        async getScheduleList() {
            let res = await this.req({
                url: '/demo/calendar'
            });
            if (res.result && res.result.list) {
                this.schedule = res.result.list;
            }
        },
        // 点击某一天
        onPickDay(day) {
            const { formatedDate } = day;
            this.dialogFormVisible = true;
            this.form.startDate = formatedDate;
        },
        // 点击某一日程
        onPickSchedule(schedule) {
            const { id } = schedule;
            const scheduleItem = this.schedule.find((item) => item.id === id);
            if (scheduleItem) {
                this.form = { ...scheduleItem };
                this.dialogFormVisible = true;
            }
        },
        // 日程弹窗按钮事件处理
        onDialogBtnClick(type) {
            if (type === 'cancel') {
                this.dialogFormVisible = false;
                this.$refs.form.resetFields();
                this.form = {
                    title: '',
                    startDate: '',
                    endDate: ''
                };
            } else if (type === 'confirm') {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const { schedule, form } = this;
                        // form中已有id，说明是已经插入过的日程
                        if (form.id) {
                            const scheduleIndex = this.schedule.findIndex((item) => item.id === form.id);
                            this.$set(this.schedule, scheduleIndex, form);
                        } else {
                            // 插入新数据
                            const newId = schedule[schedule.length - 1].id + 1;
                            const newScheduleItem = {
                                ...form,
                                id: newId
                            };
                            this.schedule.push(newScheduleItem);
                        }

                        this.dialogFormVisible = false;
                    }
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.demo-container {
    padding: 50px 25%;

    .el-row {
        text-align: center;
        margin-bottom: 10px;
    }

    .el-link {
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
    }

    .el-button {
        margin: 0 10px 10px 0;
    }
}
</style>
