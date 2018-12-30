<template>
  <div class="role">
    <div class="left">
      <el-button-group>
        <el-button type="primary" @click="append">新增</el-button>
        <el-button type="primary" @click="append('edit')" v-if="currentRow">修改</el-button>
        <el-button type="primary" @click="remove" v-if="currentRow">删除</el-button>
      </el-button-group>
      <el-table
        ref="singleTable"
        :data="role"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          property="name"
          label="角色名称">
        </el-table-column>
        <el-table-column
          property="note"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <el-button-group>
        <el-button type="primary" @click="save">保存权限</el-button>
        <el-button type="primary" @click="openAll(true)">全部展开</el-button>
        <el-button type="primary" @click="openAll(false)">全部折叠</el-button>
      </el-button-group>
      <el-tree
      ref="tree"
      show-checkbox
      :data="menu"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.text }}</span>
      </span>
    </el-tree>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="300px;">
      <el-form :model="form" label-width="40px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      role: [],
      currentRow: null,
      menu: [],
      roleMenu: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        state: "",
        sort: "",
        note: ""
      },
      dialogTitle: "",
      state: [{ label: "停用", value: "0" }, { label: "启用", value: "1" }]
    };
  },
  created() {
    let vm = this;
    vm.init();
  },
  methods: {
    init() {
      let vm = this;
      vm.get("get_role.json", {}).then(data => {
        vm.role = data.role;
      });
      vm.get("get_menu.json", vm.user).then(data => {
        vm.menu = data.menu;
      });
    },
    handleCurrentChange(val) {
      let vm = this;
      vm.currentRow = val;
      vm.get("get_role_menu.json", {}).then(data => {
        data.menu.forEach(element => {
          vm.roleMenu.push(element.id);
        });
        vm.$refs.tree.setCheckedKeys(vm.roleMenu);
      });
    },
    resetForm(val) {
      this.form = {
        id: "",
        name: "",
        state: "",
        sort: "",
        note: ""
      };
    },
    append(type) {
      let vm = this;
      if ("edit" == type) {
        vm.dialogTitle = "编辑角色";
        vm.form = vm.currentRow;
      } else {
        vm.resetForm();
        vm.dialogTitle = "添加角色";
      }
      vm.dialogFormVisible = true;
    },
    remove() {
      let vm = this;
      if (confirm("确认删除角色吗？")) {
        vm
          .get("del_role.json", {
            menu: {
              id: vm.currentRow.id
            }
          })
          .then(data => {
            vm.init();
          });
      }
    },
    openAll(flag) {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = flag;
      }
    },
    sure() {
      let vm = this;
      vm.get("edit_role.json", vm.form).then(data => {
        vm.dialogFormVisible = false;
        vm.init();
      });
    },
    save() {
      let vm = this,
        ids = vm.$refs.tree.getCheckedKeys(true); //只返回叶子节点
      vm.get("edit_role_menu.json", ids).then(data => {
        vm.dialogFormVisible = false;
        vm.init();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.role {
  display: flex;
}
.role .left {
  padding-right: 10px;
  width: 300px;
}
.role .right {
  flex: 1;
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