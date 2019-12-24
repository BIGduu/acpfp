import index from '../components/page/index'
import subjectList from "../components/page/subject/subjectList";
const staticRouter =[
    {
        path: '*',
        redirect:'/home'
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
];

export default staticRouter;