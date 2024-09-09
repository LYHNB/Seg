<template>
    <div>
        <el-container>
            <el-aside :width="sideWidth + 'px'">
                <sidebar :isCollapse="isCollapse"></sidebar>
            </el-aside>


            <el-container style="height: 100%;">
                <el-header style="height: 50px;">
                    <navbar @doCollapse="doCollapse"></navbar>
                </el-header>

                <el-main style="height: 100%;">
                    <app-main></app-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import { Navbar, Sidebar, AppMain } from '.';

export default {
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    data() {
        return {
            //导航栏默认不折叠
            isCollapse: false,
            //默认宽度为180
            sideWidth: 180
        }
    },
    methods: {
        doCollapse() {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.sideWidth = 64;
            } else {
                this.sideWidth = 180;
            }
        }
    }
}
</script>

<style>
.el-header {
    background-color: #EEF1F6;
    color: #333;
    transition: all 250ms;
}

.el-aside {
    transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -moz-transition: width 0.25s;
    -o-transition: width 0.25s;
}
</style>