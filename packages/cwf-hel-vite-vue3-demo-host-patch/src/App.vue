<script setup lang="ts">
import RemoteComps from "cwf-hel-vite-vue3-demo-remote";
import HelloWorld from "./components/HelloWorld.vue";

const { HelloWorld: RemoteHelloWorld } = RemoteComps;
</script>

<template>
  <HelloWorld msg="Host HelloWorld.vue" />

  <RemoteHelloWorld msg="Remote HelloWorld.vue"></RemoteHelloWorld>
</template>

<style scoped></style>
