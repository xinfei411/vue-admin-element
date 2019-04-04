<template>
  <div class="merchantInfo">
    <div class="top">
      <div class="action">
      </div>
      <div class="search">
        <el-input placeholder="请输入搜索内容（全字段模糊匹配）" prefix-icon="el-icon-search" v-model="searchText"  @keyup.native.enter="goPage(1)"></el-input>
      </div>
    </div>
    <el-table :data="tableData" border style="width:calc(100vw - 270px)" class="center" height="calc(100% - 84px)">
      <el-table-column prop="merchant_id" label="商户编号" width="160px" show-overflow-tooltip fixed></el-table-column>
      <el-table-column prop="merchant_name" label="商户名称" width="160px" show-overflow-tooltip fixed></el-table-column>
      <el-table-column prop="car_id" label="车牌" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cups_no" label="交易流水" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" label="状态" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="in_time" label="进场时间" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="out_time" label="出场时间" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="收费金额" width="160px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pay_time" label="缴费时间" width="160px" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page_index"
      :page-sizes="page.sizes"
      :page-size="page.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination"></el-pagination>
  </div>
</template>

<script>
import CURD from "@/mixin/CURD.js"
export default {
  name: "ParkCarFlow",
  mixins:[CURD],
  data() {
    return {
      actions:{
        R:"park_car_flow_get.json",
      },
      tableDataApiKey:"park_car_flow",
      form: {
        merchant_id: '',
				car_id:'',
				cups_no:'',
				state:'',
				in_time:'',
				out_time:'',
				amount:'',
				merchant_name:'',
				pay_time:''
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.merchantInfo {
  height: 100%;
}
.top {
  display: flex;
}
.top .action {
  flex: 2;
}
.top .search {
  flex: 1;
  text-align: right;
}
.center {
  margin: 10px 0;
}
.pagination {
  text-align: right;
}
</style>
