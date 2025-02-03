<template>
  <primitive :object="model" />
</template>

<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { MeshStandardMaterial } from "three";
import { defineProps, watch, onMounted } from "vue";

// Определяем пропс для передачи цвета
const props = defineProps<{
  bodyColor: string;
  windowColor: string;
}>();

// Загрузка модели
const { scene: model, materials } = await useGLTF("/models/bmwm4/scene.gltf");
// Функция для извлечения RGB из HEX и обновления материала
materials.Window_Material.opacity = 120;

function updateWindowColor(hexColor: string) {
  // Убираем # в начале, если он есть
  hexColor = hexColor.replace("#", "");

  // Преобразуем строку HEX в RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Применяем новый цвет к материалу
  const materialColor = materials.Window_Material as MeshStandardMaterial;
  materialColor.color.setRGB(r / 255, g / 255, b / 255); // Нормализуем значения от 0 до 1

  // Обновляем значения компонентов RGB в модели данных (если нужно использовать их отдельно)
  return { r, g, b };
}
function updateColorAndMaterial(hexColor: string) {
  // Убираем # в начале, если он есть
  hexColor = hexColor.replace("#", "");

  // Преобразуем строку HEX в RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Применяем новый цвет к материалу
  const materialColor = materials.Paint_Material as MeshStandardMaterial;
  materialColor.color.setRGB(r / 255, g / 255, b / 255); // Нормализуем значения от 0 до 1

  // Обновляем значения компонентов RGB в модели данных (если нужно использовать их отдельно)
  return { r, g, b };
}
watch(
  () => props.bodyColor,
  (newColor) => {
    updateColorAndMaterial(newColor);
  },
  { immediate: true }
);

watch(
  () => props.windowColor,
  (newColor) => {
    updateWindowColor(newColor);
  },
  { immediate: true }
);

// Инициализация материала с начальным значением при монтировании
onMounted(() => {
  updateColorAndMaterial(props.bodyColor);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
