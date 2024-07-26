<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
</style>

<script>
export default {
  name: 'App'
}
</script>
