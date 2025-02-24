<template>
  <div class="app-container">
    <!-- Sidebar -->
    <el-menu
        v-if="!isAuthPage"
        class="sidebar"
        :default-active="activeMenu"
        background-color="#1e1e2d"
        text-color="#a2a3b7"
        active-text-color="#409EFF"
        :unique-opened="true"
        @select="handleSelect"
        router
    >
      <div class="sidebar-inner">
        <!-- Logo Section -->
        <div class="logo-section">
          <img :src="logoPath" alt="TDesign Starter" class="logo-img" />
        </div>

        <!-- Main Navigation -->
        <div class="menu-section">
          <div class="menu-title">主导航</div>

          <el-menu-item index="/new-chat">
            <i class="el-icon-plus"></i>
            <span>新建对话</span>
          </el-menu-item>

          <el-submenu index="history">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>历史对话</span>
            </template>
            <el-menu-item index="history-1">
              <span>多机多卡训练指南</span>
            </el-menu-item>
            <el-menu-item index="history-2">
              <span>Go语言调用Gemma大模型</span>
            </el-menu-item>
            <el-menu-item index="history-3">
              <span>多机多卡训练指南</span>
            </el-menu-item>
            <el-menu-item index="history-expand">
              <span>展开</span>
            </el-menu-item>
          </el-submenu>
        </div>

        <!-- Extended Features -->
        <div class="menu-section">
          <div class="menu-title">扩展功能</div>

          <el-menu-item index="/knowledge-qa">
            <i class="el-icon-search"></i>
            <span>知识库问答</span>
          </el-menu-item>

          <el-menu-item index="/personal-kb">
            <i class="el-icon-collection"></i>
            <span>个人知识库管理</span>
          </el-menu-item>

          <el-menu-item index="/doc-writing">
            <i class="el-icon-edit-outline"></i>
            <span>文档内容写作</span>
          </el-menu-item>

          <el-submenu index="ai">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>智能体</span>
            </template>
            <el-menu-item index="ai-1">
              <span>个人智能体管理</span>
            </el-menu-item>
            <el-menu-item index="ai-2" class="orange-text">
              <span>微服务大师</span>
            </el-menu-item>
            <el-menu-item index="ai-3" class="orange-text">
              <span>C++编程助手</span>
            </el-menu-item>
            <el-menu-item index="ai-expand">
              <span>展开</span>
            </el-menu-item>
          </el-submenu>
        </div>

        <!-- More Options -->
        <div class="menu-section more-section">
          <div class="menu-title">更多</div>
          <el-menu-item index="/profile">
            <i class="el-icon-user"></i>
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item index="logout" @click="handleLogout">
            <i class="el-icon-switch-button"></i>
            <span>退出登录</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'full-width': isAuthPage }">
      <header v-if="!isAuthPage" class="header">
        <el-input
            placeholder="输入关键词搜索"
            v-model="searchQuery"
            prefix-icon="el-icon-search"
            class="search-input"
        >
        </el-input>
        <div class="user-profile">
          <el-avatar size="small" src="/placeholder.svg?height=32&width=32"></el-avatar>
          <span class="user-name">user</span>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      activeMenu: '/personal-kb',
      searchQuery: '',
      logoPath: require('@/assets/logo.png')
    }
  },
  methods: {
    handleSelect(index) {
      if (index === 'logout') {
        this.handleLogout()
      }
    },
    handleImageError() {
      this.logoPath = '/placeholder.svg?height=60&width=200'
    },
    handleLogout() {
      this.$store.dispatch('clearToken')
      this.$router.push('/login')
    }
  },
  computed: {
    isAuthPage() {
      return this.$route.path === '/login' || this.$route.path === '/register';
    }
  },
  created() {
    this.activeMenu = this.$route.path
  }
}
</script>

<style>
/* 全局样式，不使用 scoped */
.sidebar.el-menu {
  border-right: none;
}

.sidebar .el-menu-item,
.sidebar .el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.sidebar .el-menu-item i,
.sidebar .el-submenu__title i {
  color: inherit;
}

.sidebar .el-menu-item:focus,
.sidebar .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.sidebar .el-menu-item.is-active {
  background-color: #409EFF;
  color: white;
}

.sidebar .el-submenu__title:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.sidebar .el-submenu .el-menu-item {
  font-size: 11px;
}
</style>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

.sidebar-inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.logo-section {
  padding: 20px;
  flex-shrink: 0;
  background-color: #1e1e2d;
}

.logo-img {
  width: 100%;
  height: auto;
  max-height: 60px;
  object-fit: contain;
}

.menu-section {
  margin-bottom: 20px;
  flex-shrink: 0;
}

.menu-title {
  padding: 0 20px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #6c7293;
}

.more-section {
  margin-top: auto;
  flex-shrink: 0;
}

.orange-text {
  color: #e6a23c;
}

.main-content {
  margin-left: 260px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  height: 64px;
  background-color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.search-input {
  width: 300px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  color: #606266;
}

.content {
  flex: 1;
  overflow: auto;
}

.full-width {
  margin-left: 0 !important;
}
</style>

