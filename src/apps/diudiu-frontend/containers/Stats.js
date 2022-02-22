import React from 'react'
import StatsImpl from 'stats.js'
import {addAfterEffect, addEffect} from '@react-three/fiber'


export default function Stats() {
  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(0)
    stats.dom.style.top = null
    stats.dom.style.bottom = '0'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(1)
    stats.dom.style.top = null
    stats.dom.style.bottom = 0
    stats.dom.style.left = '80px'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  React.useEffect(() => {
    const stats = new StatsImpl()
    const node = document.body
    stats.showPanel(2)
    stats.dom.style.top = null
    stats.dom.style.bottom = 0
    stats.dom.style.left = '160px'
    node?.appendChild(stats.dom)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())
    return () => {
      node?.removeChild(stats.dom)
      begin()
      end()
    }
  }, [])

  return null
}
