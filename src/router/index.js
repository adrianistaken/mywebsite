import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";
import YouTube from "../views/YouTube.vue";
import About from "../views/About.vue";
import SoftwareEngineer from "../views/SoftwareEngineer.vue";
import SinglePost from "../views/SinglePost.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/blog", component: Blog },
  { path: "/blog/:slug", component: SinglePost },
  { path: "/youtube", component: YouTube },
  { path: "/about", component: About },
  { path: "/software-engineer", component: SoftwareEngineer },
];

const router = createRouter({
  history: createWebHistory(), // Uses browser history mode
  routes,
});

export default router;
