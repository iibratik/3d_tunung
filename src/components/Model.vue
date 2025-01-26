<template>
  <primitive :object="model" />
</template>

<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene: model } = await useGLTF("/models/bmwm4/scene.gltf");
</script>

<style scoped>
</style>