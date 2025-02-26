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


          <el-submenu index="/personal-kb">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span>个人知识库管理</span>
            </template>
            <!-- 动态渲染知识库列表 -->
            <el-menu-item
                v-for="kb in currentKnowledgeBases"
                :key="kb.id"
                :index="`/knowledge-base/${kb.id}`"
                :route="{ path: `/knowledge-base/${kb.id}`, query: { name: kb.name } }"
            >
              <span>{{ kb.name }}</span>
            </el-menu-item>
            <el-menu-item @click.native.prevent="showCreateDialog">
              <span>新建知识库</span>
            </el-menu-item>
          </el-submenu>

          <!-- 添加创建知识库的对话框 -->
          <el-dialog
              title="新建知识库"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
          >
            <el-form :model="form">
              <el-form-item label="知识库名称">
                <el-input v-model="form.name" placeholder="请输入知识库名称"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createKnowledgeBase">确定</el-button>
      </span>
          </el-dialog>

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
      logoPath: require('@/assets/logo.png'),
      dialogVisible: false,
      form: {
        name: ''
      },
      knowledgeBases: [] // Initialize as empty array
    }
  },
  watch: {
    knowledgeBases: {
      handler(newVal) {
        // 当知识库列表发生变化时，强制更新视图
        this.$forceUpdate();
      },
      deep: true
    }
  },
  computed: {
    isAuthPage() {
      return this.$route.path === '/login' || this.$route.path === '/register';
    },
    currentKnowledgeBases() {
      return this.knowledgeBases;
    }
  },
  methods: {
    // 使用普通函数而不是箭头函数，确保 this 指向 Vue 实例
    handleSelect(index) {
      if (index === 'logout') {
        this.handleLogout();
        return false; // 阻止默认路由行为
      } else if (index === 'ignore') {
        this.showCreateDialog(); // 直接调用显示对话框方法
        return false; // 阻止路由跳转
      }
    },
    handleImageError() {
      this.logoPath = '/placeholder.svg?height=60&width=200';
    },
    handleLogout() {
      this.$store.dispatch('clearToken');
      this.$router.push('/login');
    },
    showCreateDialog() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      const vm = this; // 保存 Vue 实例的引用
      this.$confirm('确认关闭？')
          .then(function () {
            done();
            vm.form.name = ''; // 使用保存的引用
          })
          .catch(function () {
          });
    },
    createKnowledgeBase() {
      if (!this.form.name.trim()) {
        this.$message.error('请输入知识库名称');
        return;
      }

      // 创建新知识库时添加name字段
      const newKB = {
        id: Date.now().toString(),
        name: this.form.name
      };

      this.knowledgeBases.push(newKB); // 直接push新条目
      localStorage.setItem('knowledgeBases', JSON.stringify(this.knowledgeBases));

      this.dialogVisible = false;
      this.form.name = '';
      this.$message.success('知识库创建成功');
    }
  },
  created() {
    this.activeMenu = this.$route.path;
  },
  mounted() {
    // Load knowledge bases from localStorage or your backend
    const savedKBs = localStorage.getItem('knowledgeBases');
    if (savedKBs) {
      try {
        this.knowledgeBases = JSON.parse(savedKBs);
      } catch (e) {
        console.error('Error parsing knowledge bases:', e);
        this.knowledgeBases = [];
      }
    }
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