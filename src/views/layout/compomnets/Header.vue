<template>
  <div class="header">
    <div class="pull-left header-icon">
      <div @click="changeCollapse">
        <svg-icon icon-class="menu" class-name="menu"></svg-icon>
      </div>
    </div>
    <div class="pull-right">
      <div class="pull-left">
        <div>
          <img
            src="../../../assets/logo.png"
            alt=""
            width="30"
            class="user-icon"
          />
        </div>
      </div>
      <div class="user pull-right">管理员</div>
      <div class="pull-right">
        <div><svg-icon icon-class="exit" class-name="exit"></svg-icon></div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    const changeCollapse = () => {
      console.log(1);
      root.$store.commit("SET_COLLAPSE");
    };
    onMounted(() => {});
    return {
      changeCollapse
    };
  }
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
  }
  svg {
    font-size: 25px;
    cursor: pointer;
    margin-bottom: -6px;
  }
  .user {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
  }
  .user-icon {
    line-height: $headerMenu;
    box-sizing: border-box;
    margin-bottom: -6px;
    margin-right: 10px;
  }
}
</style>
