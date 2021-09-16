<template>
  <div class="logins">
    <div class="navage">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="inpfom">
      <el-form :model="form" :rules="rulesform" ref="reveform">
        <el-form-item prop="names">
          <el-input v-model="form.names" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            v-model="form.pass"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="loginse">
          <el-button type="primary" @click="logins">登录</el-button>
          <el-button type="infor" @click="fns">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  methods: {
    fns() {
      this.$refs.reveform.resetFields()
    },
    logins() {
      this.$refs.reveform.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { names: username, pass: password } = this.form
        const { data: amsg } = await this.$axios.post('login', {
          username,
          password
        })
        console.log(amsg)
        if (amsg.meta.status !== 200) {
          console.log('登陆失败')
          this.$message.error('登陆失败!')
        } else if (amsg.meta.status === 200) {
          console.log('登陆成功')
          this.$message.success('登陆成功')
          console.log(amsg.data.token)
          window.sessionStorage.setItem('token', amsg.data.token)
          this.$router.push('/home')
        }
      })
    }
  },
  data() {
    return {
      form: {
        names: 'admin',
        pass: '123456'
      },
      rulesform: {
        names: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logins {
  position: absolute;
  width: 450px;
  height: 300px;
  background-color: aliceblue;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.navage {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px;
  background-color: aliceblue;
}
.navage > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.inpfom {
  box-sizing: border-box;
  width: 90%;
  height: 60%;
  position: absolute;
  margin: 100px 22.5px;
}
.loginse {
  display: flex;
  justify-content: flex-end;
}
</style>
