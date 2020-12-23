<template>
  <div class="layout">
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script>
import LayoutMain from "./compomnets/Main";
import LayoutNav from "./compomnets/Nav";
import LayoutHeader from "./compomnets/Header";
export default {
  components: {
    LayoutMain,
    LayoutNav,
    LayoutHeader
  },
  setup(props, context) {
    let root = context.root;
    let ref = context.ref;
    console.log(root, ref);
  }
};
</script>
<style lang="scss" scoped>
    .layout {
        background-color: #f7f7f7;
    }
</style>
