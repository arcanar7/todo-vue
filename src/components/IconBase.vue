<template functional>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    :viewBox="props.viewBox"
    :aria-labelledby="props.iconName"
    role="img"
  >
    <title v-if="props.iconName" :id="props.iconName" lang="en">{{ props.iconName }} icon</title>
    <g :fill="props.iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
    viewBox: {
      type: String,
      default: '0 0 512 512',
    },
  },
};
</script>
