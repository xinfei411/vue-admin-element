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
      <el-table-column prop="wx_id" label="微信ID" ></el-table-column>
      <el-table-column prop="wx_pay_type" label="支付类型" ></el-table-column>
      <el-table-column prop="wx_mch_id" label="微信商户号" ></el-table-column>
      <el-table-column prop="wx_mch_api_key" label="微信api_key" ></el-table-column>
      <el-table-column prop="wx_sub_mch_id" label="微信子商户号" ></el-table-column>
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
      <el-form :model="form" ref="form" label-width="110px">
        <el-form-item label="商户编号" prop="merchant_id">
          <el-input v-model="form.merchant_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="微信ID" prop="wx_id">
          <el-input v-model="form.wx_id"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="wx_pay_type">
          <el-input v-model="form.wx_pay_type"></el-input>
        </el-form-item>
        <el-form-item label="微信商户号" prop="wx_mch_id">
          <el-input v-model="form.wx_mch_id"></el-input>
        </el-form-item>
        <el-form-item label="微信api_key" prop="wx_mch_api_key">
          <el-input v-model="form.wx_mch_api_key"></el-input>
        </el-form-item>
        <el-form-item label="微信子商户号" prop="wx_sub_mch_id">
          <el-input v-model="form.wx_sub_mch_id"></el-input>
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
  name: "MerchantInfo",
  mixins:[CURD],
  data() {
    return {
      actions:{
        CU:"park_wx_pay_info_set.json",
        R:"park_wx_pay_info_get.json",
        D:"park_wx_pay_info_del.json",
      },
      tableDataApiKey:"park_wx_pay_info",
      form: {
        merchant_id: '',
				wx_id:'',
				wx_pay_type:'',
				wx_mch_id:'',
				wx_mch_api_key:'',
				wx_sub_mch_id:''
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
