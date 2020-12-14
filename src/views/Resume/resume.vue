<template>
    <el-row type="flex" class="resume-container" v-if="isChecked" style="margin: 0 auto;">
        <el-col class="resume-l" :span="7" :offset="1">
            <div class="avatar-box"></div>
            <div class="nick-name">Snail-Lu</div>
            <div class="basic-info">
                <div class="title">个人信息</div>
                <ul>
                    <li>性别：男</li>
                    <li>年龄：25</li>
                    <li>民族：汉族</li>
                    <li>面貌：中共党员</li>
                    <li>籍贯：安徽亳州</li>
                    <li>电话：158****8812</li>
                    <li>邮箱：snaillu@yeah.net</li>
                </ul>
            </div>
            <div class="basic-skill">
                <div class="title">基本技能</div>
                <ul>
                    <li>英语：六级</li>
                    <li>计算机：三级</li>
                </ul>
            </div>
            <div class="education-info">
                <div class="title">教育背景</div>
                <ul>
                    <li>学历：大学本科</li>
                    <li>院校：南通大学</li>
                    <li>专业：电气工程及其自动化</li>
                </ul>
            </div>
        </el-col>
        <el-col class="resume-r" :span="14" :offset="1">
            <div class="skill-tree">
                <div class="title">工作技能</div>
                <div>工作技能描述</div>
            </div>
            <div class="skill-tree">
                <div class="title">项目经历</div>
                <div>工作技能描述</div>
            </div>
            <div class="skill-tree">
                <div class="title">开源项目</div>
                <div>开源项目描述</div>
            </div>
        </el-col>
    </el-row>
</template>

<script src="./resume.js"></script>

<style lang="scss" scoped>
@import './resume.scss';
</style>