<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formLabelAlign">
      <h2 style="text-align: center">用户登录</h2>
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" v-on:click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      formLabelAlign: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if (this.formLabelAlign.name === "" || this.formLabelAlign.password === "") {
        this.$message.warning("请输入完整信息");
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8081/login',
          params: {
            "name": this.formLabelAlign.name,
            "password": this.formLabelAlign.password
          }
        }).then(res => {
          if (res.data === 1) {
            sessionStorage.setItem("token", res.data.token);
            this.$message.success("登录成功!");
            this.$router.push({name: 'home'});
          } else
            this.$message.error("登录失败,用户名或密码错误");
        })
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: deepskyblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 30px;
}

.login-btn {
  width: 100%;
}
</style>
