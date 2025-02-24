<!--<template>-->
<!--  <div>-->
<!--    <div style="margin-top: 5px;">-->
<!--      <el-input style="width: 240px;" placeholder="请输入姓名"></el-input>-->
<!--      <el-input style="width: 240px;margin-left: 5px;" placeholder="请输入地址"></el-input>-->
<!--      <el-button style="margin-left: 5px;" type="primary">-->
<!--        <i class="el-icon-search">-->
<!--          搜索-->
<!--        </i>-->
<!--      </el-button>-->
<!--    </div>-->
<!--    &lt;!&ndash; 使用 el-table 组件，绑定 tableData 数据 &ndash;&gt;-->
<!--    <el-table :data="tableData">-->
<!--      &lt;!&ndash; 定义表格列 &ndash;&gt;-->
<!--      <el-table-column prop="id" label="序号" width="180"></el-table-column>-->
<!--      <el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
<!--      <el-table-column prop="username" label="用户名" width="180"></el-table-column>-->
<!--      <el-table-column prop="age" label="年龄" width="180"></el-table-column>-->
<!--      <el-table-column prop="sex" label="性别"></el-table-column>-->
<!--      <el-table-column prop="phone" label="电话"></el-table-column>-->
<!--      <el-table-column prop="address" label="地址"></el-table-column>-->


<!--    </el-table>-->
<!--    <div style="margin-top: 5px;">-->
<!--      &lt;!&ndash; 分页 &ndash;&gt;-->
<!--      <el-pagination background layout="prev, pager, next" :total="tableData.length" :page-size="1">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'HomeView',-->
<!--  data() {-->
<!--    return {-->
<!--      // 表格数据-->
<!--      tableData: []-->
<!--    };-->
<!--  },-->
<!--  created(){-->
<!--    this.load()-->
<!--  },-->
<!--  methods:{//定义方法，在create中调用-->
<!--    load(){-->
<!--      fetch('http://localhost:9090/user/list').then(res=>res.json()).then(res =>{-->
<!--        console.log(res)-->
<!--        this.tableData=res-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<template>
    <!-- Main Content -->
    <div class="main-content">
      <header class="header">
        <div class="search-bar">
          <input type="text" placeholder="输入关键词搜索" />
        </div>
        <div class="user-profile">
          <img src="/placeholder.svg?height=40&width=40" alt="User" class="avatar" />
        </div>
      </header>

      <div class="content">
        <h1>Hi, My Account</h1>

        <div class="profile-section">
          <h2>个人信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>手机</label>
              <span>+86 13923734567</span>
            </div>
            <div class="info-item">
              <label>工号</label>
              <span>T32F 012</span>
            </div>
            <div class="info-item">
              <label>邮箱</label>
              <span>Account@tencent.com</span>
            </div>
            <div class="info-item">
              <label>入职时间</label>
              <span>2021-07-01</span>
            </div>
          </div>
        </div>

        <div class="chart-section">
          <h2>主页访问数据</h2>
          <div class="chart-container">
            <!-- Chart will be rendered here -->
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['09-01', '09-03', '09-05', '09-07', '09-09', '09-11', '09-13', '09-15', '09-17', '09-19'],
      datasets: [
        {
          label: '本月',
          data: [10, 20, 15, 30, 25, 40, 35, 25, 30, 25],
          borderColor: '#1a73e8',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(26, 115, 232, 0.1)',
        },
        {
          label: '上月',
          data: [5, 15, 10, 25, 20, 35, 30, 20, 25, 20],
          borderColor: '#dadce0',
          tension: 0.4,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 240px;
  background-color: #1e1e2d;
  color: #a2a3b7;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
}

.logo-img {
  width: 30px;
  height: 30px;
}

.logo-text {
  color: white;
  font-weight: 500;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin: 0.25rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: #0052cc;
  color: white;
}

.main-content {
  flex: 1;
  padding: 1rem 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 300px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.profile-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  color: #666;
  font-size: 0.875rem;
}

.chart-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.chart-container {
  margin-top: 1rem;
  height: 300px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
}
</style>
