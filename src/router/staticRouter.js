import index from "../components/page/index";
import login from "../components/page/login/login";
import logon from "../components/page/logon/logon";
import defaultSubjectList from "../components/page/subject/defaultSubjectList";
import allSubjectList from "@/components/page/subject/allSubjectList";
const staticRouter =[
    {
        path: '*',
        redirect:'/login'
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

        ]
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
    }

];

export default staticRouter;