/**
 * IMPORTANT: Dynamic imports must be relative to each file and include an explicit extension.
 * see: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 *
 * dynamicImportVars() is a patch that is inlining the import in the dist - this isn't optimal.
 * Ideally the relative paths from the source can be substituted for the correct co-located
 * dependency once built.
 *
 * The i18nCountries & i18nDates seem to work because ../../../node_modules just happens to
 * coincide for both development and production, based on their location in the project and
 * the final bundle being a level deep in ./dist - this is pure chance and a tad sketchy...
 *
 * TODO: better handling of dynamic imports.
 */

import { RollupOptions } from 'rollup'
import replace from '@rollup/plugin-replace'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

import pkg from './package.json'

const config: RollupOptions = {
    input: 'src/main.tsx',
    output: [
        { file: pkg.main, format: 'cjs', inlineDynamicImports: true },
        { file: pkg.module, format: 'es', inlineDynamicImports: true },
    ],
    plugins: [
        typescript(),
        json(),
        dynamicImportVars({
            include: ['./src/context/locale/i18nLocalCopy.ts'],
        }),
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
