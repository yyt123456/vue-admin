<template>
  <div class="header">
    <div class="pull-left header-icon">
      <svg-icon icon-class="menu" class-name="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="pull-left">
        <img
          src="../../../assets/logo.png"
          alt=""
          width="30"
          class="user-icon"
        />
      </div>
      <div class="user pull-left">管理员</div>
      <div class="header-icon pull-left">
        <svg-icon icon-class="exit" class-name="exit"></svg-icon>
      </div>
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
.header {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: $headerMenu;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  line-height: $headerMenu;
  .header-icon {
    padding: 0 32px;
    vertical-align: middle;
  }
  svg {
    font-size: 25px;
    cursor: pointer;
    margin-bottom: -6px;
  }
  .user {
    height: 100%;
    padding: 0 15px;
    border-right: 1px solid #ededed;
  }
  .user-icon {
    margin-top: 20px;
  }
}
</style>
