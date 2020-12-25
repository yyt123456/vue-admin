<template>
  <div class="nav">
    <div class="nav-icon">
      <img src="../../../assets/logo.png" alt="" width="50" />
    </div>
    <el-menu
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
import { onMounted, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    console.log(root);
    //折叠状态
    // const isCollapse = ref(false);
    //路由
    const routes = reactive(root.$router.options.routes);

    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    onMounted(() => {});
    return {
      isCollapse,
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
