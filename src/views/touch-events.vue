<template>
    <div>
        <p type="background: #eef; width: 583px; padding: 10px; overflow: scroll; height: 40px">
            {{this.info}}
        </p>
        <canvas id="c" width="600" height="500" style="border:1px solid #ccc"></canvas>
    </div>
</template>
<script>
  import { fabric } from "fabric";

  export default {
    data() {
      return {
        info: null,
        canvas: null,
        img: require("@/assets/images/crew_front.png"),
      }
    },
    mounted() {
      var canvas = new fabric.Canvas('c');
      fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', function(img) {
        img.scale(0.5).set({
          left: 150,
          top: 150,
          angle: -15
        });
        canvas.add(img).setActiveObject(img);
      });


      canvas.on({
        'touch:gesture': function() {
          console.log('sdf')
        },
        'touch:drag': function() {
          console.log('sdf')
        },
        'touch:orientation': function() {
          console.log('sdf')
        },
        'touch:shake': function() {
          console.log('sdf')
        },
        'touch:longpress': function() {
          console.log('sdf')
        }
      });
    }
  }
</script>
