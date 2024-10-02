import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': 'var(--font-bebas-neue)',
        'dancing-script': 'var(--font-dancing-script)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'sabor-prime': {
          green: {
            300: '#91D685',
            500: '#65915C',
          },
          orange: {
            100: '#FFCD74',
            300: '#D4942C',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
