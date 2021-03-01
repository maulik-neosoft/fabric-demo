<template>
  <div id="app">
    <canvas ref="can" class="fabric-canvas"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";

console.log("fabric : ", fabric);

export default {
  mounted() {
    const ref = this.$refs.can;
    const canvas = new fabric.Canvas(ref);
    const rect = new fabric.Rect({
      fill: "red",
      width: 50,
      height: 50
    });
    canvas.add(rect);
  }
};
</script>

<style>
.fabric-canvas {
  width: 100% !important;
  height: 100% !important;
}

.canvas-container {
  background-color: #808080;
}
</style>
