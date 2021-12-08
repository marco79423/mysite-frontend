import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {file: pkg.main, format: 'umd', name: '@paji-sdk/node', sourcemap: true, esModule: false},
      {file: pkg.module, format: 'esm', sourcemap: true},
    ],

    // 根據 https://github.com/rollup/plugins/tree/master/packages/babel 的說明
    external: [
      /@babel\/runtime/,
      /ioredis/,
      /nats/,
      /node-nats-streaming/,
    ],
    // rollup plugins 的順序是從上到下
    plugins: [
      babel({
        // 根據 https://github.com/rollup/plugins/tree/master/packages/babel 的說明
        babelHelpers: 'runtime',
      }),
      typescript(),
    ]
  },
]
