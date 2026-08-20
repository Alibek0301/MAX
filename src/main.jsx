import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const YANDEX_METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID
const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID

const loadScript = (src) => {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

const initGoogleAnalytics = () => {
  if (!GA_ID) return
  if (window.gtag) return

  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

const initYandexMetrika = () => {
  if (!YANDEX_METRIKA_ID) return
  if (window.ym) return

  loadScript('https://mc.yandex.ru/metrika/tag.js')
  window.ym = window.ym || function ym() {
    ; (window.ym.a = window.ym.a || []).push(arguments)
  }
  window.ym.l = Number(new Date())
  window.ym(Number(YANDEX_METRIKA_ID), 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  })
}

const initFacebookPixel = () => {
  if (!FACEBOOK_PIXEL_ID) return
  if (window.fbq) return

  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  window.fbq = function fbq() {
    ; (window.fbq.q = window.fbq.q || []).push(arguments)
  }
  window.fbq('init', FACEBOOK_PIXEL_ID)
  window.fbq('track', 'PageView')
}

const initAnalytics = () => {
  try {
    initGoogleAnalytics()
    initYandexMetrika()
    initFacebookPixel()
  } catch {
    // ignore analytics initialization errors
  }
}

// Service Worker cleanup removed - allowing normal browser caching to work

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

initAnalytics()

