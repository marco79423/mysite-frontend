import React from 'react'
import Head from 'next/head'
import {CssBaseline} from '@mui/material'

export default function Index() {
  return (
    <>
      <Head>
        <title>實驗室</title>
        <meta name="description" content="實驗室"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <CssBaseline/>

      <div>兩大類的實驗室</div>
    </>
  )
}
