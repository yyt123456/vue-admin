<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogTableVisible"
    width="680px"
    @opened="getCategory"
  >
    <el-form :model="form" ref="formAdd">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input
          v-model="form.truename"
          autocomplete="off"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          v-model="form.password"
          autocomplete="off"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
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
      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-radio v-model="form.status" label="1">禁用</el-radio>
        <el-radio v-model="form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
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
import { GetRole, AddUser } from "../../../api/user";
import sha1 from "js-sha1";
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

  setup(props, { root }) {
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
      role: []
    });
    const show = () => {
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
      if (
        !form.username ||
        !form.truename ||
        !form.password ||
        !form.phone ||
        !form.region ||
        !form.status ||
        form.role.length === 0
      ) {
        root.$message({
          type: "warning",
          message: "请完善信息"
        });
        return;
      }
      let data = {
        username: form.username,
        truename: form.truename,
        password: form.password,
        phone: form.phone,
        region: form.region,
        status: form.status,
        role: form.role
      };
      let requestData = JSON.parse(JSON.stringify(data));
      requestData.role = requestData.role.join();
      requestData.password = sha1(requestData.password);
      requestData.region = JSON.stringify(requestData.region);
      setClear();
      AddUser(data)
        .then(res => {
          root.$message({ type: "success", message: res.data.message });
          setClear();
          dialogTableVisible.value = !dialogTableVisible.value;
        })
        .catch(() => {
          setClear();
        });
    };
    const getRole = () => {
      GetRole({}).then(res => {
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
