<template>
  <div class="page">
    <el-tree
      :data="menu"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.text }}</span>
        <span>
          <span style="display: inline-block;width:80px">{{ data.url }}</span>
          <span style="display: inline-block;width:100px">{{ data.icon }}</span>
          <span style="display: inline-block;width:80px">{{ data.sort }}</span>
          <span style="display: inline-block;width:80px">{{ data.state }}</span>
          <span style="display: inline-block;width:160px">{{ data.note }}</span>
          <span style="display: inline-block;width:160px">
            <el-button
            type="text"
            size="mini"
            @click="() => append(data,'append')">
            添加下级
          </el-button>
          <el-button
            v-if="data.id"
            type="text"
            size="mini"
            @click="() => append(data,'edit')">
            编辑
          </el-button>
          <el-button
            v-if="data.id"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
          </span>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="300px;">
      <el-form :model="form" label-width="40px">
        <el-form-item label="名称">
          <el-input v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in icon"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <i :class="item.label"></i>
              <span>{{ item.label }}</span>
            </el-option>
          </el-select>
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
</template>

<script>
export default {
  name: "Page",
  data() {
    return {
      menu: [],
      dialogFormVisible: false,
      form: {
        fa_id:'',
        url: "",
        text: "",
        icon: "",
        state: "",
        sort: "",
        note: ""
      },
      dialogTitle: "",
      state: [{ label: "停用", value: '0' }, { label: "启用", value: '1' }],
      i: [
        "el-icon-info",
        "el-icon-error",
        "el-icon-success",
        "el-icon-warning",
        "el-icon-question",
        "el-icon-back",
        "el-icon-arrow-left",
        "el-icon-arrow-down",
        "el-icon-arrow-right",
        "el-icon-arrow-up",
        "el-icon-caret-left",
        "el-icon-caret-bottom",
        "el-icon-caret-top",
        "el-icon-caret-right",
        "el-icon-d-arrow-left",
        "el-icon-d-arrow-right",
        "el-icon-minus",
        "el-icon-plus",
        "el-icon-remove",
        "el-icon-circle-plus",
        "el-icon-remove-outline",
        "el-icon-circle-plus-outline",
        "el-icon-close",
        "el-icon-check",
        "el-icon-circle-close",
        "el-icon-circle-check",
        "el-icon-circle-close-outline",
        "el-icon-circle-check-outline",
        "el-icon-zoom-out",
        "el-icon-zoom-in",
        "el-icon-d-caret",
        "el-icon-sort",
        "el-icon-sort-down",
        "el-icon-sort-up",
        "el-icon-tickets",
        "el-icon-document",
        "el-icon-goods",
        "el-icon-sold-out",
        "el-icon-news",
        "el-icon-message",
        "el-icon-date",
        "el-icon-printer",
        "el-icon-time",
        "el-icon-bell",
        "el-icon-mobile-phone",
        "el-icon-service",
        "el-icon-view",
        "el-icon-menu",
        "el-icon-more",
        "el-icon-more-outline",
        "el-icon-star-on",
        "el-icon-star-off",
        "el-icon-location",
        "el-icon-location-outline",
        "el-icon-phone",
        "el-icon-phone-outline",
        "el-icon-picture",
        "el-icon-picture-outline",
        "el-icon-delete",
        "el-icon-search",
        "el-icon-edit",
        "el-icon-edit-outline",
        "el-icon-rank",
        "el-icon-refresh",
        "el-icon-share",
        "el-icon-setting",
        "el-icon-upload",
        "el-icon-upload2",
        "el-icon-download",
        "el-icon-loading"
      ],
      icon: []
    };
  },
  created() {
    let vm = this
    vm.init()
    vm.initIcon()
  },
  methods: {
    init() {
      let vm = this;
      vm.get("get_menu.json", vm.user).then(data => {
        vm.menu = [
          {
            url: "路径",
            id: "",
            fa_id: "",
            text: "菜单名",
            icon: "图标",
            state: "状态",
            sort: "排序",
            note: "备注",
            children: data.menu
          }
        ];
      });
    },
    initIcon() {
      let vm = this;
      vm.i.forEach(value => {
        vm.icon.push({
          label: value,
          value: value
        });
      });
    },
    append(data,type) {
      let vm = this;
      if ('edit'==type) {//编辑
        vm.dialogTitle = "编辑菜单"
        let dataCopy=JSON.parse(JSON.stringify(data))
        delete dataCopy.children
        vm.form=dataCopy
      } else {//添加
        vm.form.fa_id=data.id;
        vm.dialogTitle = "添加菜单"
      }
      vm.dialogFormVisible = true;
    },
    remove(node, data) {
      let vm = this;
      if (confirm("确认删除菜单吗？（如有子节点会一起删除！）")) {
        vm
          .get("del_menu.json", {
            menu: {
              id: data.id
            }
          })
          .then(data => {
            vm.init();
          });
      }
    },
    sure(){
      let vm=this
      vm.get("edit_menu.json", vm.form).then(data => {
        vm.dialogFormVisible = false
        vm.init();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-tree:first-child
  > .el-tree-node:first-child
  > .el-tree-node__content:first-child
  > .el-icon-caret-right:first-child:before {
  content: "";
}
.el-tree:first-child
  > .el-tree-node:first-child
  > .el-tree-node__content:first-child {
  background-color: #f5f7fa;
}
</style>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
