<template>
  <div>
    <canvas
      id="canvas"
      width="500"
      height="500"
      style="border:1px solid #aaa"
    ></canvas>
    <div style="display: inline-block; margin-left: 10px">
      <button
        @click="switchDrawingMode"
        ref="drawing-mode"
        id="drawing-mode"
        class="btn btn-info"
      >
        Cancel drawing mode</button
      ><br />
      <button
        @click="clearCanvas"
        ref="clear-canvas"
        id="clear-canvas"
        class="btn btn-info"
      >
        Clear</button
      ><br />
    </div>
  </div>
</template>
<script>
import { fabric } from "fabric";

export default {
  data() {
    return {
      canvas: null,
      drawingModeEl: null,
      drawingOptionsEl: null,
      drawingColorEl: null,
      drawingShadowColorEl: null,
      drawingLineWidthEl: null,
      drawingShadowWidth: null,
      drawingShadowOffset: null,
      clearEl: null
    };
  },
  methods: {
    clearCanvas() {
      this.canvas.clear();
    },
    switchDrawingMode() {
      this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
      if (this.canvas.isDrawingMode) {
        this.drawingModeEl.innerHTML = "Cancel drawing mode";
      } else {
        this.drawingModeEl.innerHTML = "Enter drawing mode";
      }
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas("canvas", {
      isDrawingMode: true
    });

    this.drawingModeEl = this.$refs["drawing-mode"];
    this.drawingOptionsEl = this.$refs["drawing-mode-options"];
    this.drawingColorEl = this.$refs["drawing-color"];
    this.drawingShadowColorEl = this.$refs["drawing-shadow-color"];
    this.drawingLineWidthEl = this.$refs["drawing-line-width"];
    this.drawingShadowWidth = this.$refs["drawing-shadow-width"];
    this.drawingShadowOffset = this.$refs["drawing-shadow-offset"];
    this.clearEl = this.$refs["clear-canvas"];
  }
};
</script>
