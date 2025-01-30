<template>
  <primitive :object="model" />
</template>

<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { MeshStandardMaterial } from "three";
import { defineProps, watch, onMounted } from "vue";

// Определяем пропс для передачи цвета
const props = defineProps<{
  changeColor: string; // Цвет в формате HEX
}>();

// Загрузка модели
const { scene: model, materials } = await useGLTF("/models/bmwm4/scene.gltf");

// Функция для извлечения RGB из HEX и обновления материала
const updateColorAndMaterial = (hexColor: string) => {
  // Убираем # в начале, если он есть
  hexColor = hexColor.replace("#", "");

  // Преобразуем строку HEX в RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Применяем новый цвет к материалу
  const material = materials.Paint_Material as MeshStandardMaterial;
  material.color.setRGB(r / 255, g / 255, b / 255); // Нормализуем значения от 0 до 1

  // Обновляем значения компонентов RGB в модели данных (если нужно использовать их отдельно)
  return { r, g, b };
};

// Отслеживаем изменение пропса changeColor и обновляем материал
watch(
  () => props.changeColor, // отслеживаем пропс
  (newColor) => {
    updateColorAndMaterial(newColor);
  },
  { immediate: true } // сразу вызываем функцию при монтировании
);

// Инициализация материала с начальным значением при монтировании
onMounted(() => {
  updateColorAndMaterial(props.changeColor);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
