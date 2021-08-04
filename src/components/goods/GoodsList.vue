<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入商品名称" @clear="loadGoodsList" clearable v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table border class="tableRow"
              :data="GoodsList"
              style="width: 100%">
      <el-table-column type="index"
                       label="#"
                       width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="number"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showAlterGoodsDia(scope.row)" plain icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click=" showDeleteGoodsMassage(scope.row)" plain icon="el-icon-delete"
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

    <!--修改用户的对话框-->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisibleAlter" style="text-align: center">
      <el-form :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" label-width="100px">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAlter = false">取 消</el-button>
        <el-button type="primary" @click="AlterGoods">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

import axios from "axios";

export default {
  name: "GoodList",
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      //表格绑定的数据
      GoodsList: [{}],
      //添加对话框属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleAlter: false,
      form: {
        name: '',
        price: '',
        number: '',
        weight: ''
      }
    }
  },
  created() {
    this.getGoodsList();
    this.getGoodsCount();
  },
  methods: {
    async getGoodsList() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/getGoodsList',
        params: {
          "query": this.query,
          "pagenum": this.pagenum,
          "pagesize": this.pagesize,
        }
      }).then(res => {
        this.GoodsList = res.data;
      })
    },
    async getGoodsCount() {
      await axios({
        method: 'get',
        url: 'http://localhost:8081/goodsCount',
        params: {
          "query": this.query
        }
      }).then(res => {
        this.total = res.data;
      })
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoodsList();
    },
    async searchGoods() {
      await this.getGoodsList();
      await this.getGoodsCount();
    },
    async loadGoodsList() {
      await this.getGoodsList();
      await this.getGoodsCount();
    },
    //删除用户盒子
    showDeleteGoodsMassage(e) {
      this.$confirm('删除这个商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteGoods(e);
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
    async deleteGoods(e) {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/deleteGoods',
        params: {
          name: e.name,
        }
      }).then(res => {
        if (res.status === 200) {
          if (this.total % this.pagesize === 1)
            this.pagenum -= 1;
          this.getGoodsList();
          this.getGoodsCount();
        }
      });
    },
    showAlterGoodsDia(user) {
      this.form = user;
      //获取用户数据
      this.dialogFormVisibleAlter = true;
    },
    async AlterGoods() {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/alterGoods',
        params: {
          name: this.form.name,
          price: this.form.price,
          number: this.form.number,
          weight: this.form.weight,
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success("修改成功!");
          this.form = {};
          //更新视图
          this.getGoodsList();
          this.dialogFormVisibleAlter = false;
        } else
          this.$message.warning("修改失败!");
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

.tableRow {
  margin-top: 10px;
}
</style>
