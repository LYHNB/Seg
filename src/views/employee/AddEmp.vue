<template>
    <el-dialog title="新增员工" :visible.sync="visible" width="500px" style="padding-bottom: 0;" center @close="handleClose"
        :close-on-click-modal="false" :show-close="false">
        <el-form :model="formAddEmp" ref="formAddEmp" :rules="addRules" label-width="100px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formAddEmp.name" ref="name" autocomplete="off" style="width: 280px;"
                    placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formAddEmp.username" ref="username" autocomplete="off" style="width: 280px;"
                    placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formAddEmp.password" ref="password" autocomplete="off" style="width: 280px;"
                    show-password placeholder="请输入密码"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="addEmp">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'AddEmp',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        visible(newVal) {
            if (!newVal) {
                this.resetForm();
            }
        }
    },
    data() {
        //对姓名进行校验
        const validateName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入姓名'))
            } else if (value.length < 3) {
                callback(new Error('姓名不能少于 3 个字符'));
            } else if (value.length > 10) {
                callback(new Error('姓名不能多于 10 个字符'));
            }
            else {
                callback()
            }
        }
        //对用户名进行校验
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户名'))
            } else if (value.length < 3) {
                callback(new Error('用户名不能少于 3 个字符'));
            } else if (value.length > 10) {
                callback(new Error('用户名不能多于 10 个字符'));
            }
            else {
                callback()
            }
        }
        //对密码进行校验
        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error(('请输入密码')))
            } else if (value.length < 3) {
                callback(new Error('密码不能少于 4 个字符'));
            } else if (value.length > 10) {
                callback(new Error('密码不能多于 20 个字符'));
            }
            else {
                callback()
            }
        }
        return {
            //新增员工表单
            formAddEmp: {
                name: '',
                username: '',
                password: ''
            },
            //新增规则
            addRules: {
                name: [{ required: true, trigger: 'blur', validator: validateName }],
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            //新增员工对话框是否可见
            formLabelWidth: '120px',
        }
    },
    methods: {
        handleCancel() {
            this.$emit('update:visible', false);
        },
        addEmp() {
            this.$refs.formAddEmp.validate((valid) => {
                //校验通过，发送请求
                if (valid) {
                    this.$api.admin.addEmp(this.formAddEmp).then(resp => {

                    })
                }
            })
            //this.$emit('update:visible', false);
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.resetForm();
        },
        resetForm() {
            this.$nextTick(() => {
                this.$refs.formAddEmp.resetFields();
            })
        }
    }
}
</script>

<style>
.el-dialog__wrapper .el-dialog {
    border: 1px solid #DCDFE6;
    box-shadow: 0 0 4px #e6e6e6;
    border-radius: 9px;
    padding: 0;
}
</style>
