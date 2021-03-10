import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/t-shirt",
    name: "T-Shirt",
    component: () => import("../views/Shirt.vue")
  },
  {
    path: "/free-drawing",
    name: "Free-Drawing",
    component: () => import("../views/free-drawing.vue")
  },
  {
    path: "/touch-events",
    name: "Touch-Events",
    component: () => import("../views/touch-events.vue")
  },
  {
    path: "/custom-controller",
    name: "Custom-Controller",
    component: () => import("../views/custom-controller.vue")
  },
  {
    path: "/custom-controls-polygon",
    name: "Custom Controls Polygon",
    component: () => import("../views/custom-controls-polygon.vue")
  },
  {
    path: "/stroke-uniform",
    name: "Stroke Uniform",
    component: () => import("../views/stroke-uniform.vue")
  },
  {
    path: "/polygon-animation",
    name: "Polygon Animation",
    component: () => import("../views/polygon-points.vue")
  },
  {
    path: "/quadratic-curve",
    name: "Quadratic Curve",
    component: () => import("../views/quadratic-curve.vue")
  },
  {
    path: "/animation-easing",
    name: "Animation Easing",
    component: () => import("../views/animation-easing.vue")
  },
  {
    path: "/standalone-controls",
    name: "Standalone Controls",
    component: () => import("../views/standalone-controls.vue")
  },
  {
    path: "/static-canvas",
    name: "Static Canvas",
    component: () => import("../views/static-canvas.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
