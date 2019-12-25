import index from "../components/page/index";
import login from "../components/page/login/login";
import logon from "../components/page/logon/logon";
import subjectList from "../components/page/subject/subjectList";
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
                path: 'test',
                name: 'test',
                component: subjectList
            }
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