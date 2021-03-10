<template>
  <div class="row">
    <div class="col-12">
      <canvas width="300" height="300" ref="canvas" />
      <b-button @click="toggleUniform">Toggle Stroke Uniform</b-button>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  data() {
    return {
      canvas: null
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: "#D81B60",
      width: 50,
      height: 50,
      strokeWidth: 2,
      stroke: "#880E4F",
      rx: 10,
      ry: 10,
      angle: 45,
      scaleX: 3,
      scaleY: 3,
      hasControls: true
    });

    this.canvas.add(rect);

    var circle1 = new fabric.Circle({
      radius: 65,
      fill: "#039BE5",
      left: 0,
      stroke: "red",
      strokeWidth: 3
    });

    var circle2 = new fabric.Circle({
      radius: 65,
      fill: "#4FC3F7",
      left: 110,
      opacity: 0.7,
      stroke: "blue",
      strokeWidth: 3,
      strokeUniform: true
    });

    this.canvas.add(circle1);
    this.canvas.add(circle2);
  },
  methods: {
    toggleUniform() {
      const aObject = this.canvas.getActiveObject();
      if (!aObject) {
        alert("Select the red square first!");
      }

      if (aObject.type === "activeSelection") {
        aObject.getObjects().forEach(function(obj) {
          obj.set("strokeUniform", !obj.strokeUniform);
        });
      } else {
        aObject.set("strokeUniform", !aObject.strokeUniform);
      }
      this.canvas.requestRenderAll();
    }
  }
};
</script>
