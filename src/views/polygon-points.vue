<template>
  <div class="row">
    <div class="col-12">
      <canvas ref="canvas" width="500" height="500" />
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  data() {
    return {
      canvas: null,
      startPoints: null,
      endPoints: null,
      polygon: null,
      even: true
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    this.startPoints = [
      { x: 0, y: 42 },
      { x: 155, y: 0 },
      { x: 155, y: 243 },
      { x: 0, y: 256 }
    ];

    this.endPoints = [
      { x: 185, y: 0 },
      { x: 250, y: 100 },
      { x: 385, y: 170 },
      { x: 0, y: 245 }
    ];

    const clonedStartPoints = this.startPoints.map(function(o) {
      return fabric.util.object.clone(o);
    });

    this.polygon = new fabric.Polygon(clonedStartPoints, {
      left: 0,
      top: 0,
      fill: "purple",
      selectable: false,
      objectCaching: false
    });
    this.canvas.add(this.polygon);

    this.animate();
  },
  methods: {
    animatePoint(i, prop, endPoints) {
      fabric.util.animate({
        startValue: this.polygon.points[i][prop],
        endValue: endPoints[i][prop],
        duration: 1000,
        onChange: value => {
          this.polygon.points[i][prop] = value;
          // only render once
          if (i === this.startPoints.length - 1 && prop === "y") {
            this.canvas.renderAll();
          }
        },
        onComplete: () => {
          this.polygon.setCoords();
          // only start animation once
          if (i === this.startPoints.length - 1 && prop === "y") {
            this.even = !this.even;
            this.animate();
          }
        }
      });
    },
    animate() {
      for (var i = 0, len = this.startPoints.length; i < len; i++) {
        this.animatePoint(
          i,
          "x",
          this.even ? this.endPoints : this.startPoints
        );
        this.animatePoint(
          i,
          "y",
          this.even ? this.endPoints : this.startPoints
        );
      }
      setTimeout(this.animate, 1000);
    }
  }
};
</script>
