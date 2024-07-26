<template>
    <div>
        <el-container>
            <el-header>
                <div style="position: absolute; right: 10px; display: flex; align-items: center;">
                    <span style="font-size: 15px;">{{ name }}</span>
                    <el-dropdown style="margin: 10px;" @command="commandHandler">
                        <i class="el-icon-setting"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div style="flex-grow: 1; text-align: center;font-family: 华文楷体; font-size: 30px;">
                    文档分割
                </div>
            </el-header>

            <el-container style="height: 100%;">
                <el-aside width="200px">
                    <el-menu>
                        <el-menu-item index="1">
                            <router-link to="/test" class="r-l">
                                <i class="el-icon-menu" style="margin-right: 8px;"></i>
                                测试
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link to="/employeeList" class="r-l">
                                <i class="el-icon-menu" style="margin-right: 8px;"></i>
                                用户管理
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right"
                        v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
                        欢迎使用文档分割
                    </div>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { Message } from 'element-ui';

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
        }
    }
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.el-aside {
    color: #333;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: #333;
}

.router-link-active {
    text-decoration: none;
}

.r-l {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: 华文楷体;
    color: #409eff;
    padding-top: 50px;
}
</style>
<!-- <template>
    <div>
        <el-container>
            <el-header>
                <div style="position: absolute; right: 10px; display: flex; align-items: center;">
                    <span style="font-size: 15px;">{{ name }}</span>
                    <el-dropdown style="margin: 10px;" @command="commandHandler">
                        <i class="el-icon-setting"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div style="flex-grow: 1; text-align: center; font-family: 华文楷体; font-size: 30px;">
                    文档分割
                </div>
            </el-header>

            <el-container style="height: 100%;">
                <el-aside width="200px">
                    <el-menu>
                        <el-menu-item index="1" @click="handleMenuClick('/test')">
                            <router-link to="/test" class="r-l">
                                <i class="el-icon-menu" style="margin-right: 8px;"></i>
                                测试
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2" @click="handleMenuClick('/employeeList')">
                            <router-link to="/employeeList" class="r-l">
                                <i class="el-icon-menu" style="margin-right: 8px;"></i>
                                用户管理
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right"
                        v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
                        欢迎使用文档分割
                    </div>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { Message } from 'element-ui';

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
                });
                localStorage.clear();
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);
            }
        },
        handleMenuClick(path) {
            if (this.$route.path === path) {
                this.$router.go(0);
            }
        }
    }
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.el-aside {
    color: #333;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: #333;
}

.router-link-active {
    text-decoration: none;
}

.r-l {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: 华文楷体;
    color: #409eff;
    padding-top: 50px;
}
</style>
 -->