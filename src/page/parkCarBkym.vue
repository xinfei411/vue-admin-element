<template>
  <div class="merchantInfo">
    <div class="top">
      <div class="action">
        <el-button @click="CU('')">新增</el-button>
        <el-button @click="() => CU(selectedRows[0])" :disabled="selectedRows.length==0">编辑</el-button>
        <el-button @click="deleteOperation(selectedRows)" :disabled="selectedRows.length==0">删除</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入搜索内容（全字段模糊匹配）" prefix-icon="el-icon-search" v-model="searchText"  @keyup.native.enter="goPage(1)"></el-input>
      </div>
    </div>
    <el-table :data="tableData" border style="flex:1" class="center" height="calc(100% - 84px)" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="36"></el-table-column>
      <el-table-column prop="merchant_id" label="商户编号"></el-table-column>
      <el-table-column prop="car_id" label="车牌号" ></el-table-column>
      <el-table-column prop="s_date" label="开始日期" ></el-table-column>
      <el-table-column prop="e_date" label="结束日期" ></el-table-column>
      <el-table-column prop="fee" label="收费金额" ></el-table-column>
      <el-table-column prop="record" label="备注" ></el-table-column>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="200px;">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="商户编号" prop="merchant_id">
          <el-input v-model="form.merchant_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="car_id">
          <el-input v-model="form.car_id"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="s_date">
          <el-input v-model="form.s_date"></el-input>
        </el-form-item>
        <el-form-item label="结束日期" prop="e_date">
          <el-input v-model="form.e_date"></el-input>
        </el-form-item>
        <el-form-item label="收费金额" prop="fee">
          <el-input v-model="form.fee"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="record">
          <el-input v-model="form.record"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CURD from "@/mixin/CURD.js"
export default {
  name: "ParkCarBkym",
  mixins:[CURD],
  data() {
    return {
      actions:{
        CU:"park_car_bkym_set.json",
        R:"park_car_bkym_get.json",
        D:"park_car_bkym_del.json",
      },
      tableDataApiKey:"park_car_bkym",
      form: {
        merchant_id: '',
				car_id:'',
				s_date:'',
				e_date:'',
				fee:'',
				record:''
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
