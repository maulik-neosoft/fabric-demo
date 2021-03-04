/* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <div style="display: none">
      <canvas ref="can" class="fabric-canvas"></canvas>
      <input v-model="text" style="margin-top: 10px;" /><button
        @click="addText"
      >
        Add Text
      </button>
      <button @click="handleDownload">Download</button>
    </div>

    <!-- SVG Image -->
    <div>
      <svg id="svg" width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <ellipse
            stroke-width="7"
            ry="79"
            rx="79.5"
            id="svg_1"
            cy="175"
            cx="400"
            :opacity="controls.opacity"
            :stroke="controls.strokeColor"
            :fill="controls.fillColor"
          />
          <rect
            id="svg_2"
            height="181"
            width="242"
            y="295"
            x="279"
            :opacity="controls.opacity"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-dasharray="null"
            stroke-width="7"
            :stroke="controls.strokeColor"
            :fill="controls.fillColor"
          />
        </g>
      </svg>
    </div>

    <!-- Controls -->
    <div>
      <!-- <input v-model="controls." type="number" step="1" min="1" /> -->
      <!-- <input v-model="controls.color" type="color" /> -->
      <label>Stroke Color&nbsp;&nbsp;&nbsp;</label>
      <input v-model="controls.strokeColor" type="color" />
      <br /><br />
      <label>Fill Color&nbsp;&nbsp;&nbsp;</label>
      <input v-model="controls.fillColor" type="color" />
      <br /><br />
      <label>Opacity&nbsp;&nbsp;&nbsp;</label>
      <input
        v-model="controls.opacity"
        type="number"
        step="0.1"
        max="1"
        min="0"
      />
      <br /><br />
      <button @click="downloadSVG">Download SVG</button>
    </div>
  </div>
</template>

<script scoped>
import { fabric } from "fabric";

export default {
  data() {
    return {
      text: null,
      canvas: null,
      controls: {
        // color: "#000",
        strokeColor: "#000",
        fillColor: "#fff",
        opacity: 1
      }
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
    const image = "@/assets/custsock.svg";

    console.log("IMAGE : ", image);

    fabric.loadSVGFromString(image, (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.set({
        left: 50,
        top: 50,
        scaleX: 4,
        scaleY: 4
      });

      this.canvas.add(obj).renderAll();
    });
  },
  methods: {
    addText() {
      const _text = new fabric.IText(this.text, {
        fontFamily: "arial black",
        fontSize: 18
      });

      this.canvas.add(_text);
      this.$forceUpdate();
    },
    handleDownload() {
      const link = document.createElement("A");
      link.setAttribute("download", "image.png");
      link.setAttribute(
        "href",
        this.canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    },
    downloadSVG() {
      //get svg element.
      const svg = document.getElementById("svg");

      //get svg source.
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);

      //add name spaces.
      if (
        // eslint-disable-next-line no-useless-escape
        !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
      ) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"'
        );
      }
      // eslint-disable-next-line no-useless-escape
      if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
        );
      }

      //add xml declaration
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

      //convert svg source to URI data scheme.
      var url =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

      const link = document.createElement("A");
      link.setAttribute("download", "image.svg");
      link.setAttribute("href", url);
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
