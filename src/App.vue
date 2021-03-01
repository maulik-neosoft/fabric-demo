<template>
  <div id="app">
    <canvas ref="can" class="fabric-canvas"></canvas>
    <input v-model="text" style="margin-top: 10px;" /><button @click="addText">Add Text</button>
  </div>
</template>

<script>
import { fabric } from "fabric";

console.log("fabric : ", fabric);

export default {
  data() {
    return {
      text: null,
      canvas: null
    };
  },
  mounted() {
    const ref = this.$refs.can;
    this.canvas = new fabric.Canvas(ref);
    const rect = new fabric.Rect({
      fill: "red",
      width: 50,
      height: 50
    });
    this.canvas.add(rect);
  },
  methods: {
    addText() {
      const _text = new fabric.IText(this.text, {
        fontFamily: "arial black",
        fontSize: 10
      });

      // const text = new fabric.Text(this.text, {
      //   fill: "black"
      // });

      this.canvas.add(_text);
      this.$forceUpdate();
    }
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
