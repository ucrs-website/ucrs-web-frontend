/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': 'hsl(var(--primary-50))',
  				'100': 'hsl(var(--primary-100))',
  				'200': 'hsl(var(--primary-200))',
  				'300': 'hsl(var(--primary-300))',
  				'400': 'hsl(var(--primary-400))',
  				'500': 'hsl(var(--primary-500))',
  				'600': 'hsl(var(--primary-600))',
  				'700': 'hsl(var(--primary-700))',
  				'800': 'hsl(var(--primary-800))',
  				'900': 'hsl(var(--primary-900))',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				hover: 'hsl(var(--primary-hover))'
  			},
  			secondary: {
  				'50': 'hsl(var(--secondary-50))',
  				'100': 'hsl(var(--secondary-100))',
  				'200': 'hsl(var(--secondary-200))',
  				'300': 'hsl(var(--secondary-300))',
  				'400': 'hsl(var(--secondary-400))',
  				'500': 'hsl(var(--secondary-500))',
  				'600': 'hsl(var(--secondary-600))',
  				'700': 'hsl(var(--secondary-700))',
  				'800': 'hsl(var(--secondary-800))',
  				'900': 'hsl(var(--secondary-900))',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				orange: 'hsl(var(--accent-orange))',
  				'orange-foreground': 'hsl(var(--accent-orange-foreground))'
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
  		fontFamily: {
  			primary: [
  				'var(--font-primary)',
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-heading)',
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-mono)',
  				'JetBrains Mono',
  				'Fira Code',
  				'Consolas',
  				'monospace'
  			]
  		},
  		fontSize: {
  			xs: 'var(--font-size-xs, 0.75rem)',
  			sm: 'var(--font-size-sm, 0.875rem)',
  			base: 'var(--font-size-base, 1rem)',
  			lg: 'var(--font-size-lg, 1.125rem)',
  			xl: 'var(--font-size-xl, 1.25rem)',
  			'2xl': 'var(--font-size-2xl, 1.5rem)',
  			'3xl': 'var(--font-size-3xl, 1.875rem)',
  			'4xl': 'var(--font-size-4xl, 2.25rem)',
  			'5xl': 'var(--font-size-5xl, 3rem)',
  			'6xl': 'var(--font-size-6xl, 3.75rem)',
  			'7xl': 'var(--font-size-7xl, 4.5rem)'
  		},
  		fontWeight: {
  			normal: 'var(--font-weight-normal, 400)',
  			medium: 'var(--font-weight-medium, 500)',
  			semibold: 'var(--font-weight-semibold, 600)',
  			bold: 'var(--font-weight-bold, 700)',
  			extrabold: 'var(--font-weight-extrabold, 800)'
  		},
  		lineHeight: {
  			tight: 'var(--line-height-tight, 1.25)',
  			snug: 'var(--line-height-snug, 1.375)',
  			normal: 'var(--line-height-normal, 1.5)',
  			relaxed: 'var(--line-height-relaxed, 1.625)',
  			loose: 'var(--line-height-loose, 2)'
  		},
  		spacing: {
  			xs: 'var(--spacing-xs, 0.25rem)',
  			sm: 'var(--spacing-sm, 0.5rem)',
  			md: 'var(--spacing-md, 1rem)',
  			lg: 'var(--spacing-lg, 1.5rem)',
  			xl: 'var(--spacing-xl, 2rem)',
  			'2xl': 'var(--spacing-2xl, 3rem)',
  			'3xl': 'var(--spacing-3xl, 4rem)',
  			'4xl': 'var(--spacing-4xl, 6rem)',
  			'5xl': 'var(--spacing-5xl, 8rem)',
  			'6xl': 'var(--spacing-6xl, 12rem)'
  		},
  		maxWidth: {
  			container: 'var(--container-max-width, 1200px)'
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		container: {
  			screens: {
  				sm: '640px',
  				md: '768px',
  				lg: '1024px',
  				xl: '1280px',
  				'2xl': '1536px'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn var(--animation-duration-normal, 0.2s) var(--animation-easing-default, ease)',
  			'slide-up': 'slideUp var(--animation-duration-normal, 0.2s) var(--animation-easing-default, ease)',
  			'scale-hover': 'scale 0.1s ease-in-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		boxShadow: {
  			sm: 'var(--shadow-sm)',
  			DEFAULT: 'var(--shadow)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)'
  		},
  		borderRadius: {
  			DEFAULT: 'var(--radius)',
  			sm: 'calc(var(--radius) - 2px)',
  			md: 'calc(var(--radius) + 2px)',
  			lg: 'calc(var(--radius) + 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [],
}
