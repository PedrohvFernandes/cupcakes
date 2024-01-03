// O proprio shadcn/ui configurou o tailwind para que ele possa ser extendido, e as variaveis de cor possam ser usadas no tailwind atraves do main.css(Eu que defini o nome do arquivo e das cores, mas se quiser deixar como o shadcn/ui pode deixar)
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // Cores configuradas aqui pela dev/pela propria lib usando as variaveis do main.css. Se quiser um texto com a cor do background basta colocar className = "text-background" ou se quiser nativo do tailwind className = "text-gray-900". Daria para colocar mais coisas na cor background, ex: background: { "primary": "var(--primary)" }, com isso eu poderia usar dessa forma: className = "text-background-primary" mas como o shadcn/ui ja tem um background configurado, eu deixei assim
      // Entao se a gente usar as config daqui, vai ser com base nas cores configuradas no main.css
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          backgroundIcons: 'hsl(var(--primary-background-icons))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        alert: {
          DEFAULT: 'hsl(var(--alert))',
          foreground: "hsl(var(--alert-foreground))",
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        fontWeight: 'font-weight'
      },
      screens: {
        'md900': '900px',
        // => @media (min-width: 900px) { ... }
        'md817': '817px',
        // => @media (min-width: 817px) { ... }
        'sm430': '430px',
        // => @media (min-width: 430px) { ... }
        'sm398': '398px',
        // => @media (min-width: 398px) { ... }
        'sm355': '355px',
        // => @media (min-width: 355px) { ... }
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  },
  plugins: [require('tailwindcss-animate')]
}
