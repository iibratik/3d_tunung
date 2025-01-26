

<template>
  <TresCanvas  window-size v-bind="globalSettings" clear-color="#4f4f4f">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <Suspense>
      <Model />
    </Suspense>
    <TresDirectionalLight color="red" :position="[3, 3, 3]" :intensity="1" />
    <TresAmbientLight :intensity="2" />
    <TresGridHelper />
  </TresCanvas>
</template>

<script lang="ts">
import { OrbitControls, GLTFModel } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { defineComponent } from "vue";
import Model from "./Model.vue";

export default defineComponent({
  components: { OrbitControls, GLTFModel, TresCanvas, Model },
  data() {
    return {
      globalSettings: {
        clearColor: "gray",
        shadows: true,
        alpha: false,
        shadowMapType: BasicShadowMap,
        outputColorSpace: SRGBColorSpace,
        toneMapping: NoToneMapping,
      },
    };
  },
});
</script>
