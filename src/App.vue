<template>
  <div id="app">
    <MessageDisplay />
  </div>
</template>

<script>
import MessageDisplay from "./components/Messages.vue";
import client from "./tmiclient.js";

export default {
  name: "App",
  components: {
    MessageDisplay,
  },
  mounted() {
    client.connect();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
