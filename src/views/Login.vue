<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-left">
        <h2 class="auth-title">登录账号</h2>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="auth-form">
          <el-form-item prop="email">
            <el-input
                v-model="loginForm.email"
                placeholder="请输入邮箱"
                prefix-icon="el-icon-message"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
            />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <el-link type="primary">忘记密码?</el-link>
          </div>

          <el-button type="primary" class="submit-btn" @click="handleLogin">
            登录
          </el-button>
        </el-form>
      </div>

      <div class="auth-right">
        <h3>没有账号?</h3>
        <el-button type="primary" @click="$router.push('/register')">
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/api'

export default {
  name: 'Login',
  created() {
    console.log("Store 是否存在:", this.$store); // 调试此行
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        remember: true
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        const valid = await this.$refs.loginForm.validate();
        if (!valid) return;

        const { email, password } = this.loginForm;
        const response = await login(email, password);

        console.log('登录响应:', response); // 确认响应结构

        if (response.data.token!='') {
          await this.$store.dispatch('setToken', response.data.token);
          console.log('跳转前 token 状态:', this.$store.getters.getToken); // 调试
          this.$router.push('/personal-kb');
        }else{
          console.error('登录错误详情:', response.data.msg); // 输出完整错误对象
          this.$message.error(response.data.msg || '登录失败');
        }
      } catch (error) {
        console.error('登录错误详情:', error); // 输出完整错误对象

      }
    }
  }
}
</script>



<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.auth-content {
  display: flex;
  width: 800px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.auth-left {
  flex: 1;
  padding: 40px;
  border-right: 1px solid #eee;
}

.auth-right {
  width: 300px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.auth-title {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.auth-form {
  max-width: 320px;
  margin: 0 auto;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
}

/* Element UI overrides */
.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  height: 40px;
}

.el-button {
  height: 40px;
  font-size: 16px;
}

.el-checkbox__label {
  font-size: 14px;
}

.el-link {
  font-size: 14px;
}
</style>

