<template>
    <div>
        <div style="display: flex; justify-content: space-between; padding-top: 15px;">
            <div>
                <el-input style="width: 300px; margin-right: 10px;" prefix-icon="el-icon-search"
                    placeholder="请输入员工姓名搜索..."></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-plus" @click="dialogAddEmp = true">添加</el-button>
                <add-emp :visible.sync="dialogAddEmp"></add-emp>
            </div>
        </div>


        <div>
            <el-table :data="employeeList" :row-class-name="tableRowClassName" style="width: 100%;height: auto;">
                <el-table-column prop="username" label="用户名" align="center">
                </el-table-column>
                <!-- <el-table-column prop="phoneNumber" label="手机号" align="center">
            </el-table-column> -->
                <el-table-column prop="password" label="密码" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作时间" align="center" sortable>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="statusHandle(scope.row)" v-if="scope.row.username !== 'admin'">
                            {{ scope.row.status === 1 ? '禁用' : '启用' }}
                        </el-button>
                        <el-button size="mini" type="primary" @click="handleEdit()">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="deleteEmp(scope.row)"
                            v-if="scope.row.username !== 'admin'">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes, prev, pager, next, jumper"
                :page-size.sync="pageParam.pageSize" :page-sizes="pageSizes" :current-page.sync="pageParam.page"
                :total="total" :hide-on-single-page="false" @size-change="getEmployeeList"
                @current-change="getEmployeeList"></el-pagination>
        </div>
    </div>
</template>

<script>
import AddEmp from '@/views/employee/AddEmp.vue'

export default {
    name: 'employeeList',
    components: {
        AddEmp
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
            total: 0,//总条目数
            pageSizes: [10, 15, 20],//每页显示条目数

            //新增员工对话框是否可见
            dialogAddEmp: false,
        }
    },
    methods: {
        /**
         * 获取员工列表
         */
        getEmployeeList() {
            this.$api.employee.getEmployeeList(this.pageParam).then((resp) => {
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
                    }
                }).catch(error => {
                    console.error('Caught an error:', error.message); //捕捉response拦截器返回的错误
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
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
                })
            })
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