import React from 'react'

// 參考做法： https://stackoverflow.com/questions/51504506/too-many-react-context-providers/58924810#58924810

const ProviderCompose = {
  provider: (provider, props = {}) => [provider, props],

  Composer: ({providers = [], children}) => {
    return providers.reduceRight((acc, [Provider, props]) => {
      return <Provider {...props}>{acc}</Provider>
    }, children)
  }
}

export default ProviderCompose
