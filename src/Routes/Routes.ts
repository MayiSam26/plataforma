
import About from "../Pages/About"
import Home from "../Pages/Home/Home"

type JXSComponent =  () => JSX.Element
interface navigate{
    to:string,
    path:string,
    Component: JXSComponent,
    name:string
}

export const routes : navigate[] = [
    {
        to:'home',
        path:'/',
        Component:Home,
        name:'Home'
    },
    {
        to:'about',
        path:'/colitas-por-adoptar',
        Component:About,
        name:'Home'
    }
]

