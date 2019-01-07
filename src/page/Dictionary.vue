<template>
  <div class="dictionary">
    <div class="left">
      <el-tree
      ref="tree"
      :data="dict"
      node-key="data"
      @node-click="nodeClick"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
      </span>
    </el-tree>
    </div>
    <div class="right">
      <div class="top">
      <div class="action">
        <el-button @click="append('')">新增</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchText"></el-input>
      </div>
    </div>
    <el-table
      :data="dictTable"
      border
      style="flex:1"
      class="center"
      height="calc(100% - 84px)"
    >
      <el-table-column prop="data" label="字典值"></el-table-column>
      <el-table-column prop="name" label="字典名称" ></el-table-column>
      <el-table-column prop="note" label="备注" ></el-table-column>
      <el-table-column prop="sort" label="排序" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="() => append(scope.row)">编辑</el-button>
          <el-button @click="deleteOperation(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page_i"
      :page-sizes="page.sizes"
      :page-size="page.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination"
    ></el-pagination>
    </div>
    
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="200px;">
      <el-form :model="form" label-width="80px">
        <el-form-item label="字典值">
          <el-input v-model="form.data"></el-input>
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
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
  name: "Dictionary",
  data() {
    return {
      title: "员工",
      dict: [],
      page: {
        page_i: 1,
        page_size: 10,
        sizes: [10, 20, 30, 40],
        total: 0
      },
      searchText: "",
      dictTable: [],
      dialogFormVisible: false,
      dialogTitle: "",
      form: {
        type: "",
        date: "",
        name: "",
        note: "",
        sort: ""
      }
    };
  },
  created() {
    let vm = this;
    vm.goPage(vm.page.page_index);
    vm.get("get_dict.json", {}).then(data => {
      vm.dict = [
        {
          type: "000000",
          data: "000000",
          name: "编码字典类目",
          note: "",
          sort: "0",
          children: data.dict
        }
      ];
    });
  },
  mounted() {},
  methods: {
    //初始化
    resetForm() {
      let vm = this;
      vm.form = {
        type: "",
        date: "",
        name: "",
        note: "",
        sort: ""
      };
    },
    //删除操作
    deleteOperation(row) {
      let vm = this;
      vm
        .$confirm("确认删除字典信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          vm.deleteUser(row);
        })
    },
    goPage(index) {
      let vm = this;
      vm
        .get("get_user.json", {
          page_index: index,
          page_size: vm.page.page_size
        })
        .then(resp => {
          vm.users = resp.users;
          vm.page.total = resp.total;
        });
    },
    append(data) {
      let vm = this;
      if (data) {
        //编辑
        vm.dialogTitle = "编辑字典信息";
        vm.form = data;
      } else {
        vm.resetForm(); //初始化form
        var node=vm.$refs.tree.getCurrentNode();
        vm.form.type=node.data;
        vm.dialogTitle = "新增字典信息";
      }
      vm.dialogFormVisible = true;
    },
    sure() {
      let vm = this;
      vm.get("edit_user.json", vm.form).then(data => {
        vm.dialogFormVisible = false;
        let targetPage =
          vm.dialogTitle == "新增员工信息" ? 1 : vm.page.page_index;
        vm.goPage(targetPage);
      });
    },
    nodeClick(data) {
      let vm = this;
      vm
        .get("get_dict.json", {
          page_i: vm.page.page_index,
          page_size: vm.page.page_size,
          type: data.type,
          search: vm.searchText
        })
        .then(data => {
          vm.dictTable = data.dict;
          vm.page.page_i = data.page.page_i;
          vm.page.page_size = data.page.page_size;
          vm.page.page_total = data.page.page_total;
        });
    },
    //删除员工
    deleteUser(row) {
      let vm = this;
      //TODO:
      //要支持删除多个员工
      vm
        .get("del_user.json", {
          dict: { type: row.type, data: row.data }
        })
        .then(resp => {
          vm.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
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
.dictionary {
  display: flex;
  height: 100%;
}
.dictionary > .left {
  padding-right: 10px;
  width: 300px;
  height: 100%;
}
.dictionary > .right {
  flex: 1;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
