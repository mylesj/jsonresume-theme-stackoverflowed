import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const config: RollupOptions = {
    input: 'src/main.tsx',
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' },
    ],
    plugins: [typescript()],
    external: [
        'react',
        'react/jsx-runtime',
        'react-dom/server',
        '@emotion/react',
    ],
}

export default config
