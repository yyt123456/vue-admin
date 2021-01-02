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
        <Picker @listDatas="getListData"></Picker>
      </el-form-item>
      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
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
    let listData = reactive({
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    });
    const options = reactive({
      category: []
    });
    const form = reactive({
      category: "",
      title: "",
      content: "",
      imgUrl: "",
      createDate: "",
      status: ""
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
    };
    const close = () => {
      dialogTableVisible.value = !dialogTableVisible.value;
      setClear();
    };
    const submit = () => {
      console.log(listData);
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
    const getListData = val => {
      listData = val;
    };
    onMounted(() => {});
    return {
      formLabelWidth,
      dialogTableVisible,
      options,
      form,
      listData,
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
