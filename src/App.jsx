import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import { TonProvider } from './utils/context'
import {Toaster} from 'react-hot-toast'
import {TonConnectUIProvider} from '@tonconnect/ui-react'
import Intro from './pages/Intro'
window.Buffer = window.Buffer || require("buffer").Buffer; 


const App = () => {
  // const manifestURL="https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json"
  const manifestURL="https://raw.githubusercontent.com/atharav-bhatnagar-qb/ton-demo/master/manifestURL.json"
  return (
    <TonConnectUIProvider enableAndroidBackHandler={true} manifestUrl={manifestURL}>
    <TonProvider>
    <Router className='w-screen'>
      <Routes>
        <Route path='/' element={<Intro/>}/>
      </Routes>
      <Toaster/>
    </Router>
    </TonProvider>
    </TonConnectUIProvider>
  )
}

export default App