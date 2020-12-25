<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  props: {
    iconClass: {
      type: String
    },
    className: {
      type: String
    }
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 20px;
  /*svg特有属性*/
  fill: currentColor;
  /*color: #fff;*/
}
</style>
