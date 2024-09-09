<template>
    <div>
        <div style="display: flex; justify-content: space-between; padding-top: 15px;">
            <div>
                <el-input style="width: 300px; margin-right: 10px;" prefix-icon="el-icon-search"
                    placeholder="请输入用户名搜索..." v-model="searchForm.username" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" ref="searchButton"
                    :loading="loadingSearch">{{ loadingSearch ? '搜索中' : '搜索' }}</el-button>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-plus" @click="dialogAddEmp = true">添加</el-button>
                <add-emp :visible.sync="dialogAddEmp" @submit="getEmployeeList"></add-emp>
            </div>
        </div>


        <div>
            <el-table :data="employeeList" :row-class-name="tableRowClassName" style="width: 100%;height: auto;">
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="password" label="密码" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作时间" align="center" sortable>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="statusHandle(scope.row)" v-if="scope.row.username !== 'admin'"
                            ref="statusButton">
                            {{ scope.row.status === 1 ? '禁用' : '启用' }}
                        </el-button>
                        <el-button size="mini" type="primary" @click="openDialogUpdate(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="deleteEmp(scope.row)"
                            v-if="scope.row.username !== 'admin'" ref="deleteButton">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <update-emp :visible.sync="dialogUpdateEmp" :formData="selectedRow" @submit="getEmployeeList"
                @close="handleDialogCloseUpdate"></update-emp>
            <el-pagination background layout="total,sizes, prev, pager, next, jumper"
                :page-size.sync="pageParam.pageSize" :page-sizes="pageSizes" :current-page.sync="pageParam.page"
                :total="total" :hide-on-single-page="false" @size-change="getEmployeeList"
                @current-change="getEmployeeList" align="center" style="margin-top: 20px;"></el-pagination>
        </div>
    </div>
</template>

<script>
import AddEmp from '@/views/employee/AddEmp.vue'
import UpdateEmp from '@/views/employee/UpdateEmp.vue'

export default {
    name: 'employeeList',
    components: {
        AddEmp,
        UpdateEmp
    },
    data() {
        return {
            //员工列表
            employeeList: [],

            //分页设置
            pageParam: {
                page: 1,//当前页
                pageSize: 10,//当前条目数据
            },
            //搜索条件
            searchForm: {
                username: ""//姓名
            },

            total: 0,//总条目数
            pageSizes: [10, 15, 20],//每页显示条目数

            //新增员工对话框是否可见
            dialogAddEmp: false,
            //编辑员对话框是否可见
            dialogUpdateEmp: false,
            //编辑员工中被选中行的数据
            selectedRow: null,

            //搜索按钮加载
            loadingSearch: false
        }
    },
    methods: {
        /**
         * 获取员工列表
         */
        async getEmployeeList() {
            let data = Object.assign(this.searchForm, this.pageParam);
            return this.$api.admin.getEmployeeList(data).then((resp) => {
                let data = resp.data;
                if (data.code) {
                    this.total = data.data.total;
                    this.employeeList = data.data.records;
                }
            }).catch(error => {
                console.error('Caught an error:', error.message); //捕捉response拦截器返回的错误
            });
        },
        /**
         * 禁用的员工背景为黄色
         */
        tableRowClassName({ row }) {
            if (row.status === 0) {
                return 'warning-row';
            }
        },
        /**
         * 删除员工
         */
        deleteEmp(data) {
            this.$confirm('此操作将永久删除' + data.username + '，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.admin.deleteEmp(data.id).then(resp => {
                    if (resp) {
                        this.getEmployeeList();
                        this.$nextTick(() => { this.$refs.deleteButton.blur(); });
                    }
                }).catch(error => {
                    console.error('Caught an error:', error.message); //捕捉response拦截器返回的错误
                    this.$nextTick(() => { this.$refs.deleteButton.blur(); });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                this.$nextTick(() => { this.$refs.deleteButton.blur(); });
            }).finally(() => {
                // 将焦点移到 body 上，避免对话框关闭后焦点仍聚焦在按钮上
                document.activeElement.blur();
            });
        },
        /**
         * 状态修改
         */
        statusHandle(data) {
            let flag = data.status === 1 ? '禁用' : '启用'
            this.$confirm('是否' + flag + '账户：' + data.username, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.admin.updateStatusEmp(data.id, !data.status ? 1 : 0).then(resp => {
                    if (resp) {
                        this.getEmployeeList();
                    }
                }).catch(error => {
                    console.error('Caught an error:', error.message); //捕捉response拦截器返回的错误
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            }).finally(() => {
                // 将焦点移到 body 上，避免对话框关闭后焦点仍聚焦在按钮上
                document.activeElement.blur();
            });
        },

        /**
         * 控制编辑员工对话框
         */
        openDialogUpdate(rowData) {
            this.selectedRow = rowData;
            this.dialogUpdateEmp = true;
        },
        /**
         * 编辑员工对话框关闭
         */
        handleDialogCloseUpdate() {
            this.dialogUpdateEmp = false;
            this.selectedRow = null;
        },
        /**
         * 模糊搜索
         */
        async handleSearch() {
            this.loadingSearch = true;
            try {
                // 确保 getEmployeeList 返回的是 Promise，并正确使用 await
                await this.getEmployeeList();
            } finally {
                this.loadingSearch = false;
            }
            // document.activeElement.blur(); // 如果需要，可以解除注释
        }
    },
    created() {
        this.getEmployeeList();
    }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
}
</style>