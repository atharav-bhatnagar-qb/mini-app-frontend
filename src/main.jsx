import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WebApp from '@twa-dev/sdk'
import * as buffer from 'buffer';
window.Buffer = buffer.Buffer;


WebApp.ready()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
