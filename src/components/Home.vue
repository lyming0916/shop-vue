<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <h3>李晏溟</h3>
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理平台</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" @click="logout" class="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :unique-opened="true" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>顾客管理</span>
            </template>
            <el-menu-item index="user">
              <i class="el-icon-basketball"></i>
              <span>顾客列表</span>
            </el-menu-item>
          </el-submenu>
          <!--          <el-submenu index="2">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                      </template>
                      <el-menu-item index="2-1">
                        <i class="el-icon-basketball"></i>
                        <span>角色列表</span>
                      </el-menu-item>
                      <el-menu-item index="2-2">
                        <i class="el-icon-basketball"></i>
                        <span>权限列表</span>
                      </el-menu-item>
                    </el-submenu>-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goodsList">
              <i class="el-icon-basketball"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="goodsAdd">
              <i class="el-icon-basketball"></i>
              <span>商品添加</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="order">
              <i class="el-icon-basketball"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="Chart">
              <i class="el-icon-basketball"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  beforeCreate() {
    const token = sessionStorage.getItem("token");
    if (!token)
      this.$router.push("login");
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("login");
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: deepskyblue;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}

.middle {
  text-align: center;
}

.logout {
  line-height: 60px;
  text-decoration: none;
}
</style>
