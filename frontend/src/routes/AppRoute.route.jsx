import React from 'react'
import Login from '../components/Form/Login'
import Navbar from '../layout/Navbar'
import Sidebar from '../layout/Sidebar'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import DashBoard from '../layout/DashBoard'
import Portfolio from '../pages/Portfolio'
import SharedLayout from '../layout/SharedLayout'
import Profile from '../pages/Profile'
import LoginUser from '../components/Form/Loginuser'
import ProtectedLayout from '../layout/ProtectedLayout'

const AppRoute = () => {
  return (<>
<BrowserRouter>
    {/* <Navbar /> */}
<Routes>
  <Route path='/loginuser' element={<LoginUser />} />
<Route path='/login' element={<Login />} />
<Route element={<ProtectedLayout />}>
<Route path='/' element ={<SharedLayout />}>
<Route path='/dashboard' element={<DashBoard />} />
<Route path='/portfolio' element={<Portfolio />} />
<Route path='/profile' element={<Profile />} />

</Route>
</Route>
</Routes>
</BrowserRouter>
 
  
  </>
  )
}

export default AppRoute
