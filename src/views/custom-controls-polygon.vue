<template>
  <div>
    <div class="controls">
      <p>
        <button id="edit" @click="Edit">Toggle editing polygon</button>
      </p>
    </div>
    <canvas
      ref="canvas"
      width="500"
      height="400"
      style="border: 1px solid #ccc"
    />
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  name: "custom-controls-polygon",
  date() {
    return {
      canvas: null,
      pointIndex: 0
    };
  },
  methods: {
    Edit() {
      // clone what are you copying since you
      // may want copy and paste on different moment.
      // and you do not want the changes happened
      // later to reflect on the copy.
      const poly = this.canvas.getObjects()[0];
      this.canvas.setActiveObject(poly);
      poly.edit = !poly.edit;
      if (poly.edit) {
        const lastControl = poly.points.length - 1;
        poly.cornerStyle = "circle";
        poly.cornerColor = "rgba(0,0,255,0.5)";
        poly.controls = poly.points.reduce((acc, point, index) => {
          acc["p" + index] = new fabric.Control({
            positionHandler: (dim, finalMatrix, fabricObject) => {
              const x =
                fabricObject.points[index].x - fabricObject.pathOffset.x;
              const y =
                fabricObject.points[index].y - fabricObject.pathOffset.y;
              this.pointIndex += 1;
              return fabric.util.transformPoint(
                { x: x, y: y },
                fabric.util.multiplyTransformMatrices(
                  fabricObject.canvas.viewportTransform,
                  fabricObject.calcTransformMatrix()
                )
              );
            },
            actionHandler: this.anchorWrapper(
              index > 0 ? index - 1 : lastControl,
              this.actionHandler
            ),
            actionName: "modifyPolygon",
            pointIndex: index
          });
          return acc;
        }, {});
      } else {
        poly.cornerColor = "blue";
        poly.cornerStyle = "rect";
        poly.controls = fabric.Object.prototype.controls;
      }
      poly.hasBorders = !poly.edit;
      this.canvas.requestRenderAll();
    },
    // define a function that will define what the control does
    // this function will be called on every mouse move after a control has been
    // clicked and is being dragged.
    // The function receive as argument the mouse event, the current trasnform object
    // and the current position in canvas coordinate
    // transform.target is a reference to the current object being transformed,
    actionHandler(eventData, transform, x, y) {
      var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(
          new fabric.Point(x, y),
          "center",
          "center"
        ),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
          x:
            (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
            polygon.pathOffset.x,
          y:
            (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
            polygon.pathOffset.y
        };
      polygon.points[currentControl.pointIndex] = finalPointPosition;
      return true;
    },
    // define a function that can keep the polygon in the same position when we change its
    // width/height/top/left.
    anchorWrapper(anchorIndex, fn) {
      return function(eventData, transform, x, y) {
        var fabricObject = transform.target,
          absolutePoint = fabric.util.transformPoint(
            {
              x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
              y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y
            },
            fabricObject.calcTransformMatrix()
          ),
          actionPerformed = fn(eventData, transform, x, y),
          //newDim = fabricObject._setPositionDimensions({}),
          polygonBaseSize = fabricObject._getNonTransformedDimensions(),
          newX =
            (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
            polygonBaseSize.x,
          newY =
            (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
            polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
      };
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas);
    // create a polygon object
    var points = [
      {
        x: 3,
        y: 4
      },
      {
        x: 16,
        y: 3
      },
      {
        x: 30,
        y: 5
      },
      {
        x: 25,
        y: 55
      },
      {
        x: 19,
        y: 44
      },
      {
        x: 15,
        y: 30
      },
      {
        x: 15,
        y: 55
      },
      {
        x: 9,
        y: 55
      },
      {
        x: 6,
        y: 53
      },
      {
        x: -2,
        y: 55
      },
      {
        x: -4,
        y: 40
      },
      {
        x: 0,
        y: 20
      }
    ];
    var polygon = new fabric.Polygon(points, {
      left: 100,
      top: 50,
      fill: "#D81B60",
      strokeWidth: 4,
      stroke: "green",
      scaleX: 4,
      scaleY: 4,
      objectCaching: false,
      transparentCorners: false,
      cornerColor: "blue"
    });
    this.canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
    this.canvas.add(polygon);
  }
};
</script>
