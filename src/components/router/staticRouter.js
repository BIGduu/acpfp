import index from '../page/index'
import subjectList from "../page/subject/subjectList";
const staticRouter =[
    {
        path: '*',
        redirect:'/home'
    },
    {
        path: '/home',
        name: '',
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