import * as designSystemModule from '../public/DesignSystem.json'

/**
 * UCRS Theme Configuration
 * Maps DesignSystem.json to shadcn/ui theme variables and provides utility functions
 */

// Helper function to safely access the design system data
function getThemeData() {
  const data: any = designSystemModule
  return data.default?.designSystem || data.designSystem
}

// Create theme object using function to avoid build worker issues
function createTheme() {
  const _data = getThemeData()
  return {
    // Brand Information
    brand: {
      name: _data.brandName,
      fullName: _data.fullName,
      industry: _data.industry,
    },

    // Color System (HSL values for shadcn/ui compatibility)
    colors: {
      // Primary Colors (Red)
      primary: {
        DEFAULT: '0 79% 50%', // #E53E3E
        50: '0 86% 97%',     // #FED7D7
        100: '0 93% 94%',    // #FEB2B2
        200: '0 96% 89%',    // #FC8181
        300: '0 91% 83%',    // #F56565
        400: '0 84% 74%',    // #E53E3E
        500: '0 79% 60%',    // #DC2626
        600: '0 72% 51%',    // #C53030
        700: '0 74% 42%',    // #9B2C2C
        800: '0 70% 35%',    // #822727
        900: '0 63% 31%',    // #631B1B
        foreground: '0 0% 100%', // White
        hover: '0 72% 51%',      // #C53030
      },

      // Secondary Colors (Blue)
      secondary: {
        DEFAULT: '214 84% 37%',   // #2B6CB0
        50: '214 100% 97%',      // #BEE3F8
        100: '214 95% 93%',      // #90CDF4
        200: '214 81% 88%',      // #63B3ED
        300: '214 70% 83%',      // #4299E1
        400: '214 84% 67%',      // #3182CE
        500: '214 84% 56%',      // #2B6CB0
        600: '214 84% 46%',      // #2C5282
        700: '214 80% 36%',      // #2A4365
        800: '214 73% 25%',      // #1A365D
        900: '214 64% 19%',      // #102A43
        foreground: '0 0% 100%', // White
      },

      // Neutral Colors (Gray)
      neutral: {
        50: '214 20% 98%',    // #F7FAFC
        100: '214 17% 95%',   // #EDF2F7
        200: '214 14% 93%',   // #E2E8F0
        300: '214 13% 86%',   // #CBD5E0
        400: '214 11% 78%',   // #A0AEC0
        500: '214 10% 70%',   // #718096
        600: '214 13% 65%',   // #4A5568
        700: '214 15% 46%',   // #2D3748
        800: '214 18% 30%',   // #1A202C
        900: '214 20% 21%',   // #171923
        white: '0 0% 100%',   // #FFFFFF
        black: '0 0% 0%',     // #000000
      },

      // Accent Colors
      accent: {
        green: {
          DEFAULT: '142 71% 45%',   // #38A169
          50: '142 86% 96%',        // #C6F6D5
          100: '142 77% 90%',       // #9AE6B4
          200: '142 76% 83%',       // #68D391
          300: '142 72% 76%',       // #4FD1C7
          400: '142 69% 67%',       // #38B169
          500: '142 71% 58%',       // #319795
          600: '142 71% 45%',       // #2F855A
          700: '142 72% 36%',       // #276749
          800: '142 70% 29%',       // #22543D
          900: '142 75% 22%',       // #1C4532
          foreground: '0 0% 100%', // White
        },
        orange: {
          DEFAULT: '25 95% 53%',    // #DD6B20
          50: '25 100% 97%',       // #FEEBC8
          100: '25 100% 92%',      // #FDBAA7
          200: '25 100% 86%',      // #FC9D82
          300: '25 95% 76%',       // #FD8063
          400: '25 95% 66%',       // #FF6347
          500: '25 95% 53%',       // #DD6B20
          600: '25 95% 46%',       // #C05621
          700: '25 95% 37%',       // #9A3412
          800: '25 95% 30%',       // #7C2D12
          900: '25 95% 25%',       // #652B19
          foreground: '0 0% 100%', // White
        },
      },

      // UI Colors
      background: '0 0% 100%',           // #FFFFFF
      foreground: '214 32% 20%',        // #1A202C
      card: '0 0% 100%',                // #FFFFFF
      'card-foreground': '214 32% 20%', // #1A202C
      popover: '0 0% 100%',             // #FFFFFF
      'popover-foreground': '214 32% 20%', // #1A202C
      muted: '214 14% 96%',             // #F7FAFC
      'muted-foreground': '214 32% 39%', // #4A5568
      destructive: '0 79% 50%',         // #E53E3E
      'destructive-foreground': '0 0% 100%', // #FFFFFF
      border: '214 20% 90%',            // #E2E8F0
      input: '214 20% 90%',             // #E2E8F0
      ring: '0 79% 50%',                // #E53E3E
    },

    // Typography System
    typography: {
      fontFamily: {
        primary: _data.typography.fontFamilies.primary,
        heading: _data.typography.fontFamilies.heading,
        mono: _data.typography.fontFamilies.mono,
      },
      fontSize: _data.typography.fontSizes,
      fontWeight: _data.typography.fontWeights,
      lineHeight: _data.typography.lineHeights,
    },

    // Spacing System
    spacing: _data.spacing,

    // Layout System
    layout: {
      containerMaxWidth: _data.layout.containerMaxWidth,
      containerPadding: _data.layout.containerPadding,
      sectionPadding: _data.layout.sectionPadding,
      gridGap: _data.layout.gridGap,
      headerHeight: _data.layout.headerHeight,
    },

    // Component Specifications
    components: _data.components,

    // Responsive Breakpoints
    breakpoints: _data.responsive.breakpoints,

    // Animation System
    animations: _data.animations,
  }
}

export const ucrsTheme = createTheme()

/**
 * Utility function to get CSS custom properties
 */
export const getCSSProperties = () => ({
  '--background': ucrsTheme.colors.background,
  '--foreground': ucrsTheme.colors.foreground,
  '--card': ucrsTheme.colors.card,
  '--card-foreground': ucrsTheme.colors['card-foreground'],
  '--popover': ucrsTheme.colors.popover,
  '--popover-foreground': ucrsTheme.colors['popover-foreground'],
  '--primary': ucrsTheme.colors.primary.DEFAULT,
  '--primary-foreground': ucrsTheme.colors.primary.foreground,
  '--secondary': ucrsTheme.colors.secondary.DEFAULT,
  '--secondary-foreground': ucrsTheme.colors.secondary.foreground,
  '--muted': ucrsTheme.colors.muted,
  '--muted-foreground': ucrsTheme.colors['muted-foreground'],
  '--accent': ucrsTheme.colors.accent.green.DEFAULT,
  '--accent-foreground': ucrsTheme.colors.accent.green.foreground,
  '--destructive': ucrsTheme.colors.destructive,
  '--destructive-foreground': ucrsTheme.colors['destructive-foreground'],
  '--border': ucrsTheme.colors.border,
  '--input': ucrsTheme.colors.input,
  '--ring': ucrsTheme.colors.ring,
  '--radius': '0.5rem',
})

/**
 * Get color value by path (e.g., 'primary.500', 'secondary.50')
 */
export const getColor = (path: string) => {
  const keys = path.split('.')
  let current: any = ucrsTheme.colors

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return null
    }
  }

  return current
}

/**
 * Get typography value by path (e.g., 'fontSize.xl', 'fontWeight.bold')
 */
export const getTypography = (path: string) => {
  const keys = path.split('.')
  let current: any = ucrsTheme.typography

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return null
    }
  }

  return current
}

/**
 * Get spacing value by key (e.g., 'md', 'xl')
 */
export const getSpacing = (key: keyof typeof ucrsTheme.spacing) => {
  return ucrsTheme.spacing[key]
}

export default ucrsTheme