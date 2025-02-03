

<template>
  <section class="scene">
    <div class="scene-change-buttons">
      <div class="scene-change-button">
        <label for="bodyColor">Цвет кузова</label>
        <input id="bodyColor" type="color" v-model="bodyColor" />
      </div>
      <div class="scene-change-button">
        <label for="windowColor">Цвет тонировки</label>
        <input type="color" v-model="windowColor" />
      </div>
    </div>
    <TresCanvas window-size v-bind="globalSettings" clear-color="#4f4f4f">
      <TresPerspectiveCamera :position="[5, 5, 5]" />
      <OrbitControls />
      <Suspense>
        <Model :bodyColor="bodyColor" :windowColor="windowColor" />
      </Suspense>
      <TresDirectionalLight color="red" :position="[3, 3, 3]" :intensity="1" />
      <TresAmbientLight :intensity="2" />
      <TresGridHelper />
    </TresCanvas>
  </section>
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
      bodyColor: "#ffea00",
      windowColor: "#222222FF",
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
  methods: {},
});
</script>
