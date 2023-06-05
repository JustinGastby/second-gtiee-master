<template>
  <div class="login_container">
    <div class="login_box">
      <div class="aver_box">
        <img src="../assets/logo.jpg" />
      </div>
      <el-form class="login_form" ref="loginRef" :model="loginForm" label-width="110px">
        <el-form-item class="item" prop="username" label="账号">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号" clearable></el-input>
        </el-form-item>
        <el-form-item class="item" prop="password" label="密码">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-key" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-radio v-model="radio" label="1" border size="medium">用户</el-radio>
          <el-radio v-model="radio" label="2" border size="medium">系统管理员</el-radio>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="text" @click="zhuce">注册账号</el-button>
          <el-button type="primary" @click="login" size="mini">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="注册账号" :visible.sync="dialogVisible" width="30%">
      <el-form :model="zhuceForm" :rules="zhucerules" ref="ruleForm" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="zhuceForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="zhuceForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="zhuceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="userid">
          <el-input v-model="zhuceForm.userid"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="zhuceForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="zhuceForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addconfirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '',
      dialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      zhuceForm: {
        userid: '',
        email: '',
        phone: '',
        password: '',
        account: '',
        name: ''
      },
      zhucerules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userid: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    zhuce() {
      this.dialogVisible = true
    },
    async login() {
      if (this.radio == 1 && this.loginForm.username != '' && this.loginForm.password != '') {
        //判断条件
        const res = await this.$http.post('user/login', this.loginForm)
        if (res.data.code == 200) {
          this.$message.success('登录成功！')
          this.$router.push('/user') //页面跳转
        } else {
          this.$message.error('登录失败！')
        }
      } else if (this.radio == 2 && this.loginForm.username == 'admin' && this.loginForm.password == '123') {
        this.$router.push('/second')
      } else {
        this.$message.error('登录失败！')
      }
    },
    addconfirm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('user/register', this.zhuceForm)
          if (res.data.code == 200) {
            this.$message.success('注册成功！')
          } else {
            this.$message.error('注册失败！')
          }
        } else {
          this.$message.error('注册失败！')
        }
      })
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  // background-color: aquamarine;
  background-image: linear-gradient(rgba(63, 141, 243, 0.5), rgba(255, 255, 0, 0.5)), url('../assets/css/login-bg.svg');
  height: 100%;
}
.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .aver_box {
    height: 140px;
    width: 140px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
}
.item {
  margin-bottom: 15px;
}
</style>
