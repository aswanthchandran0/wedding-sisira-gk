import {createBrowserRouter} from 'react-router-dom'
import CoverScreen from '../pages/CoverScreen'
import WeddingInvitation from '../pages/CoverScreen'
import InvitationScreen from '../pages/InvitationScreen'


export const Router = createBrowserRouter([{
    path:'/',
    element:<WeddingInvitation/>
},{
    path:"/invitation",
    element:<InvitationScreen/>
}
],{
      scrollRestoration: 'manual'
})


