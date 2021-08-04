<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>顾客管理</el-breadcrumb-item>
      <el-breadcrumb-item>顾客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入姓名" @clear="loadUserList" clearable v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column type="index"
                       label="#"
                       width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showAlterUserDia(scope.row)" plain icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click=" showDeleteUserMassage(scope.row)" plain icon="el-icon-delete"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1,2,3,4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" style="text-align: center">
      <el-form :model="form">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="100px">
          <el-date-picker value-format=yyyy-MM-dd
                          v-model="form.date"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleAlter" style="text-align: center">
      <el-form :model="form">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAlter = false">取 消</el-button>
        <el-button type="primary" @click="AlterUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      //表格绑定的数据
      userList: [{
        mg_state: true,
      }],
      //添加对话框属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleAlter: false,
      //添加用户的表单数据
      form: {
        username: '',
        email: '',
        mobile: '',
      },
    }
  },
  created() {
    this.getUserList();
    this.getUserCount();
  },
  methods: {
    async getUserList() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/getUserList',
        params: {
          "query": this.query,
          "pagenum": this.pagenum,
          "pagesize": this.pagesize,
        }
      }).then(res => {
        this.userList = res.data;
      })
    },
    async getUserCount() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/userCount',
        params: {
          "query": this.query
        }
      }).then(res => {
        this.total = res.data;
      })
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserCount();
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserCount();
      this.getUserList();
    },
    async searchUser() {
      await this.getUserList();
      await this.getUserCount();
    },
    async loadUserList() {
      await this.getUserList();
      await this.getUserCount();
    },
    //添加用户表单
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //添加用户
    async AddUser() {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/addUser',
        params: {
          username: this.form.username,
          email: this.form.email,
          mobile: this.form.mobile,
          date: this.form.date
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success("添加成功!");
          //更新视图
          this.getUserList();
          this.getUserCount();
          this.form = {};
        }
      })
    },
    //删除用户盒子
    showDeleteUserMassage(e) {
      this.$confirm('删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(e);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    async deleteUser(e) {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/deleteUser',
        params: {
          username: e.username,
        }
      }).then(res => {
        if (res.status === 200) {
          if (this.total % this.pagesize === 1)
            this.pagenum -= 1;
          this.getUserCount();
          this.getUserList();
        }
      });
    },
    showAlterUserDia(user) {
      this.form = user;
      console.log(user)
      //获取用户数据
      this.dialogFormVisibleAlter = true;
    },
    async AlterUser() {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/alterUser',
        params: {
          username: this.form.username,
          email: this.form.email,
          mobile: this.form.mobile,
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success("修改成功!");
          this.form = {};
          //更新视图
          this.getUserList();
          this.dialogFormVisibleAlter = false;
        } else
          this.$message.warning("修改失败!");
      })
    },
    async changeState(user) {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/changeState',
        params: {
          username: user.username,
          state: user.mg_state
        }
      })
    },
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.inputSearch {
  width: 300px;
}

.searchRow {
  margin-top: 20px;
}
</style>
