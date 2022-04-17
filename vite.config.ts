import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: 'src/__dev__',
    server: {
        open: true,
    },
    resolve: {
        alias: {
            '~': `${__dirname}/src`,
        },
    },
    plugins: [
        react({
            // not sure why vite doesn't pickup this up from tsconfig.json :/
            jsxImportSource: '@emotion/react',
        }),
    ],
})
