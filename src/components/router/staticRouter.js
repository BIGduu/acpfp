import index from '../page/index'
const staticRouter =[
    {
        path: '*',
        redirect:'/index'
    },
    {
        path: '/index',
        name: '',
        component: index
    },
];

export default staticRouter;