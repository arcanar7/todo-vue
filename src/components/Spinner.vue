<template>
  <div class="lds-ring" :class="primary">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: { primary: String },
}
</script>

<style lang="scss">
.lds-ring {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  div {
    position: absolute;
    box-sizing: border-box;
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid $primary-lightness;
    border-color: $primary-lightness transparent transparent transparent;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
}

.primary {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  width: 50px;
  height: 50px;

  div {
    width: 50px;
    height: 50px;
    border: 4px solid $primary-lightness;
    border-color: $primary transparent transparent transparent;
  }
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
