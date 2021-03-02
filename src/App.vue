<template>
  <div id="app">
    <canvas ref="can" class="fabric-canvas"></canvas>
    <input v-model="text" style="margin-top: 10px;" /><button @click="addText">Add Text</button>
    <button @click="handleDownload">Download</button>
  </div>
</template>

<script>
import { fabric } from "fabric";

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

    // fabric.Image.fromURL("http://fabricjs.com/assets/pug_small.jpg", (myImg) => {
    //   const img1 = myImg.set({ left: 0, top: 0, width: 150, height: 150 });
    //   this.canvas.add(img1);
    // });
  },
  methods: {
    addText() {
      const _text = new fabric.IText(this.text, {
        fontFamily: "arial black",
        fontSize: 18
      });

      // const text = new fabric.Text(this.text, {
      //   fill: "black"
      // });

      this.canvas.add(_text);
      this.$forceUpdate();
    },
    handleDownload() {
      const link = document.createElement("A");
      link.setAttribute("download", "image.png");
      link.setAttribute("href", this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
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
