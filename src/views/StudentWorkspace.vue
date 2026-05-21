<template>
  <div class="student-workspace">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <h1>AIGC实训平台 - 学生端</h1>
        </div>
        <div class="header-right">
          <el-button type="text" @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="sidebar">
          <el-menu :default-active="activeMenu" class="sidebar-menu">
            <el-menu-item index="1" @click="activeMenu = '1'">
              <i class="el-icon-menu"></i>
              <span>我的课程</span>
            </el-menu-item>
            <el-menu-item index="2" @click="activeMenu = '2'">
              <i class="el-icon-document"></i>
              <span>我的作业</span>
            </el-menu-item>
            <el-menu-item index="3" @click="activeMenu = '3'">
              <i class="el-icon-pencil"></i>
              <span>实训模块</span>
            </el-menu-item>
            <el-menu-item index="4" @click="activeMenu = '4'">
              <i class="el-icon-user"></i>
              <span>个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-content">
          <div v-if="activeMenu === '1'" class="content-section">
            <h2>我的课程</h2>
            <el-row :gutter="20">
              <el-col :span="12" v-for="course in courses" :key="course.name">
                <el-card class="course-card" @click="viewCourse(course)">
                  <div class="course-icon" :class="course.iconClass"></div>
                  <h3>{{ course.name }}</h3>
                  <p>{{ course.description }}</p>
                  <div class="course-meta">
                    <span>进度: {{ course.progress }}</span>
                    <span>讲师: {{ course.teacher }}</span>
                  </div>
                  <el-progress :percentage="parseInt(course.progress)" stroke-width="6"></el-progress>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="activeMenu === '2'" class="content-section">
            <h2>我的作业</h2>
            <el-card>
              <el-table :data="assignments" border>
                <el-table-column prop="name" label="作业名称"></el-table-column>
                <el-table-column prop="course" label="所属课程"></el-table-column>
                <el-table-column prop="deadline" label="截止日期"></el-table-column>
                <el-table-column prop="status" label="状态">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === '已提交' ? 'success' : scope.row.status === '已批改' ? 'primary' : 'warning'">
                      {{ scope.row.status }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="score" label="成绩"></el-table-column>
                <el-table-column prop="action" label="操作">
                  <template #default>
                    <el-button type="text">提交</el-button>
                    <el-button type="text">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div v-else-if="activeMenu === '3'" class="content-section">
            <h2>实训模块</h2>
            <el-row :gutter="20">
              <el-col :span="6" v-for="module in modules" :key="module.name">
                <el-card class="module-card" @click="openModule(module)">
                  <div class="module-icon">
                    <component :is="module.icon" class="icon-large"></component>
                  </div>
                  <h3>{{ module.name }}</h3>
                  <p>{{ module.description }}</p>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div v-else class="content-section">
            <h2>个人中心</h2>
            <el-card class="profile-card">
              <div class="profile-header">
                <div class="avatar">
                  <el-avatar :size="100" icon="el-icon-user" class="large-avatar"></el-avatar>
                </div>
                <div class="profile-info">
                  <h2>学生姓名</h2>
                  <p>学号: 2024001</p>
                  <p>班级: AI2401</p>
                </div>
              </div>
              <div class="profile-stats">
                <div class="stat-item">
                  <div class="stat-num">4</div>
                  <div class="stat-text">已修课程</div>
                </div>
                <div class="stat-item">
                  <div class="stat-num">12</div>
                  <div class="stat-text">完成作业</div>
                </div>
                <div class="stat-item">
                  <div class="stat-num">88</div>
                  <div class="stat-text">平均成绩</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay, Camera, Files, Mic } from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('1')

const courses = [
  { name: 'AI基础入门', description: '学习人工智能基本概念和原理', progress: '85%', teacher: '张老师', iconClass: 'course-icon-blue' },
  { name: '深度学习实践', description: '掌握深度学习框架和实践技能', progress: '60%', teacher: '李老师', iconClass: 'course-icon-green' },
  { name: '自然语言处理', description: '学习NLP技术和应用', progress: '45%', teacher: '王老师', iconClass: 'course-icon-orange' },
  { name: '计算机视觉', description: '掌握CV基础和高级技术', progress: '70%', teacher: '赵老师', iconClass: 'course-icon-purple' }
]

const assignments = [
  { name: '线性回归作业', course: 'AI基础入门', deadline: '2024-01-20', status: '已批改', score: '92' },
  { name: '神经网络实践', course: '深度学习实践', deadline: '2024-01-25', status: '已提交', score: '-' },
  { name: '文本分类', course: '自然语言处理', deadline: '2024-01-30', status: '未提交', score: '-' }
]

const modules = [
  { name: '文本生成', description: '使用AI生成文本内容', icon: markRaw(Files) },
  { name: '图像生成', description: 'AI图像创作工具', icon: markRaw(Camera) },
  { name: '视频生成', description: 'AI视频制作工具', icon: markRaw(VideoPlay) },
  { name: '音频生成', description: 'AI语音合成工具', icon: markRaw(Mic) }
]

const viewCourse = (course) => {
  console.log('View course:', course)
}

const openModule = (module) => {
  console.log('Open module:', module)
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.student-workspace {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left h1 {
  margin: 0;
  font-size: 20px;
}

.header-right .el-button {
  color: white;
}

.sidebar {
  background: #2f3542;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

.sidebar-menu .el-menu-item {
  color: #b8c7ce;
}

.sidebar-menu .el-menu-item.is-active {
  background: #11998e;
  color: white;
}

.main-content {
  padding: 20px;
}

.content-section h2 {
  margin-bottom: 20px;
  color: #303133;
}

.course-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.course-icon-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.course-icon-green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.course-icon-orange {
  background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);
}

.course-icon-purple {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
}

.course-card h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.course-card p {
  margin: 0 0 15px 0;
  color: #909399;
  font-size: 14px;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 13px;
  color: #606266;
}

.module-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.module-card:hover {
  transform: translateY(-5px);
}

.module-icon {
  width: 50px;
  height: 50px;
  background: #f0f2f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.icon-large {
  font-size: 24px;
  color: #667eea;
}

.module-card h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.module-card p {
  margin: 0;
  color: #909399;
  font-size: 13px;
}

.profile-card {
  padding: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  margin-right: 30px;
}

.large-avatar {
  font-size: 40px;
}

.profile-info h2 {
  margin: 0 0 10px 0;
}

.profile-info p {
  margin: 5px 0;
  color: #909399;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 32px;
  font-weight: bold;
  color: #303133;
}

.stat-text {
  color: #909399;
  font-size: 14px;
}
</style>