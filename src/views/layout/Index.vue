<template>
  <div :class="isCollapse ? 'layout open' : 'layout close'">
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script>
import LayoutMain from "./compomnets/Main";
import LayoutNav from "./compomnets/Nav";
import LayoutHeader from "./compomnets/Header";
import { onMounted, computed } from "@vue/composition-api";
export default {
  components: {
    LayoutMain,
    LayoutNav,
    LayoutHeader
  },
  setup(props, { root }) {
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    onMounted(() => {});
    return {
      isCollapse
    };
  }
};
</script>
<style lang="scss" scoped>
.layout {
  background-color: #f7f7f7;
}
</style>
