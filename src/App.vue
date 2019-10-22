<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Roboto', sans-serif;
}

a {
  text-decoration: none;
  outline: none;
}

button {
  width: 195px;
  text-transform: uppercase;
  font-weight: 900;
  color: $primary-lightness;
  background-color: $primary;
  border: none;
  box-shadow: 3px 3px 3px hsla(0, 0, 0, 0.5);
  cursor: pointer;
  transition: background-color 0.3s linear;
}

button:active {
  box-shadow: 1px 1px 3px hsla(0, 0, 0, 0.5);
}

button:hover {
  background-color: $primary-light;
}

input {
  width: 180px;
  padding-left: 10px;
}

button,
input {
  height: 40px;
  font-size: 18px;
  border-radius: 5px;
  outline: none !important;
}
</style>
