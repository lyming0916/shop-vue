<template>
  <div>
    <el-card style="height: 100%">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <div id='echart' style='width: 100%; height: 550px;margin-top: 20px'></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  name: "Chart",
  data() {
    return {}
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    async initCharts() {
      const myChart = echarts.init(document.getElementById('echart'));
      // 绘制图表
      let option1;
      let option2;
      await axios({
        method: 'get',
        url: 'http://localhost:8081/getGoodsType1',
      }).then(res => {
        option1 = res.data;
      });
      await axios({
        method: 'get',
        url: 'http://localhost:8081/getGoodsType2',
      }).then(res => {
        option2 = res.data
      });
      const option = {
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: option1
        },
        yAxis: {
          //设置轴线
          /*axisLine: {
            show :true,
          }*/
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: option2,
          }
        ]
      };
      myChart.setOption(option);
    },
  },
}
</script>

<style scoped>

</style>
