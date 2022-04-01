import React from 'react'
import {makeStyles} from '@material-ui/core'

import useWindowSize from '../../hooks/useWindowSize'
import Header from '../base/Header'


const useStyles = makeStyles({
  root: ({width, height}) => ({
    minWidth: width,
    minHeight: height,
  }),
})

export default function BaseLayout({children}) {
  const {width, height} = useWindowSize()
  const classes = useStyles({width, height})

  return (
    <div className={classes.root}>
      <Header/>

      {children}
    </div>
  )
}
