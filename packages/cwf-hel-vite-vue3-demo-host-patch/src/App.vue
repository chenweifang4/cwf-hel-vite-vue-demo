<script setup lang="ts">
import RemoteComps from "cwf-hel-vite-vue3-demo-remote";
import HelloWorld from "./components/HelloWorld.vue";

const { HelloWorld: RemoteHelloWorld } = RemoteComps;
</script>

<template>
  <HelloWorld msg="Vue3 Host HelloWorld" />

  <RemoteHelloWorld msg="Vue3 Remote HelloWorld"></RemoteHelloWorld>
</template>

<style scoped></style>
