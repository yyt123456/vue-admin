<template>
  <div class="nav">
    <div class="nav-icon">
      <img src="../../../assets/logo.png" alt="" width="50" />
    </div>
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(i, k) in routes">
        <el-submenu :key="k" :index="k.toString()" v-if="!i.hidden">
          <!--一级菜单-->
          <template slot="title">
            <svg-icon
              :iconClass="i.meta.icon"
              :className="i.meta.icon"
            ></svg-icon>
            <span slot="title">{{ i.meta.name }}</span>
          </template>
          <!--子菜单-->
          <el-menu-item
            :index="sub.path"
            v-for="(sub, subKey) in i.children"
            :key="subKey"
            >{{ sub.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, onMounted, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    console.log(root);
    const isCollapse = ref(false);
    const routes = reactive(root.$router.options.routes);
    console.log(routes, "routes");
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    onMounted(() => {});
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routes
    };
  }
};
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: $themeColor;
  svg {
    margin-right: 10px;
  }
  .nav-icon {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
