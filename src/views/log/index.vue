<template>
    <div>
        <div style="display: flex; justify-content: space-between; padding-top: 15px;">
            <div>
                <el-input style="width: 300px; margin-right: 10px;" prefix-icon="el-icon-search"
                    placeholder="请输入用户名搜索..." v-model="searchForm.username" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" ref="searchButton"
                    :loading="loadingSearch">{{ loadingSearch ? '搜索中' : '搜索' }}</el-button>
            </div>
        </div>
        <div>
            <el-table :data="logList" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-descriptions class="margin-top" :column="3" :size="size" border>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-user"></i>
                                    请求方式
                                </template>
                                {{ props.row.requestType }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-mobile-phone"></i>
                                    请求地址
                                </template>
                                {{ props.row.requestUrl }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-office-building"></i>
                                    操作耗时
                                </template>
                                {{ props.row.costTime }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-location-outline"></i>
                                    操作类名
                                </template>
                                {{ props.row.className }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    操作方法名
                                </template>
                                {{ props.row.methodName }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-office-building"></i>
                                    参数
                                </template>
                                {{ props.row.methodParams }}
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template slot="label">
                                    <i class="el-icon-office-building"></i>
                                    返回值
                                </template>
                                {{ props.row.returnValue }}
                            </el-descriptions-item>
                        </el-descriptions>
                    </template>
                </el-table-column>
                <el-table-column label="操作人员" prop="operateUser" align="center">
                </el-table-column>
                <el-table-column label="执行操作" prop="operateTitle" align="center">
                </el-table-column>
                <el-table-column label="操作时间" prop="operateTime" align="center" sortable>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes, prev, pager, next, jumper"
                :page-size.sync="pageParam.pageSize" :page-sizes="pageSizes" :current-page.sync="pageParam.page"
                :total="total" :hide-on-single-page="false" @size-change="getLogList" @current-change="getLogList"
                align="center" style="margin-top: 20px;"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Log',
    data() {
        return {
            //搜索条件
            searchForm: {
                username: ""//姓名
            },
            //搜索按钮加载
            loadingSearch: false,

            //日志列表
            logList: [],

            //分页设置
            pageParam: {
                page: 1,//当前页
                pageSize: 10,//当前条目数据
            },
            total: 0,//总条目数
            pageSizes: [10, 15, 20],//每页显示条目数
        }
    },
    methods: {
        /**
         * 获取日志列表
         */
        async getLogList() {
            let data = Object.assign(this.searchForm, this.pageParam);
            return this.$api.admin.getLogList(data).then((resp) => {
                let data = resp.data;
                if (data.code) {
                    this.total = data.data.total;
                    this.logList = data.data.records;
                }
            }).catch(error => {
                console.error('Caught an error:', error.message); //捕捉response拦截器返回的错误
            });
        },
        async handleSearch() {
            this.loadingSearch = true;
            try {
                // 确保 getEmployeeList 返回的是 Promise，并正确使用 await
                await this.getLogList();
            } finally {
                this.loadingSearch = false;
            }
            // document.activeElement.blur(); // 如果需要，可以解除注释
        }
    },
    created() {
        this.getLogList()
    }
}
</script>

<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>