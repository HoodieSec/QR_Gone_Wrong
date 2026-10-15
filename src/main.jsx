import { StrictMode } from 'react'
import {UseEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import Main_display from './display'
import './display.css'

createRoot(document.getElementById('root')).render(
  <>
    <Main_display />
    <Analytics /> 
  </>

)
