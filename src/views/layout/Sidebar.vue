<template>
    <el-menu background-color="#324157" text-color="#BFCBD9" active-text-color="#20a0ff" :collapse="isCollapse"
        :collapse-transition="false" style="height: 100vh;">
        <router-link to="/uploads" class="r-l">
            <el-menu-item index="1">
                <i class="el-icon-s-promotion" style="margin-right: 8px;"></i>
                <span slot="title">文档上传</span>
            </el-menu-item>
        </router-link>
        <router-link to="/employeeList" class="r-l">
            <el-menu-item index="2">
                <i class="el-icon-user-solid" style="margin-right: 8px;"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </router-link>
        <router-link to="/log" class="r-l">
            <el-menu-item index="3">
                <i class="el-icon-notebook-2" style="margin-right: 8px;"></i>
                <span slot="title">操作日志</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        isCollapse: Boolean
    },
}
</script>

<style>
.el-menu {
    border-right: 0px !important;
    width: 180px;
    min-height: 100%;
    transition: all 10ms;
    overflow-x: hidden
}


a {
    text-decoration: none;
    color: #fff;
}

.r-l {
    display: block;

}
</style>