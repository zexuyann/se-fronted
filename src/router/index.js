import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";
import BusinessConditionView from "@/views/finance/BusinessConditionView";



const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const AccountManagement = () => import("../views/purchase/AccountManagement");



const StaffSalaryRulesView = () => import("../views/staff/staffSalaryRulesView")
const StaffClockInView = () => import("../views/staff/staffClockInView")
const StaffRegistrationView = () => import("../views/staff/staffRegistrationView")

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: () => import("@/views/auth/register.vue")
  },

    //账户管理
  {
    path: PATH.ADMIN_ACCOUNT_MANAGEMENT.path,
    component: AccountManagement,
    meta: { requiresAuth: PATH.ADMIN_ACCOUNT_MANAGEMENT.requiresAuth }
  },
  {
    path: PATH.BUSINESS_CONDITION_VIEW.path,
    component: BusinessConditionView,
    name: "BusinessConditionView",
    meta: { requiresAuth: PATH.BUSINESS_CONDITION_VIEW.requiresAuth }
  },

  //员工管理
  {
    path: PATH.STAFF_SALARYRULES_VIEW.path,
    component: StaffSalaryRulesView,
    name: "StaffSalaryRulesView",
    meta: { requiresAuth: PATH.STAFF_SALARYRULES_VIEW.requiresAuth }
  },
  {
    path: PATH.STAFF_CLOCKIN_VIEW.path,
    component: StaffClockInView,
    name: "StaffClockInView",
    meta: { requiresAuth: PATH.STAFF_CLOCKIN_VIEW.requiresAuth }
  },
  {
    path: PATH.STAFF_REGISTRATION_VIEW.path,
    component: StaffRegistrationView,
    name: "StaffRegistrationView",
    meta: { requiresAuth: PATH.STAFF_REGISTRATION_VIEW.requiresAuth }
  },

  // -----------------------未找到页面-----------------------------
  {
    path: "*",
    redirect: "/error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // console.log(to.path);
  if (to.path === "/error" || to.path === "/login") {
    next();
  } else if (to.path === "/") {
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    if (token == null || role == null) next("/login");
    else next();
  } else if (to.meta.requiresAuth) {
    if (
      to.meta.requiresAuth.some(
        role => role.toString() === sessionStorage.getItem("role")
      )
    ) {
      //有权限
      // console.log("获得访问权限");
      next()
    } else {
      // console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    next();
  }
});

export default router;
