import Vue from 'vue'
import VueRouter from 'vue-router'
import staticRouter from "@/components/router/staticRouter";

Vue.use(VueRouter);

const router = new VueRouter(
    {
        base:"/",
        routes: staticRouter
    }
);

export default router;
