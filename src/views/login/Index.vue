<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="item.current ? 'current' : ''"
          v-for="(item, i) in menuTab"
          :key="i"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
    </div>

    <!--表单-->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="login-form"
      size="medium"
    >
      <el-form-item prop="username" class="input-form">
        <label>邮箱</label>
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="input-form">
        <label>密码</label>
        <el-input
          type="password"
          v-model="ruleForm.password"
          minlength="6"
          maxlength="20"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" class="input-form">
        <label>验证码</label>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input
              v-model.number="ruleForm.code"
              minlength="6"
              maxlength="6"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="success" class="block">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitForm('ruleForm')" class="block"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      // eslint-diable
      var reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式错误!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    toggleMenu(item) {
      this.menuTab.forEach(j => {
        j.current = false;
      });
      item.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  color: #fff;
  display: block;
  width: 350px;
  margin: auto;
}
.input-form {
  margin-bottom: 23px;
}
.block {
  width: 100%;
  display: block;
}
</style>
