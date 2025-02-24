<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-left">
        <h2 class="auth-title">注册账号</h2>
        <el-form ref="registerForm" :model="registerForm" :rules="rules" class="auth-form">
          <el-form-item prop="name">
            <el-input
                v-model="registerForm.name"
                placeholder="请输入姓名"
                prefix-icon="el-icon-user"
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
                v-model="registerForm.email"
                placeholder="请输入邮箱"
                prefix-icon="el-icon-message"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
            />
          </el-form-item>

          <el-form-item prop="repeatpassword">
            <el-input
                v-model="registerForm.repeatpassword"
                type="password"
                placeholder="请确认密码"
                prefix-icon="el-icon-lock"
                show-password
            />
          </el-form-item>

          <el-button type="primary" class="submit-btn" @click="handleRegister">
            注册
          </el-button>
        </el-form>
      </div>

      <div class="auth-right">
        <h3>已有账号?</h3>
        <el-button type="primary" @click="goToLogin">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/api'

export default {
  name: 'Register',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        repeatpassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' }
        ],
        repeatpassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goToLogin() {
      console.log('Navigating to login page')  // 添加这行来调试
      this.$router.push('/login')
    },
    async handleRegister() {
      try {
        const valid = await this.$refs.registerForm.validate()
        if (!valid) return

        const { name, email, password, repeatpassword } = this.registerForm
        const response = await register(name, email, password, repeatpassword)

        if (response.data) {
          this.$message.success('注册成功')
          this.$router.push('/personal-kb')
        }
      } catch (error) {
        this.$message.error(error.response?.data?.message || '注册失败')
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

