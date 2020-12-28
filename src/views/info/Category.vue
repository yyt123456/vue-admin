<template>
  <div>
    <el-button type="danger" style="font-size: 14px">分类</el-button>
    <div style="width: 100%;height: 1px;background-color: #ccc;margin: 20px 0"></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                <span>新闻</span>
                <div class="button-group">
                  <el-button type="danger" size="mini">编辑</el-button>
                  <el-button type="success" size="mini">添加子集</el-button>
                  <el-button type="primary" size="mini">删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini">编辑</el-button>
                    <el-button type="primary" size="mini">删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4><svg-icon icon-class="plus"></svg-icon>新闻</h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <br>
          <el-form
            label-width="142px"
            :model="formLabelAlign"
            style="width: 410px"
          >
            <el-form-item label="一级分类名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  setup() {
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: ""
    });
    onMounted(() => {});
    return {
      formLabelAlign
    };
  }
};
</script>
<style lang="scss" scoped>
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
li,
h4 {
  &:hover {
    @include webkit(transtion, all 0.3s ease 0);
    background-color: #f3f3f3;
    .button-group {
      display: block;
    }
  }
}
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    width: 32px;
    border-left: 1px dashed #000;
    left: 22px;
    top: 0;
    bottom: 0;
  }
  svg {
    position: absolute;
    font-size: 14px;
    top: 15px;
    left: 0;
  }
  h4 {
    padding-left: 40px;
  }
  li {
    padding-left: 36px;
    margin-left: 24px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dashed #000;
      left: 0;
      top: 22px;
    }
  }
  .button-group {
    position: absolute;
    z-index: 2;
    right: 11px;
    top: 0;
    display: none;
    button {
      font-size: 12px;
    }
  }
}
</style>
