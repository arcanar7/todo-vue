<template functional>
  <span class="indicator">
    <span class="indicator__led" :class="[parent.isOnline ? 'online' : 'offline']"></span>
    {{ parent.isOnline ? 'Online' : 'Offline' }}
  </span>
</template>

<script>
export default {};
</script>

<style lang="scss">
.indicator {
  margin-top: 10px;
  color: $text-primary;
  text-align: end;

  &__led {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 50%;
  }
}

.online {
  background-color: $success;
  box-shadow: 0 0 12px $success;
}

.offline {
  background-color: $error;
  box-shadow: 0 0 12px $error;
}
</style>
