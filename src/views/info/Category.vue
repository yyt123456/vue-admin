<template>
  <div>
    <el-button type="danger">分类</el-button>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4><svg-icon icon-class="plus"></svg-icon>新闻</h4>
              <ul>
                <li>国内</li>
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
        <el-col :span="16"></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
  li, h4 {
    &:hover{
      @include webkit(transtion, all 0.3s ease 0);
      background-color: #f3f3f3;
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
}
</style>
