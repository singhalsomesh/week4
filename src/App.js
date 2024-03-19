import React from 'react'
import Product from './component/Product'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Cart from './component/Cart';
import RootLayout from './component/RootLayout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route index element={<Dashboard />}></Route>
    <Route path='/cart' element={<Cart />}></Route>
  </Route>
))

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App