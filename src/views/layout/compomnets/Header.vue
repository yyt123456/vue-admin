<template>
  <div class="header">头部</div>
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
  height: 75px;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
</style>
