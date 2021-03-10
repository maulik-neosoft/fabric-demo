<template>
  <div class="row">
    <div class="col-12">
      <canvas ref="canvas" width="400" height="350" />
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
    fabric.Object.prototype.originX = fabric.Object.prototype.originY =
      "center";

    this.canvas.on({
      "object:selected": this.onObjectSelected,
      "object:moving": this.onObjectMoving,
      "selection:cleared": this.onSelectionCleared
    });

    const line = new fabric.Path("M 65 0 Q 100, 100, 200, 0", {
      fill: "",
      stroke: "black",
      objectCaching: false
    });

    line.path[0][1] = 100;
    line.path[0][2] = 100;

    line.path[1][1] = 200;
    line.path[1][2] = 200;

    line.path[1][3] = 300;
    line.path[1][4] = 100;

    line.selectable = false;
    this.canvas.add(line);

    const p1 = this.makeCurvePoint(200, 200, null, line, null);
    p1.name = "p1";
    this.canvas.add(p1);

    const p0 = this.makeCurveCircle(100, 100, line, p1, null);
    p0.name = "p0";
    this.canvas.add(p0);

    const p2 = this.makeCurveCircle(300, 100, null, p1, line);
    p2.name = "p2";
    this.canvas.add(p2);
  },
  methods: {
    makeCurveCircle(left, top, line1, line2, line3) {
      var c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 5,
        radius: 12,
        fill: "#fff",
        stroke: "#666"
      });

      c.hasBorders = c.hasControls = false;

      c.line1 = line1;
      c.line2 = line2;
      c.line3 = line3;

      return c;
    },
    makeCurvePoint(left, top, line1, line2, line3) {
      var c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 8,
        radius: 14,
        fill: "#fff",
        stroke: "#666"
      });

      c.hasBorders = c.hasControls = false;

      c.line1 = line1;
      c.line2 = line2;
      c.line3 = line3;

      return c;
    },
    onObjectSelected(e) {
      var activeObject = e.target;

      if (activeObject.name == "p0" || activeObject.name == "p2") {
        activeObject.line2.animate("opacity", "1", {
          duration: 200,
          onChange: this.canvas.renderAll.bind(this.canvas)
        });
        activeObject.line2.selectable = true;
      }
    },
    onObjectMoving(e) {
      if (e.target.name == "p0" || e.target.name == "p2") {
        const p = e.target;

        if (p.line1) {
          p.line1.path[0][1] = p.left;
          p.line1.path[0][2] = p.top;
        } else if (p.line3) {
          p.line3.path[1][3] = p.left;
          p.line3.path[1][4] = p.top;
        }
      } else if (e.target.name == "p1") {
        const p = e.target;

        if (p.line2) {
          p.line2.path[1][1] = p.left;
          p.line2.path[1][2] = p.top;
        }
      } else if (e.target.name == "p0" || e.target.name == "p2") {
        const p = e.target;

        p.line1 && p.line1.set({ x2: p.left, y2: p.top });
        p.line2 && p.line2.set({ x1: p.left, y1: p.top });
        p.line3 && p.line3.set({ x1: p.left, y1: p.top });
        p.line4 && p.line4.set({ x1: p.left, y1: p.top });
      }
    },
    onSelectionCleared(e) {
      var activeObject = e.target;
      if (activeObject.name == "p0" || activeObject.name == "p2") {
        activeObject.line2.animate("opacity", "0", {
          duration: 200,
          onChange: this.canvas.renderAll.bind(this.canvas)
        });
        activeObject.line2.selectable = false;
      } else if (activeObject.name == "p1") {
        activeObject.animate("opacity", "0", {
          duration: 200,
          onChange: this.canvas.renderAll.bind(this.canvas)
        });
        activeObject.selectable = false;
      }
    }
  }
};
</script>
