import React from 'react'
import {makeStyles} from '@material-ui/core'

import useWindowSize from '../../hooks/useWindowSize'
import Header from '../base/Header'


const useStyles = makeStyles({
  root: ({width, height}) => ({
    width: width,
    height: height,

    display: 'flex',
    flexDirection: 'column',
  }),

  body: {
    flex: 1,
    position: 'relative',
  }
})

export default function RollingDieLayout({children}) {
  const {width, height} = useWindowSize()
  const classes = useStyles({width, height})

  return (
    <div className={classes.root}>
      <Header/>
      <div className={classes.body}>
        {children}
      </div>
    </div>
  )
}
