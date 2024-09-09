<template>
  <body id="poster">
    <el-form
      class="login-container"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
    >
      <div>
        <h3 class="login_title">系统登陆</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          :type="passwordType"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="密码"
          @keyup.enter.native="Login()"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; background: #505458; border: none"
          v-on:click="Login()"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: "Login",
  data() {
    //对用户名进行校验
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      } else if (value.length < 3) {
        callback(new Error("用户名不能少于 3 个字符"));
      } else if (value.length > 10) {
        callback(new Error("用户名不能多于 10 个字符"));
      } else {
        callback();
      }
    };
    //对密码进行校验
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3) {
        callback(new Error("密码不能少于 4 个字符"));
      } else if (value.length > 10) {
        callback(new Error("密码不能多于 20 个字符"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    Login() {
      //验证表单中的账号密码是否有效,因为required:true
      this.$refs.loginForm.validate((valid) => {
        //点击登录后，展示加载画面
        this.loading = true;
        //如果经过校验，账号密码都不为空，则发送请求到后端登录接口
        if (valid) {
          this.$api.employee
            .login(this.loginForm)
            .then((resp) => {
              console.dir(resp);
              let data = resp.data;
              if (data.code) {
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("name", data.data.name);
                this.loginForm = {};
                //跳转后不可返回
                //this.$router.replace('/home');
                this.$router.push({ path: this.redirect || "/home" });
                this.$message({
                  message: "登陆成功！",
                  type: "success",
                });
              }
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              console.error("Caught an error:", error.message); //捕捉response拦截器返回的错误
            });
        }
        //如果账号或密码有一个没填，就直接提示必填，不向后端请求
        else {
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    font-size: 17px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    font-size: 17px;
  }
}
</style>

<style lang="scss" scoped>
#poster {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 10px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}

.login_title {
  font-size: 26px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>