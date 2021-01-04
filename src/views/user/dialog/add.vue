<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogTableVisible"
    width="680px"
    @opened="getCategory"
  >
    <el-form :model="form" ref="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地区" :label-width="formLabelWidth">
        <Picker
          @listDatas="getListData"
          :level="['province', 'city', 'area', 'street']"
        ></Picker>
      </el-form-item>
      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-radio v-model="form.roleStatus" label="1">禁用</el-radio>
        <el-radio v-model="form.roleStatus" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.roleUser" size="mini">
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
import { AddInfo } from "../../../api/news";
import { GetRole } from "../../../api/user";
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

  setup(props, { root, parent }) {
    const formLabelWidth = ref("70px");
    let dialogTableVisible = ref(false);
    const options = reactive({
      category: []
    });
    const roleUser = reactive({
      list: []
    });
    const form = reactive({
      category: "",
      title: "",
      content: "",
      imgUrl: "",
      createDate: "",
      status: "",
      roleStatus: "1",
      listData: {
        value1: "",
        value2: "",
        value3: "",
        value4: ""
      },
      roleUser: []
    });
    const show = () => {
      dialogTableVisible.value = !dialogTableVisible.value;
    };
    const getCategory = () => {
      options.category = props.categoryList;
    };
    const setClear = () => {
      form.category = "";
      form.title = "";
      form.content = "";
      form.imgUrl = "";
      form.createDate = "";
      form.status = "";
      // form.listData = {
      //     value1: "",
      //     value2: "",
      //     value3: "",
      //     value4: ""
      // };
    };
    const close = () => {
      dialogTableVisible.value = !dialogTableVisible.value;
      setClear();
    };
    const submit = () => {
      console.log(form.roleUser);
      let data = {
        categoryId: form.category,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl,
        createDate: form.createDate,
        status: form.status
      };
      AddInfo(data)
        .then(res => {
          parent.getList();
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
      form.listData = val;
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
