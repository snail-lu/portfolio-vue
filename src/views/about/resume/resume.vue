<template>
    <el-row type="flex" class="resume-container" v-if="isChecked" style="margin: 0 auto;">
        <el-col class="resume-l" :span="7" :offset="1">
            <div class="avatar-box"></div>
            <div class="nick-name">路明明</div>
            <div class="basic-info">
                <div class="title">个人信息</div>
                <ul class="content">
                    <li><span class="label">性别：</span>男</li>
                    <li><span class="label">年龄：</span>25</li>
                    <li><span class="label">民族：</span>汉族</li>
                    <li><span class="label">面貌：</span>中共党员</li>
                    <li><span class="label">籍贯：</span>安徽 亳州</li>
                    <li><span class="label">电话：</span>158****8812</li>
                    <li><span class="label">邮箱：</span>snail@yeah.net</li>
                    <li><span class="label">博客：</span><a href="https://www.cnblogs.com/snaillu/" target="_blank">https://www.cnblogs.com/snaillu/</a></li>
                    <li><span class="label">网站：</span><a href="https://www.yes-i-do.cn" target="_blank">https://www.yes-i-do.cn</a></li>
                    <li><span class="label">Github：</span><a href="https://www.github.com" target="_blank">https://www.github.com/Snail-Lu/</a></li>
                </ul>
            </div>
            <div class="basic-skill">
                <div class="title">基本技能</div>
                <ul class="content">
                    <li><span class="label">英语：</span>六级</li>
                    <li><span class="label">计算机：</span>三级</li>
                </ul>
            </div>
            <div class="education-info">
                <div class="title">教育经历</div>
                <ul class="content">
                    <li><span class="label">学历：</span>本科</li>
                    <li><span class="label">院校：</span>南通大学</li>
                    <li><span class="label">专业：</span>电气工程及其自动化</li>
                    <li><span class="label">毕业：</span>2017年07月</li>
                </ul>
            </div>
        </el-col>
        <el-col class="resume-r" :span="14" :offset="1">
            <div class="work-experience">
                <div class="title">工作经历</div>
                <div class="content">
                    <el-row class="list-item" type="flex">
                        <el-col :span="8" class="item-date">2017年07月-2017年12月</el-col>
                        <el-col :span="12">百得（苏州）科技有限公司</el-col>
                        <el-col :span="4">电子工程师</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>工作内容1</li>
                        <li>工作内容2</li>
                    </ul>
                    <el-row class="list-item" type="flex">
                        <el-col :span="8">2018年01月-2019年01月</el-col>
                        <el-col :span="12">鲁东东（苏州）餐饮管理有限公司</el-col>
                        <el-col :span="4">管培生</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>工作内容1</li>
                        <li>工作内容2</li>
                    </ul>
                    <el-row class="list-item" type="flex">
                        <el-col :span="8">2019年04月至今</el-col>
                        <el-col :span="12">上海华邦科创信息科技有限公司</el-col>
                        <el-col :span="4">前端工程师</el-col>   
                    </el-row>
                    <ul class="list-item-content">
                        <li>工作内容1</li>
                        <li>工作内容2</li>
                    </ul>
                </div>
            </div>
            <div class="project-experience">
                <div class="title">项目经历</div>
                <div class="content">
                    <el-row class="list-item">
                        <el-col :span="8">2019年04月-2014年05月</el-col>
                        <el-col :span="16">离店销售小程序</el-col> 
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2019年06月-2019年07月</el-col>
                        <el-col :span="16">会员中心小程序</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2019年08月-2019年10月</el-col>
                        <el-col :span="16">邦购网PC端React重构</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2019年11月-2019年01月</el-col>
                        <el-col :span="16">美特斯邦威五品牌官方商城小程序</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2020年02月-2020年03月</el-col>
                        <el-col :span="16">有范邦购小程序</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2020年04月-2020年05月</el-col>
                        <el-col :span="16">邦购小程序</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2020年06月-2020年08月</el-col>
                        <el-col :span="16">公司权限中心管理后台vue重构</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                    <el-row class="list-item">
                        <el-col :span="8">2020年09月-2020年10月</el-col>
                        <el-col :span="16">官方商城管理后台vue重构</el-col>
                    </el-row>
                    <ul class="list-item-content">
                        <li>功能点：</li>
                        <li>技术点：</li>
                    </ul>
                </div>
            </div>
            <div class="open-source-project">
                <div class="title">Github开源项目</div>
                <ul class="content">
                    <li><span class="label">小程序商城：</span><a href="https://github.com/Snail-Lu/DevMall" target="_blank">https://github.com/Snail-Lu/DevMall</a></li>
                    <li><span class="label">小程序开发实验室：</span><a href="https://github.com/Snail-Lu/DevLab" target="_blank">https://github.com/Snail-Lu/DevLab</a></li>
                    <li><span class="label">PC端后台管理系统：</span><a href="https://github.com/Snail-Lu/admin-client" target="_blank">https://github.com/Snail-Lu/admin-client</a></li>
                    <li><span class="label">wap端仿Boss智聘：</span><a href="https://github.com/Snail-Lu/employment-app" target="_blank">https://github.com/Snail-Lu/employment-app</a></li>
                    <li><span class="label">wap端仿豆瓣：</span><a href="https://github.com/Snail-Lu/vue-douban" target="_blank">https://github.com/Snail-Lu/vue-douban</a></li>
                    <li><span class="label">wap端仿美团：</span><a href="https://github.com/Snail-Lu/react-meituan" target="_blank">https://github.com/Snail-Lu/react-meituan</a></li>
                    <li><span class="label">Node.js后端项目：</span><a href="https://github.com/Snail-Lu/employment-server" target="_blank">https://github.com/Snail-Lu/employment-server</a></li>
                    <li>...</li>
                </ul>
            </div>
        </el-col>
    </el-row>
</template>

<script src="./resume.js"></script>

<style lang="scss" scoped>
@import './resume.scss';
</style>