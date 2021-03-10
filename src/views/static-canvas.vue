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
      // ...
    };
  },
  mounted() {
    this.canvas = new fabric.StaticCanvas(this.$refs.canvas);

    this.canvas.add(
      new fabric.Rect({
        top: 100,
        left: 100,
        width: 50,
        height: 50,
        fill: "#f55"
      }),

      new fabric.Circle({ top: 140, left: 230, radius: 75, fill: "green" }),

      new fabric.Triangle({
        top: 300,
        left: 210,
        width: 100,
        height: 100,
        fill: "blue"
      })
    );

    // fabric.Image.fromURL("../lib/pug.jpg", img => {
    //   this.canvas.add(img.set({ left: 400, top: 350, angle: 30 }).scale(0.25));
    // });

    this.animate();
  },
  methods: {
    animate() {
      this.canvas
        .item(0)
        .animate(
          "top",
          this.canvas.item(0).get("top") === 500 ? "100" : "500",
          {
            duration: 1000,
            onChange: this.canvas.renderAll.bind(this.canvas),
            onComplete: this.animate
          }
        );
    }
  }
};
</script>
