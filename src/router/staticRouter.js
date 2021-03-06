import index from "../components/page/index";
import login from "../components/page/login/login";
import logon from "../components/page/logon/logon";
import defaultSubjectList from "../components/page/subject/type/defaultSubjectList";
import allSubjectList from "../components/page/subject/type/allSubjectList";
import multipleSubjectListOnly from "@/components/page/subject/type/multipleSubjectListOnly";
import errorSubjectList from "@/components/page/subject/type/errorSubjectList";

const staticRouter =[
    {
        path: '*',
        redirect:'/login'
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/logon',
        name: 'logon',
        component: logon,
    },
    {
        path: '/home',
        name: 'home',
        component: index,
        children:[
            {
                path: 'defaultTest',
                name: 'defaultTest',
                component: defaultSubjectList
            },
            {
                path: 'allTest',
                name: 'allTest',
                component: allSubjectList
            },
            {
                path: 'multiple',
                name: 'multiple',
                component: multipleSubjectListOnly
            },
            {
                path: 'errorTest',
                name: 'errorTest',
                component: errorSubjectList
            },

        ]
    },
];

export default staticRouter;