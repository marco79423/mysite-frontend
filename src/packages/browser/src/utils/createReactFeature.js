import React from 'react'

/**
 * 建立 React 的功能
 * @param name
 * @returns {{Provider: (function({children: *, value: *})), useFeature: (function(): {ready}|{})}}
 */
export default function createReactFeature(name) {
  if (!name) {
    throw new Error('請提供 Feature 的名稱')
  }

  const featureContext = React.createContext({})

  const Provider = ({children, value}) => {
    return (
      <featureContext.Provider value={{ready: true, ...value}}>
        {children}
      </featureContext.Provider>
    )
  }

  const useFeature = () => {
    const feature = React.useContext(featureContext)
    if (!feature.ready) {
      throw new Error(`請提供 ${name} 的 Provider`)
    }
    return feature
  }

  return {
    Provider,
    useFeature,
  }
}
