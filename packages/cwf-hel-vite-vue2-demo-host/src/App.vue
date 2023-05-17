<script setup lang="ts">
import RemoteComps from "cwf-hel-vite-vue2-demo-remote";
import HelloWorld from "./components/HelloWorld.vue";

const { HelloWorld: RemoteHelloWorld } = RemoteComps;

console.log("RemoteHelloWorld", RemoteHelloWorld);
</script>

<template>
  <div>
    <HelloWorld msg="Vue2 Host HelloWorld" />
    <RemoteHelloWorld msg="Vue2 Remote HelloWorld"></RemoteHelloWorld>
  </div>
</template>

<style scoped></style>
