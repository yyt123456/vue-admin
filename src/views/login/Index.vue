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
          type="text"
          v-model="ruleForm.password"
          minlength="6"
          maxlength="20"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="passwords"
        class="input-form"
        v-if="model === 'register'"
      >
        <label>重复密码</label>
        <el-input
          type="text"
          v-model="ruleForm.passwords"
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
              type="text"
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
import {
  stripscript,
  validateMail,
  validatePasswordJs,
  validateCodeJs
} from "../../utils/validate";
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (!validateCodeJs(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateMail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePasswordJs(value)) {
        callback(new Error("密码为6至20为数字+字母!"));
      } else {
        callback();
      }
    };
    var validatePasswords = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (!validatePasswordJs(value)) {
        callback(new Error("密码格式错误!"));
      } else if (this.ruleForm.password !== value) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      model: "register",
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
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
      this.model = item.type;
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
