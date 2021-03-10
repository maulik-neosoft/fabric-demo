<template>
  <div class="row">
    <div class="col-12">
      <canvas ref="canvas" width="500" height="500" />
    </div>
    <div class="col-12">
      <b-select v-model="animationType">
        <b-select-option
          v-for="(type, index) in types"
          :key="index"
          :value="type"
        >
          {{ type }}
        </b-select-option>
      </b-select>
      <b-button @click="animate">Animate</b-button>
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
      btnDisable: false,
      animationType: null,
      types: [
        "easeInQuad",
        "easeOutQuad",
        "easeInOutQuad",
        "easeInCubic",
        "easeOutCubic",
        "easeInOutCubic",
        "easeInQuart",
        "easeOutQuart",
        "easeInOutQuart",
        "easeInQuint",
        "easeOutQuint",
        "easeInOutQuint",
        "easeInSine",
        "easeOutSine",
        "easeInOutSine",
        "easeInExpo",
        "easeOutExpo",
        "easeInOutExpo",
        "easeInCirc",
        "easeOutCirc",
        "easeInOutCirc",
        "easeInElastic",
        "easeOutElastic",
        "easeInOutElastic",
        "easeInBack",
        "easeOutBack",
        "easeInOutBack",
        "easeInBounce",
        "easeOutBounce",
        "easeInOutBounce"
      ]
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    this.rect = new fabric.Rect({
      width: 50,
      height: 50,
      left: 100,
      top: 100,
      stroke: "#aaf",
      strokeWidth: 5,
      fill: "#faa",
      selectable: false
    });
    this.canvas.add(this.rect);
  },
  methods: {
    animate() {
      this.btnDisable = false;
      this.rect.animate("left", this.rect.left === 100 ? 400 : 100, {
        duration: 1000,
        onChange: this.canvas.renderAll.bind(this.canvas),
        onComplete: () => {
          this.btnDisable = false;
        },
        easing: fabric.util.ease[this.animationType]
      });
    }
  }
};
</script>
