import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Intro from './components/Intro'
import Home from './components/Home'
import Header from './components/Header'
import View from './components/View'

function App() {
  const appRouter=createBrowserRouter([
    {
      path:'/',
      element:<Intro/>
    },
    {
      path:'/home',
      element:(
        <>
        <Header/>
              <Home/>

        </>
      ),
    
    },
    {
      path:'/view',
      element:<View/>
    }
  ])
  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
