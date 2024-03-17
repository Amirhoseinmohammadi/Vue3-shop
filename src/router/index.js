import { createWebHistory, createRouter } from "vue-router";
import useAuthUser from "../composable/UseAuthUser";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import Products from "../views/products.vue";
import Register from "../views/Register.vue";
import EmailConfirmation from "../components/auch/EmailConfirmation.vue";
import ForgotPassword from "../components/auch/ForgotPassword.vue";
import Profile from "../components/auch/Profile.vue";

// define routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: AboutUs,
  },
  {
    path: "/Products",
    name: "Products",
    component: Products,
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
  },
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: EmailConfirmation,
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: ForgotPassword,
  },
  {
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    path: "/profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthUser();
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: "Register" });
  } else {
    next(); // Continue navigation
  }
});

export default router;
