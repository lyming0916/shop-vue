<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入顾客姓名" @clear="loadOrderList" clearable v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
        </el-input>
        <el-button type="success" @click="showAddOrderDia">添加订单</el-button>
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
        label="顾客姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="date"
        label="下单时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="showDeleteOrderMassage(scope.row)" plain icon="el-icon-delete"
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

    <el-dialog title="添加订单" :visible.sync="dialogFormVisibleAdd" style="text-align: center">
      <el-form :model="form">
        <el-form-item label="顾客姓名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" label-width="100px">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddOrder">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

import axios from "axios";

export default {
  name: "Order",
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      //表格绑定的数据
      userList: [{}],
      //添加对话框属性
      dialogFormVisibleAdd: false,
      //添加用户的表单数据
      form: {
        username: '',
        goodsname: '',
        number: '',
        date: '',
      },
    }
  },
  created() {
    this.getOrderList();
    this.getOrderCount();
  },
  methods: {
    async getOrderList() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/getOrderList',
        params: {
          "query": this.query,
          "pagenum": this.pagenum,
          "pagesize": this.pagesize,
        }
      }).then(res => {
        this.userList = res.data;
      })
    },
    async getOrderCount() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/orderCount',
        params: {
          "query": this.query
        }
      }).then(res => {
        this.total = res.data;
      })
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getOrderList();
    },
    async searchOrder() {
      await this.getOrderList();
      await this.getOrderCount();
    },
    async loadOrderList() {
      await this.getOrderList();
      await this.getOrderCount();
    },
    showAddOrderDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },

    async AddOrder() {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/addOrder',
        params: {
          username: this.form.username,
          goodsname: this.form.goodsname,
          number: this.form.number,
          date: this.form.date
        }
      }).then(res => {
        if (res.data === 1)
          this.$message.warning("请将信息输入完整");
        else if (res.data === 2)
          this.$message.error("没有该顾客");
        else if (res.data === 3)
          this.$message.error("没有该商品");
        else if (res.data === 4)
          this.$message.error("商品数量不足");
        else if (res.data === 5) {
          this.$message.success("购买成功!");
          //更新视图
          this.getOrderList();
          this.getOrderCount();
          this.form = {};
        }
      })
    },
    //删除用户盒子
    showDeleteOrderMassage(e) {
      this.$confirm('删除这个订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrder(e);
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
    async deleteOrder(e) {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/deleteOrder',
        params: {
          username: e.username,
          goodsname: e.goodsname,
          number: e.number,
        }
      }).then(res => {
        if (res.status === 200) {
          if (this.total % this.pagesize === 1)
            this.pagenum -= 1;
          this.getOrderList();
          this.getOrderCount();
        }
      });
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
