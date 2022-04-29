import { RollupOptions } from 'rollup'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

import pkg from './package.json'

const config: RollupOptions = {
    input: 'src/main.tsx',
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' },
    ],
    plugins: [
        typescript(),
        json(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    external: [
        'react',
        'react/jsx-runtime',
        'react-dom/server',
        '@emotion/react',
        '@emotion/react/jsx-runtime',
        'i18n-iso-countries',
        'date-fns',
        'date-fns/locale',
    ],
    onwarn: (err) => {
        throw new Error(err.message)
    },
}

export default config
