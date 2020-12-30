<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="信息分类">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
            v-for="item in options.category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题" style="width: 500px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        缩略图
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="form.createDateStr"
          disabled=""
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="详情内容">
        <quillEditor
          v-model="form.content"
          ref="quillEditor"
          :options="editorOption"
        ></quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
import { quillEditor } from "vue-quill-editor";
import { EditInfo } from "../../api/news";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// https://www.npmjs.com/package/vue-quill-editor

export default {
  components: {
    quillEditor
  },
  setup(props, { root }) {
    const options = reactive({
      category: []
    });
    const editorOption = reactive({});
    const form = reactive({
      categoryId: root.$ls.get("detail").categoryId,
      title: root.$ls.get("detail").title,
      createDate: root.$ls.get("detail").createDate,
      createDateStr: root
        .$moment(new Date(root.$ls.get("detail").createDate * 1000))
        .format("YYYY-MM-DD hh:mm:ss"),
      content: root.$ls.get("detail").content,
      imgUrl: root.$ls.get("detail").imgUrl,
      id: root.$ls.get("detail").id
    });
    const getCategory = async () => {
      options.category = await root.$getCategoryAll();
    };
    const onSave = () => {
      let data = {
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl,
        createDate: form.createDate,
        id: form.id
      };
      EditInfo(data)
        .then(res => {
          root.$message({ type: "success", message: res.data.message });
          root.$ls.set("detail", form);
        })
        .catch(() => {});
    };
    onMounted(() => {
      console.log(root.$ls.get("detail"));
      getCategory();
    });
    return {
      form,
      editorOption,
      options,
      onSave
    };
  }
};
</script>
<style lang="scss" scoped></style>
