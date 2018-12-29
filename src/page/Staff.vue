<template>
  <div class="staff">
    <div class="top">
      <div class="action">
        <el-button type="primary">新增</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchText"></el-input>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      class="center"
      height="calc(100% - 84px)"
    >
      <el-table-column prop="Role_name" label="昵称" width="300"></el-table-column>
      <el-table-column fixed prop="departname" label="部门" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="tel" label="电话号码" width="120"></el-table-column>
      <el-table-column prop="createdate" label="创建日期" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="deleteOperation(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
const getUserUrl = "https://www.wmstlink.com/lot/admin/get_user",
deleteUrl = "https://www.wmstlink.com/lot/admin/del_user";
export default {
  name: "Staff",
  data() {
    return {
      title: "员工",
      currentPage: 1,
      searchText:"",
      tableData: [
        // {
        //   id: "000001",
        //   createdate: "20171223",
        //   departid: "2",
        //   departname: "登记部",
        //   name: "陈明",
        //   note: "",
        //   phone: "18651647302",
        //   tel: "111",
        //   Role_id: "2f7aa2d4-4eda-45ec-9185-27f62c9b1474",
        //   Role_name: "最牛操作员"
        // }
        
      ]
    };
  },
  methods: {
    //获取用户信息
    getUser(){
      let vm = this;
      ajax.post(getUserUrl,{}).then(resp=>{
        vm.tableData = resp.user;
      });
    },
    //删除操作
    deleteOperation(row){
      let vm = this;
      vm.$confirm('确认删除员工信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.deleteUser(row);//删除员工
        }).catch(() => {
                
        });
    },
    //删除员工
    deleteUser(row){
      let vm = this;
      //TODO:
      //要支持删除多个员工
      ajax.post(deleteUrl,{user_ids:[row.id]}).then(resp=>{
        vm.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staff {
  margin-right: 30px;
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
