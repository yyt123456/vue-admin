<template>
  <el-dialog title="新增" :visible.sync="dialogTableVisible" width="580px">
    <el-form :model="form">
      <el-form-item label="类别" :label-width="formLabelWidth">
        <el-select v-model="form.title" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth">
        <el-input
          v-model="form.gaikuang"
          autocomplete="off"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = !dialogTableVisible"
        >取 消</el-button
      >
      <el-button type="danger" @click="dialogTableVisible = !dialogTableVisible"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    console.log(root);
    const formLabelWidth = ref("70px");
    let dialogTableVisible = ref(false);
    const form = reactive({
      title: "",
      type: "",
      gaikuang: ""
    });
    const show = () => {
      dialogTableVisible.value = !dialogTableVisible.value;
    };
    onMounted(() => {});
    return {
      formLabelWidth,
      dialogTableVisible,
      form,
      show
    };
  }
};
</script>
<style lang="scss" scoped></style>
