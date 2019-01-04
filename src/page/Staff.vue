<template>
  <div class="staff">
    <div class="top">
      <div class="action">
        <el-button @click="append('')">新增</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchText"></el-input>
      </div>
    </div>
    <el-table
      :data="users"
      border
      style="flex:1"
      class="center"
      height="calc(100% - 84px)"
    >
      <el-table-column prop="id" label="员工编号"></el-table-column>
      <el-table-column prop="name" label="员工姓名" ></el-table-column>
      <el-table-column prop="departname" label="部门" ></el-table-column>
      <el-table-column prop="Role_name" label="角色" ></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="tel" label="电话号码"></el-table-column>
      <el-table-column prop="createdate" label="注册日期"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="() => append(scope.row)">编辑</el-button>
          <el-button @click="deleteOperation(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page_index"
      :page-sizes="page.sizes"
      :page-size="page.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination"
    ></el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="200px;">
      <el-form :model="form" label-width="80px">
        <el-form-item label="部门">
          <el-select v-model="form.departid" placeholder="请选择">
            <el-option
              v-for="item in departnames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.Role_id" placeholder="请选择">
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone"></el-input>
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
export default {
  name: "Staff",
  data() {
    return {
      title: "员工",
      page:{
        page_index: 1,
        page_size:10,
        sizes:[10, 20, 30, 40],
        total:0
      },
      searchText:"",
      users: [],
      dialogFormVisible:false,
      dialogTitle:"",
      form: {
        id: "",
        createdate: "",
        departid: "",
        departname: "",
        name: "",
        note: "",
        phone: "",
        tel: "",
        Role_id: "",
        Role_name: ""
      },
      role:[],
      departnames:[
        {
          label:"登记部",
          value:"2"
        },
        {
          label:"开发者",
          value:"1"
        },
      ],
    };
  },
  created(){
    let vm = this
    vm.goPage(vm.page.page_index);
    vm.getRole();//获取角色
  },
  mounted(){
  },
  methods: {
    //初始化
    resetForm(){
      let vm = this
      vm.form = {
        id: "",
        createdate: "",
        departid: "",
        departname: "",
        name: "",
        note: "",
        phone: "",
        tel: "",
        Role_id: "",
        Role_name: ""
      }
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
    goPage(index){
      let vm = this;
      vm.get("get_user.json",{
        page_index:index,
        page_size: vm.page.page_size
        }).then(resp=>{
        vm.users = resp.users;
        vm.page.total = resp.total;
      });
    },
    append(data){
      let vm = this
      if(data){//编辑
        vm.dialogTitle = "编辑员工信息"
        vm.form = data;
      }else{
        vm.resetForm();//初始化form
        vm.dialogTitle = "新增员工信息"
      }
      vm.dialogFormVisible = true;
    },
    sure(){
      let vm=this
      vm.get("edit_user.json", vm.form).then(data => {
        vm.dialogFormVisible = false
        let targetPage=vm.dialogTitle == "新增员工信息"?1:vm.page.page_index;
        vm.goPage(targetPage);
      });
    },
    //删除员工
    deleteUser(row){
      let vm = this;
      //TODO:
      //要支持删除多个员工
      vm.get("del_user.json",{user_ids:[row.id]}).then(resp=>{
        vm.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      });
    },
    getRole(){
      let vm = this;
      vm.get("get_role.json",{}).then(resp=>{
        vm.role = resp.role;
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
