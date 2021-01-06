<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogTableVisible"
    width="680px"
    @opened="getCategory"
  >
    <el-form :model="form" ref="formAdd" :rules="rules">
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="truename">
        <el-input
          v-model="form.truename"
          autocomplete="off"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="form.password"
          autocomplete="off"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input
          v-model="form.phone"
          autocomplete="off"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="地区" :label-width="formLabelWidth">
        <Picker
          @listDatas="getListData"
          :propsData="propsData"
          :level="['province', 'city', 'area', 'street']"
        ></Picker>
      </el-form-item>
      <el-form-item
        label="是否启用"
        :label-width="formLabelWidth"
        prop="status"
      >
        <el-radio v-model="form.status" label="1">禁用</el-radio>
        <el-radio v-model="form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="系统" :label-width="formLabelWidth" prop="role">
        <el-checkbox-group v-model="form.role" size="mini">
          <el-checkbox
            v-for="item in roleUser.list"
            :label="item.role"
            :key="item.role"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Picker from "../../../components/picker";
import { ref, reactive, onMounted } from "@vue/composition-api";
import { GetSys, AddUser, EditUser } from "../../../api/user";
import sha1 from "js-sha1";
import {
  stripscript,
  validateMail,
  validatePasswordJs
} from "../../../utils/validate";
export default {
  components: {
    Picker
  },
  props: {
    categoryList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  setup(props, { root, refs, emit }) {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateMail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    var validateTrueName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value) {
        form.password = stripscript(value);
        value = form.password;
      }
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePasswordJs(value)) {
        callback(new Error("密码为6至20为数字+字母!"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      truename: [{ validator: validateTrueName, trigger: "blur" }],
      role: [{ required: true, trigger: "blur", message: "请选择系统" }],
      password: [{ validator: validatePassword, trigger: "blur" }]
    });
    const formLabelWidth = ref("70px");
    let dialogTableVisible = ref(false);
    let propsData = reactive({
      provinceValue: "",
      cityValue: "",
      areaValue: "",
      streetValue: ""
    });
    const options = reactive({
      category: []
    });
    const roleUser = reactive({
      list: []
    });
    let form = reactive({
      username: "",
      truename: "",
      password: "",
      phone: "",
      region: "",
      status: "",
      id: "",
      role: []
    });
    const show = data => {
      if (data) {
        form.username = data.username;
        form.truename = data.truename;
        form.password = data.password;
        form.phone = data.phone;
        form.region = data.region;
        form.status = data.status;
        form.id = data.id;
        form.role = data.role.split(",");
      } else {
        form.username = "";
        form.truename = "";
        form.password = "";
        form.phone = "";
        form.region = "";
        form.status = "";
        form.id = "";
        form.role = [];
      }
      console.log(form, "form");
      dialogTableVisible.value = !dialogTableVisible.value;
    };
    const getCategory = () => {
      options.category = props.categoryList;
    };
    const setClear = () => {
      root.$nextTick(() => {
        form.username = "";
        form.truename = "";
        form.password = "";
        form.phone = "";
        form.region = "";
        form.status = "";
        form.role = [];
        propsData.provinceValue = "";
        propsData.cityValue = "";
        propsData.areaValue = "";
        propsData.streetValue = "";
      });
    };
    const close = () => {
      dialogTableVisible.value = !dialogTableVisible.value;
      setClear();
    };
    const submit = () => {
      refs["formAdd"].validate(valid => {
        if (valid) {
          let data = {
            username: form.username,
            truename: form.truename,
            password: form.password,
            phone: form.phone,
            region: form.region,
            status: form.status,
            role: form.role,
            id: form.id
          };
          let requestData = JSON.parse(JSON.stringify(data));
          requestData.role = requestData.role.join();
          if (form.id) {
            requestData.password
              ? (requestData.password = sha1(requestData.password))
              : delete requestData.password;
            console.log(requestData);
            EditUser(requestData)
              .then(res => {
                root.$message({ type: "success", message: res.data.message });
                emit("refresh");
                dialogTableVisible.value = !dialogTableVisible.value;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            requestData.region = JSON.stringify(requestData.region);
            requestData.password = sha1(requestData.password);
            console.log(requestData);
            AddUser(requestData)
              .then(res => {
                root.$message({ type: "success", message: res.data.message });
                setClear();
                emit("refresh");
                dialogTableVisible.value = !dialogTableVisible.value;
              })
              .catch(() => {
                setClear();
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const getRole = () => {
      GetSys({}).then(res => {
        roleUser.list = res.data.data;
      });
    };
    const getListData = val => {
      form.region = val;
    };
    onMounted(() => {
      getRole();
    });
    return {
      formLabelWidth,
      dialogTableVisible,
      options,
      form,
      roleUser,
      propsData,
      rules,
      getCategory,
      show,
      submit,
      close,
      getListData
    };
  }
};
</script>
<style lang="scss" scoped></style>
