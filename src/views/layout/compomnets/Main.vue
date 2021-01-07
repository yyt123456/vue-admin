<template>
  <div class="main">
    <div class="main-content">
      <div class="content">
        <!--<router-view></router-view>-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
    padding-left: $navMenu + 20;
    padding-top: $headerMenu + 20;
    padding-right: 20px;
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
      padding-left: $navMenu - ($navMenu - $navMinWidth - 20);
    }
  }
}
.layout.close {
  .main {
    .main-content {
      padding-left: $navMenu + 20;
    }
  }
}
</style>
