<template>
  <div>
    <div class="row mt-5">
      <!-- EDITOR OPTIONS -->
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="accordion" role="tablist">
              <!-- Options -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-5 variant="info">
                    Options
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-5"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-select v-model="clothType">
                      <b-select-option
                        v-for="(item, index) in items"
                        :key="index"
                        :value="index"
                      >
                        {{ item.type }}
                      </b-select-option>
                    </b-select>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Color -->
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

              <!-- Emoji -->
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="info">
                    Emoji
                  </b-button>
                </b-card-header>
                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body class="ml-3">
                    <img
                      v-for="(emoji, index) in emojis"
                      :key="index"
                      :src="emoji"
                      style="width: 50px; border: 1px solid gray; padding: 5px; margin: 3px; cursor: pointer;"
                      @click="addEmoji(emoji)"
                    />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Text  -->
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
                    <b-input-group>
                      <b-form-input
                        v-model="text"
                        placeholder="Enter Text..."
                      />
                      <b-input-group-append>
                        <b-input
                          type="color"
                          style="width: 40px;"
                          v-model="textColor"
                        />
                        <b-button variant="outline-primary" @click="addText">
                          Enter
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
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
          <b-button @click="removeSelectedObject">Delete</b-button>
          <!-- <b-button>Right</b-button> -->
        </b-button-group>
        <div
          class="page"
          style="width: 530px; height: 630px; position: relative; background-color: rgb(255, 255, 255); margin: 0px auto;"
        >
          <img v-if="isFront" :src="front" :style="getColorStyle" />
          <img v-else :src="back" :style="getColorStyle" />
          <div
            v-show="isFront"
            style="position: absolute;top: 100px;left: 160px;z-index: 10;width: 200px;height: 400px;"
          >
            <canvas
              ref="canvasFront"
              width="200"
              height="400"
              class="hover"
              style="-webkit-user-select: none;"
            />
          </div>
          <div
            v-show="!isFront"
            style="position: absolute;top: 100px;left: 160px;z-index: 10;width: 200px;height: 400px;"
          >
            <canvas
              ref="canvasBack"
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
      // canvas: null,
      isFront: true,
      color: "#ffffff",
      frontCanvas: null,
      backCanvas: null,
      text: null,
      textColor: "#000000",
      clothType: 0,
      items: [
        {
          type: "Crew",
          front: require("@/assets/images/crew_front.png"),
          back: require("@/assets/images/crew_back.png")
        },
        {
          type: "Hoodie",
          front: require("@/assets/images/mens_hoodie_front.png"),
          back: require("@/assets/images/mens_hoodie_back.png")
        },
        {
          type: "Tank",
          front: require("@/assets/images/mens_tank_front.png"),
          back: require("@/assets/images/mens_tank_back.png")
        }
      ],
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
      ],
      emojis: [
        require("@/assets/emoji/angry-1.svg"),
        require("@/assets/emoji/embarrassed.svg"),
        require("@/assets/emoji/kissing.svg"),
        require("@/assets/emoji/smiling.svg"),
        require("@/assets/emoji/angry.svg"),
        require("@/assets/emoji/emoticons.svg"),
        require("@/assets/emoji/mad.svg"),
        require("@/assets/emoji/surprised-1.svg"),
        require("@/assets/emoji/bored-1.svg"),
        require("@/assets/emoji/happy-1.svg"),
        require("@/assets/emoji/nerd.svg"),
        require("@/assets/emoji/surprised.svg"),
        require("@/assets/emoji/bored-2.svg"),
        require("@/assets/emoji/happy-2.svg"),
        require("@/assets/emoji/ninja.svg"),
        require("@/assets/emoji/suspicious-1.svg"),
        require("@/assets/emoji/bored.svg"),
        require("@/assets/emoji/happy-3.svg"),
        require("@/assets/emoji/quiet.svg"),
        require("@/assets/emoji/suspicious.svg"),
        require("@/assets/emoji/confused-1.svg"),
        require("@/assets/emoji/happy-4.svg"),
        require("@/assets/emoji/sad.svg"),
        require("@/assets/emoji/tongue-out-1.svg"),
        require("@/assets/emoji/confused.svg"),
        require("@/assets/emoji/happy.svg"),
        require("@/assets/emoji/secret.svg"),
        require("@/assets/emoji/tongue-out.svg"),
        require("@/assets/emoji/crying-1.svg"),
        require("@/assets/emoji/ill.svg"),
        require("@/assets/emoji/smart.svg"),
        require("@/assets/emoji/unhappy.svg"),
        require("@/assets/emoji/crying.svg"),
        require("@/assets/emoji/in-love.svg"),
        require("@/assets/emoji/smile.svg"),
        require("@/assets/emoji/wink.svg")
      ]
    };
  },
  computed: {
    getColorStyle() {
      return "background-color: " + this.color + ";";
    },
    front() {
      return this.items[this.clothType].front;
    },
    back() {
      return this.items[this.clothType].back;
    },
    canvas() {
      return this.isFront ? "frontCanvas" : "backCanvas";
    }
  },
  watch: {
    isFront: {
      handler: function(value) {
        if (value && this.frontCanvas === null) {
          this.$nextTick(function() {
            this.initialize("canvasFront");
          });
        }
        if (!value && this.backCanvas === null) {
          this.initialize("canvasBack");
        }
      },
      immediate: true
    }
  },
  methods: {
    initialize(reference) {
      this[this.canvas] = new fabric.Canvas(this.$refs[reference], {
        hoverCursor: "pointer",
        selection: true,
        selectionBorderColor: "blue"
      });
      this[this.canvas].on({
        "object:moving": function(e) {
          e.target.opacity = 0.5;
        },
        "object:modified": function(e) {
          e.target.opacity = 1;
        },
        "object:selected": this.onObjectSelected,
        "selection:cleared": this.onSelectedCleared
      });

      this[this.canvas].on("object:over", function() {
        //e.target.setFill('red');
        //canvas.renderAll();
      });

      this[this.canvas].on("object:out", function() {
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
    },
    addText() {
      if (this.text === "" || this.text === undefined || this.text === null) {
        return;
      }

      const textSample = new fabric.Text(this.text, {
        left: fabric.util.getRandomInt(0, 200),
        top: fabric.util.getRandomInt(0, 400),
        fontFamily: "helvetica",
        angle: 0,
        fill: this.textColor,
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: "",
        hasRotatingPoint: true
      });
      this[this.canvas].add(textSample);
      this.text = null;
    },
    removeSelectedObject() {
      this[this.canvas].remove(this[this.canvas].getActiveObject());
    },
    addEmoji(emoji) {
      fabric.Image.fromURL(emoji, image => {
        var img1 = image.set({ left: 0, top: 0, height: 100, width: 100 });
        this[this.canvas].add(img1);
      });
    }
  }
};
</script>

<style>
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
.canvas-container {
  background-color: unset !important;
}
.canvas-container:hover {
  border: 1px solid black;
}
</style>
