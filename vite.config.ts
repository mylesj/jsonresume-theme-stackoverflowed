import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export default defineConfig({
    root: 'src/__dev__',
    resolve: {
        alias: {
            '~': `${__dirname}/src`,
        },
    },
    define: {
        'process.env': {
            STACK_EXCHANGE_API_KEY: process.env.STACK_EXCHANGE_API_KEY,
            STACK_EXCHANGE_ACCESS_TOKEN:
                process.env.STACK_EXCHANGE_ACCESS_TOKEN,
        },
    },
    plugins: [
        react({
            // not sure why vite doesn't pickup this up from tsconfig.json :/
            jsxImportSource: '@emotion/react',
        }),
    ],
})
