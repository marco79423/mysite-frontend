import React from 'react'
import getConfig from 'next/config'
import Head from 'next/head'
import {appWithTranslation, useTranslation} from 'next-i18next'
import {CssBaseline} from '@material-ui/core'

import AppProvider from '../containers/AppProvider'

function App({Component, pageProps}) {
  const {publicRuntimeConfig} = getConfig()
  const {t} = useTranslation()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t(publicRuntimeConfig.siteName)}</title>

        <meta name="application-name" content={t(publicRuntimeConfig.siteName)}/>
        <meta name="description" content={t('')}/>
        <meta name="keywords" content="diudiu"/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:url" content="https://diu-diu.com"/>
        <meta name="twitter:title" content={t(publicRuntimeConfig.siteName)}/>
        <meta name="twitter:description" content={t('')}/>
        <meta name="twitter:image" content="https://diu-diu.com/logo.jpg"/>
        <meta name="twitter:creator" content="@marco79423"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={t(publicRuntimeConfig.siteName)}/>
        <meta property="og:description" content={t('')}/>
        <meta property="og:site_name" content={t(publicRuntimeConfig.siteName)}/>
        <meta property="og:url" content="https://diu-diu.com"/>
        <meta property="og:image" content="https://diu-diu.com/logo.jpg"/>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png"/>

        <link rel="canonical" href="https://diu-diu.com/"/>
        <link rel="alternate" hrefLang="x-default" href="https://diu-diu.com/en"/>
        <link rel="alternate" hrefLang="zh-TW" href="https://diu-diu.com/zh-TW/"/>
        <link rel="alternate" hrefLang="zh-CN" href="https://diu-diu.com/zh-CN/"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>

      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default appWithTranslation(App)
