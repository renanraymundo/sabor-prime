import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import { PluginAPI } from 'tailwindcss/types/config'

type ContainerConfig = {
  [key: string]: {
    maxWidth: string
    width: string
    marginLeft: string
    marginRight: string
    paddingLeft: string
    paddingRight: string
  }
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': 'var(--font-bebas-neue)',
        'dancing-script': 'var(--font-dancing-script)',
      },
      screens: {
        ...defaultTheme.screens,
        xs: '512px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              500: '#65915C',
              DEFAULT: '#91D685',
            },
            secondary: {
              100: '#FFCD74',
              DEFAULT: '#D4942C',
            },
          },
        },
      },
    }),
    function (api: PluginAPI) {
      const containerConfigs: Record<string, string> = {
        'theme-container': '64rem',
      }

      const containers: ContainerConfig = {}

      for (const [key, value] of Object.entries(containerConfigs)) {
        containers[`.${key}`] = {
          maxWidth: value,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }
      }

      api.addComponents(containers)
    },
  ],
}
export default config
