<template>
  <div class="teacher-dashboard">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <h1>AIGC实训平台 - 教师端</h1>
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
              <span>课程管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="activeMenu = '2'">
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="activeMenu = '3'">
              <i class="el-icon-document"></i>
              <span>作业管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="activeMenu = '4'">
              <i class="el-icon-pie-chart"></i>
              <span>数据分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-content">
          <div v-if="activeMenu === '1'" class="content-section">
            <h2>课程管理</h2>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-icon courses-icon"></div>
                  <div class="stat-info">
                    <div class="stat-value">12</div>
                    <div class="stat-label">课程数量</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-icon students-icon"></div>
                  <div class="stat-info">
                    <div class="stat-value">156</div>
                    <div class="stat-label">学生人数</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-icon assignments-icon"></div>
                  <div class="stat-info">
                    <div class="stat-value">45</div>
                    <div class="stat-label">待批改作业</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-card class="course-list" style="margin-top: 20px;">
              <template #header>
                <span>课程列表</span>
                <el-button type="primary" size="small">添加课程</el-button>
              </template>
              <el-table :data="courses" border>
                <el-table-column prop="name" label="课程名称"></el-table-column>
                <el-table-column prop="students" label="学生数"></el-table-column>
                <el-table-column prop="progress" label="进度"></el-table-column>
                <el-table-column prop="action" label="操作">
                  <template #default>
                    <el-button type="text">查看</el-button>
                    <el-button type="text">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div v-else-if="activeMenu === '2'" class="content-section">
            <h2>学生管理</h2>
            <el-card>
              <el-table :data="students" border>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="id" label="学号"></el-table-column>
                <el-table-column prop="class" label="班级"></el-table-column>
                <el-table-column prop="score" label="成绩"></el-table-column>
                <el-table-column prop="action" label="操作">
                  <template #default>
                    <el-button type="text">详情</el-button>
                    <el-button type="text">消息</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div v-else-if="activeMenu === '3'" class="content-section">
            <h2>作业管理</h2>
            <el-card>
              <el-table :data="assignments" border>
                <el-table-column prop="name" label="作业名称"></el-table-column>
                <el-table-column prop="course" label="所属课程"></el-table-column>
                <el-table-column prop="submitted" label="已提交"></el-table-column>
                <el-table-column prop="graded" label="已批改"></el-table-column>
                <el-table-column prop="action" label="操作">
                  <template #default>
                    <el-button type="text">批改</el-button>
                    <el-button type="text">统计</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
          <div v-else class="content-section">
            <h2>数据分析</h2>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card>
                  <h3>成绩分布</h3>
                  <div class="chart-placeholder">
                    <el-progress type="circle" :percentage="85" :size="120"></el-progress>
                    <div class="chart-text">平均成绩</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <h3>学习进度</h3>
                  <div class="chart-placeholder">
                    <el-progress :percentage="67" stroke-width="20"></el-progress>
                    <div class="chart-text">整体进度</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeMenu = ref('1')

const courses = [
  { name: 'AI基础入门', students: 32, progress: '85%' },
  { name: '深度学习实践', students: 28, progress: '60%' },
  { name: '自然语言处理', students: 24, progress: '45%' },
  { name: '计算机视觉', students: 30, progress: '70%' }
]

const students = [
  { name: '张三', id: '2024001', class: 'AI2401', score: '92' },
  { name: '李四', id: '2024002', class: 'AI2401', score: '85' },
  { name: '王五', id: '2024003', class: 'AI2402', score: '78' },
  { name: '赵六', id: '2024004', class: 'AI2402', score: '90' }
]

const assignments = [
  { name: '线性回归作业', course: 'AI基础入门', submitted: 30, graded: 25 },
  { name: '神经网络实践', course: '深度学习实践', submitted: 28, graded: 18 },
  { name: '文本分类', course: '自然语言处理', submitted: 20, graded: 5 }
]

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.teacher-dashboard {
  min-height: 100vh;
  background: #f5f7fa;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: #667eea;
  color: white;
}

.main-content {
  padding: 20px;
}

.content-section h2 {
  margin-bottom: 20px;
  color: #303133;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.courses-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.students-icon {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.assignments-icon {
  background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  color: #909399;
  font-size: 14px;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
}

.chart-text {
  color: #909399;
}
</style>