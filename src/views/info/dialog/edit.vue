<template>
  <el-dialog
    title="修改"
    :visible.sync="dialogTableVisible"
    width="580px"
    @opened="getCategory"
  >
    <el-form :model="form" ref="form">
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择分类">
          <el-option
            v-for="item in options.category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth">
        <el-input
          v-model="form.content"
          autocomplete="off"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import { EditInfo } from "../../../api/news";
export default {
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
    const form = reactive({
      category: "",
      title: "",
      content: "",
      imgUrl: "",
      createDate: "",
      status: ""
    });
    const show = data => {
      console.log(data);
      dialogTableVisible.value = !dialogTableVisible.value;
      form.category = data.categoryId;
      form.title = data.title;
      form.content = data.content;
      form.imgUrl = data.imgUrl;
      form.createDate = data.createDate;
      form.id = data.id;
    };
    const getCategory = () => {
      console.log(props);
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
      let data = {
        categoryId: form.category,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl,
        createDate: form.createDate,
        id: form.id
      };
      EditInfo(data)
        .then(res => {
          parent.getList();
          setClear();
          root.$message({ type: "success", message: res.data.message });
          dialogTableVisible.value = !dialogTableVisible.value;
        })
        .catch(() => {
          setClear();
        });
    };
    onMounted(() => {});
    return {
      formLabelWidth,
      dialogTableVisible,
      options,
      form,
      getCategory,
      show,
      submit,
      close
    };
  }
};
</script>
<style lang="scss" scoped></style>
