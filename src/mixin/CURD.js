let CURD = {
    data() {
        return {
            // 全局模糊搜索文本
            searchText: "",
            // 表格绑定数据
            tableData: [],
            // 表格选中行对象数组
            selectedRows: [],
            // 分页相关信息
            page: {
                // 当前页码，从1开始
                page_index: 1,
                // 每页容量
                page_size: 10,
                // 每页容量选项
                sizes: [10, 20, 30, 40],
                // 数据总量
                total: 0
            },
            // 新增或编辑弹出框显示控制标记
            dialogFormVisible: false,
            // 新增或编辑弹出框标题
            dialogTitle: "",
        };
    },
    created() {
        let vm = this;
        vm.goPage(vm.page.page_index);
    },
    mounted() { },
    methods: {
        //勾选发生变化句柄
        handleSelectionChange(val) {
            this.selectedRows = val;
        },
        //重置表单
        resetForm() {
            let vm = this;
            setTimeout(() => {
                vm.$refs['form'].resetFields();
            }, 0);
            
        },
        //新增或者编辑
        CU(data) {
            let vm = this;
            if (data) {
                vm.dialogTitle = "编辑";
                vm.form = data;
            } else {
                vm.resetForm();
                vm.dialogTitle = "新增";
            }
            vm.dialogFormVisible = true;
        },
        //新增或者编辑保存按钮句柄
        sure() {
            let vm = this;
            vm.get(vm.actions.CU, vm.form).then(data => {
                vm.dialogFormVisible = false;
                let targetPage =
                    vm.dialogTitle == "新增" ? 1 : vm.page.page_index;
                vm.goPage(targetPage);
            });
        },
        //删除操作提示
        deleteOperation(rows) {
            let vm = this;
            vm
                .$confirm("确认删除信息?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    vm.remove(rows);
                })
                .catch(() => { });
        },
        //批量删除
        remove(rows) {
            let vm = this;
            vm
                .get(vm.actions.D, { merchant_info: vm.selectedRows })
                .then(resp => {
                    vm.$message({
                        message: "删除成功",
                        type: "success"
                    });
                });
        },
        //获取某页数据
        goPage(index) {
            let vm = this;
            vm
                .get(vm.actions.R, {
                    page_index: index,
                    page_size: vm.page.page_size,
                    search: vm.searchText
                })
                .then(resp => {
                    vm.tableData = resp[vm.tableDataApiKey];
                    vm.page.total = resp.total || 1;
                });
        },
        //每页容量改变句柄
        handleSizeChange(val) {
            let vm = this;
            vm.goPage(1);
        },
        //页码变化句柄
        handleCurrentChange(val) {
            let vm = this;
            vm.goPage(val);
        }
    }
};
export default CURD;