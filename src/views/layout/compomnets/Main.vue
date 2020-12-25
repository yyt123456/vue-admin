<template>
  <div class="main">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
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
.main {
  height: 100vh;
  .main-content {
    width: 100%;
    height: 100%;
    padding-left: $navMenu + 30;
    padding-top: $headerMenu + 30;
    padding-right: 30px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    @include webkit(transition, all 0.3s ease 0);
    .content {
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      background-color: #fff;
    }
  }
}
.layout.open {
  .main {
    .main-content {
      padding-left: $navMenu - 156;
    }
  }
}
.layout.close {
  .main {
    .main-content {
      padding-left: $navMenu + 30;
    }
  }
}
</style>
