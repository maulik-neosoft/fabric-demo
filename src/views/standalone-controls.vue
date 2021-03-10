<template>
  <div class="row mt-5">
    <div class="col-6">
      <canvas ref="canvas" width="400" height="400" />
    </div>
    <div class="col-6 text-center">
      <div class="form-field">
        <label>Angle:</label>
        <input v-model="control.angleControl" type="range" min="0" />
      </div>
      <div class="form-field">
        <label>Scale:</label>
        <input v-model="control.scaleControl" type="range" min="0" />
      </div>
      <div class="form-field">
        <label>Top:</label>
        <input v-model="control.topControl" type="range" min="0" />
      </div>
      <div class="form-field">
        <label>Left:</label>
        <input v-model="control.leftControl" type="range" min="0" />
      </div>
      <div class="form-field">
        <label>Skew-X:</label>
        <input v-model="control.skewXControl" type="range" min="0" />
      </div>
      <div class="form-field">
        <label>Skew-Y:</label>
        <input v-model="control.skewYControl" type="range" min="0" />
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";

export default {
  data() {
    return {
      canvas: null,
      rect: null,
      control: {
        angleControl: null,
        scaleControl: null,
        topControl: null,
        leftControl: null,
        skewXControl: null,
        skewYControl: null
      }
    };
  },
  watch: {
    "control.angleControl": {
      handler: function(value) {
        this.rect.set("angle", parseInt(value, 10)).setCoords();
        this.canvas.requestRenderAll();
      }
    },
    "control.scaleControl": {
      handler: function(value) {
        this.rect.scale(parseFloat(value)).setCoords();
        this.canvas.requestRenderAll();
      }
    },
    "control.topControl": {
      handler: function(value) {
        this.rect.set("top", parseInt(value, 10)).setCoords();
        this.canvas.requestRenderAll();
      }
    },
    "control.leftControl": {
      handler: function(value) {
        this.rect.set("left", parseInt(value, 10)).setCoords();
        this.canvas.requestRenderAll();
      }
    },
    "control.skewXControl": {
      handler: function(value) {
        this.rect.set("skewX", parseInt(value, 10)).setCoords();
        this.canvas.requestRenderAll();
      }
    },
    "control.skewYControl": {
      handler: function(value) {
        this.rect.set("skewY", parseInt(value, 10)).setCoords();
        this.canvas.requestRenderAll();
      }
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    fabric.Object.prototype.transparentCorners = false;

    this.rect = new fabric.Rect({
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      fill: "rgba(255,0,0,0.5)"
    });

    this.canvas.add(this.rect);

    this.canvas.on({
      "object:moving": this.updateControls,
      "object:scaling": this.updateControls,
      "object:resizing": this.updateControls,
      "object:rotating": this.updateControls,
      "object:skewing": this.updateControls
    });
  },
  methods: {
    updateControls(data) {
      this.control.scaleControl = data.target.scaleX; // this.rect.scaleX;
      this.control.angleControl = data.target.angle; // this.rect.angle;
      this.control.leftControl = data.target.left; // this.rect.left;
      this.control.topControl = data.target.top; // this.rect.top;
      this.control.skewXControl = data.target.skewX; // this.rect.skewX;
      this.control.skewYControl = data.target.skewY; // this.rect.skewY;
    }
  }
};
</script>
