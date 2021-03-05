<template>
  <div>
    <div class="row mt-5">
      <!-- EDITOR OPTIONS -->
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="info">
                    Color
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <ul class="m-2 p-0">
                      <li
                        v-for="(color, index) in colors"
                        :key="index"
                        class="color-preview"
                        :style="'background-color:' + color + ';'"
                        @click="selectColor(color)"
                      />
                    </ul>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="info">
                    Gravetar
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-card-text></b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="info">
                    Text
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <!--  -->
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="col-6">
        <b-button-group size="sm">
          <b-button @click="toggleFlip">Flip</b-button>
          <!-- <b-button>Middle</b-button>
          <b-button>Right</b-button> -->
        </b-button-group>
        <div
          class="page"
          style="width: 530px; height: 630px; position: relative; background-color: rgb(255, 255, 255); margin: 0px auto;"
        >
          <img
            v-if="isFront"
            src="@/assets/images/crew_front.png"
            :style="getColorStyle"
          />
          <img
            v-else
            src="@/assets/images/crew_back.png"
            :style="getColorStyle"
          />
          <div
            id="drawingArea"
            style="position: absolute;top: 100px;left: 160px;z-index: 10;width: 200px;height: 400px;"
          >
            <canvas
              id="tcanvas"
              width="200"
              height="400"
              class="hover"
              style="-webkit-user-select: none;"
            />
          </div>
        </div>
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
      isFront: true,
      color: "#ffffff",
      frontCanvas: null,
      backCanvas: null,
      colors: [
        "#ffffff",
        "#616161",
        "#f0f0f0",
        "#5b5b5b",
        "#222222",
        "#fc8d74",
        "#432d26",
        "#eead91",
        "#806355",
        "#382d21",
        "#faef93",
        "#aeba5e",
        "#8aa140",
        "#1f6522",
        "#13afa2",
        "#b8d5d7",
        "#15aeda",
        "#a5def8",
        "#0f77c0",
        "#3469b7",
        "#c50404"
      ]
    };
  },
  computed: {
    getColorStyle() {
      return "background-color: " + this.color + ";";
    }
  },
  methods: {
    initialize() {
      this.canvas = new fabric.Canvas("tcanvas", {
        hoverCursor: "pointer",
        selection: true,
        selectionBorderColor: "blue"
      });
      this.canvas.on({
        "object:moving": function(e) {
          e.target.opacity = 0.5;
        },
        "object:modified": function(e) {
          e.target.opacity = 1;
        },
        "object:selected": this.onObjectSelected,
        "selection:cleared": this.onSelectedCleared
      });
      // piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
      this.canvas.findTarget = (function(originalFn) {
        return function() {
          var target = originalFn.apply(this, arguments);
          if (target) {
            if (this._hoveredTarget !== target) {
              this.canvas.fire("object:over", { target: target });
              if (this._hoveredTarget) {
                this.canvas.fire("object:out", { target: this._hoveredTarget });
              }
              this._hoveredTarget = target;
            }
          } else if (this._hoveredTarget) {
            this.canvas.fire("object:out", { target: this._hoveredTarget });
            this._hoveredTarget = null;
          }
          return target;
        };
      })(this.canvas.findTarget);

      this.canvas.on("object:over", function() {
        //e.target.setFill('red');
        //canvas.renderAll();
      });

      this.canvas.on("object:out", function() {
        //e.target.setFill('green');
        //canvas.renderAll();
      });
    },
    toggleFlip() {
      this.isFront = !this.isFront;
    },
    selectColor(color) {
      this.color = color;
    },
    onObjectSelected(e) {
      const selectedObject = e.target;
      selectedObject.hasRotatingPoint = true;
      if (selectedObject && selectedObject.type === "text") {
        //display text editor
        // $("#texteditor").css("display", "block");
        // $("#text-string").val(selectedObject.getText());
        // $("#text-fontcolor").miniColors("value", selectedObject.fill);
        // $("#text-strokecolor").miniColors("value", selectedObject.strokeStyle);
        // $("#imageeditor").css("display", "block");
      } else if (selectedObject && selectedObject.type === "image") {
        //display image editor
        // $("#texteditor").css("display", "none");
        // $("#imageeditor").css("display", "block");
      }
    },
    onSelectedCleared() {
      // $("#texteditor").css("display", "none");
      // $("#text-string").val("");
      // $("#imageeditor").css("display", "none");
    }
  }
};
</script>

<style scoped>
.color-preview {
  border: 1px solid black;
  margin: 5px;
  zoom: 1;
  vertical-align: top;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  width: 30px;
  height: 30px;
}
</style>
