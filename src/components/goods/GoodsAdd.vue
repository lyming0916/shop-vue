<template>
  <div>
    <el-card class="box-card">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
      <!--提示-->
      <el-alert class="alert"
                title="添加商品信息"
                type="success"
                center
                show-icon>
      </el-alert>
      <!--步骤条-->
      <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="基本信息"></el-step>
        <!--    <el-step title="商品图片" ></el-step>-->
        <el-step title="商品描述"></el-step>
      </el-steps>

      <el-form label-position="top" label-width="80px" :model="form" style="height:450px;overflow: auto">
        <el-tabs v-model="active" tab-position="left">
          <el-tab-pane name="0" label="基本信息">
            <el-form-item label="商品名称" label-width="100px">
              <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" label-width="100px">
              <el-input v-model="form.price" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" label-width="100px">
              <el-input v-model="form.number" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" label-width="100px">
              <el-input v-model="form.weight" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" label-width="100px">
              <el-select v-model="value" placeholder="请选择" @change="setLabel">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <!--          <el-tab-pane name="1" label="商品参数">商品图片</el-tab-pane>-->
          <el-tab-pane name="1" label="商品描述">
            <el-form-item label="商品介绍">
              <el-input v-model="form.introduce" placeholder="请输入内容" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品日期">
              <el-input v-model="form.date" placeholder="2000-09-16"></el-input>
            </el-form-item>
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "GoodAdd",
  data() {
    return {
      active: '0',
      value: '',
      options: [{}],
      form: {
        name: '',
        price: '',
        number: '',
        weight: '',
        date: '',
        value: '',
        introduce: '',
      },
    }
  },
  async created() {
    await axios({
      method: 'get',
      url: 'http://localhost:8081/getGoodsType',
    }).then(res => {
      this.options = res.data;
    })
  },
  methods: {
    setLabel() {
      this.form.value = this.value;
    },
    async addGoods() {
      await axios({
        method: 'post',
        url: 'http://localhost:8081/addGoods',
        params: {
          name: this.form.name,
          price: this.form.price,
          number: this.form.number,
          weight: this.form.weight,
          date: this.form.date,
          value: this.form.value,
          introduce: this.form.introduce,
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message.success("添加成功!");
          this.form = {};
          this.active = '0';
        }
      })
    }
  }
}
</script>

<style scoped>
.alert {
  margin-top: 10px;
}

.box-card {
  height: 100%;
}
</style>
