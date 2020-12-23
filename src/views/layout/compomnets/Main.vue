<template>
  <div class="main">
      <router-view></router-view>
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
.main {
  position: fixed;
  top: 75px;
  left: 250px;
  right: 0;
  bottom: 0;
  -webkit-box-sizing: border-box;
  border: 30px solid #f7f7f7;
    border-bottom: none;
}
</style>
