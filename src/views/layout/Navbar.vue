<template>
    <div style="display: flex; line-height: 50px;">
        <div>
            <i class="el-icon-s-fold" style="font-size: 20px;" @click="collapse"></i>
        </div>

        <div style="flex: 1; text-align: center;font-family: 华文楷体; font-size: 30px;">
            <span>文档分割</span>
        </div>
        <el-dropdown @command="commandHandler" trigger="click">
            <div>
                <span style="font-size: 15px;">{{ name }}</span>
                <i class="el-icon-caret-bottom" style="margin-left: 5px;"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item command="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    computed: {
        name() {
            return localStorage.getItem('name');
        }
    },
    methods: {
        commandHandler(command) {
            if (command == 'logout') {
                this.$message({
                    message: '退出成功',
                    type: 'success'
                })
                localStorage.clear();
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000)
            }
        },
        collapse() {
            this.$emit('doCollapse')
        }
    }
}
</script>

<style></style>