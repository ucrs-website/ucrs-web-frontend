import { ucrsTheme } from './theme-config'

/**
 * UCRS Theme Utilities
 * Provides easy access to design tokens and utility functions for the UCRS theme system
 */

/**
 * Get a color value from the theme
 * @param path - Path to the color (e.g., 'primary.500', 'secondary.50')
 * @param mode - Color mode ('light' or 'dark')
 * @returns HSL color value or null if not found
 */
export const getThemeColor = (path: string, mode: 'light' | 'dark' = 'light'): string | null => {
  const keys = path.split('.')
  let current: any = ucrsTheme.colors[mode]

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return null
    }
  }

  return typeof current === 'string' ? current : null
}

/**
 * Get a typography value from the theme
 * @param path - Path to the typography value (e.g., 'fontSize.xl', 'fontWeight.bold')
 * @returns Typography value or null if not found
 */
export const getThemeTypography = (path: string): string | null => {
  const keys = path.split('.')
  let current: any = ucrsTheme.typography

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return null
    }
  }

  return typeof current === 'string' ? current : null
}

/**
 * Get a spacing value from the theme
 * @param key - Spacing key (e.g., 'md', 'xl')
 * @returns Spacing value or null if not found
 */
export const getThemeSpacing = (key: keyof typeof ucrsTheme.spacing): string | null => {
  return ucrsTheme.spacing[key] || null
}

/**
 * Get a layout value from the theme
 * @param key - Layout key (e.g., 'containerMaxWidth', 'headerHeight')
 * @returns Layout value or null if not found
 */
export const getThemeLayout = (key: keyof typeof ucrsTheme.layout): string | null => {
  return ucrsTheme.layout[key] || null
}

/**
 * Get component specifications from the theme
 * @param component - Component name (e.g., 'buttons', 'cards')
 * @param variant - Component variant (e.g., 'primary', 'default')
 * @returns Component specifications or null if not found
 */
export const getThemeComponent = (component: string, variant: string = 'default'): any => {
  const componentData = (ucrsTheme.components as any)[component]
  return componentData ? componentData[variant] || componentData.default || null : null
}

/**
 * Generate CSS custom properties for light mode
 */
export const generateLightModeCSS = () => {
  return {
    ':root': {
      // Base colors
      '--background': ucrsTheme.colors.light.background,
      '--foreground': ucrsTheme.colors.light.foreground,
      '--card': ucrsTheme.colors.light.card,
      '--card-foreground': ucrsTheme.colors.light['card-foreground'],
      '--popover': ucrsTheme.colors.light.popover,
      '--popover-foreground': ucrsTheme.colors.light['popover-foreground'],

      // Primary colors
      '--primary': ucrsTheme.colors.light.primary.DEFAULT,
      '--primary-foreground': ucrsTheme.colors.light.primary.foreground,
      '--primary-hover': ucrsTheme.colors.light.primary.hover || ucrsTheme.colors.light.primary[600],

      // Secondary colors
      '--secondary': ucrsTheme.colors.light.secondary.DEFAULT,
      '--secondary-foreground': ucrsTheme.colors.light.secondary.foreground,

      // UI state colors
      '--muted': ucrsTheme.colors.light.muted,
      '--muted-foreground': ucrsTheme.colors.light['muted-foreground'],
      '--accent': ucrsTheme.colors.light.accent.green.DEFAULT,
      '--accent-foreground': ucrsTheme.colors.light.accent.green.foreground,
      '--accent-orange': ucrsTheme.colors.light.accent.orange.DEFAULT,
      '--accent-orange-foreground': ucrsTheme.colors.light.accent.orange.foreground,

      // Interactive elements
      '--destructive': ucrsTheme.colors.light.destructive,
      '--destructive-foreground': ucrsTheme.colors.light['destructive-foreground'],
      '--border': ucrsTheme.colors.light.border,
      '--input': ucrsTheme.colors.light.input,
      '--ring': ucrsTheme.colors.light.ring,

      // Extended color scales
      '--primary-50': ucrsTheme.colors.light.primary[50],
      '--primary-100': ucrsTheme.colors.light.primary[100],
      '--primary-200': ucrsTheme.colors.light.primary[200],
      '--primary-300': ucrsTheme.colors.light.primary[300],
      '--primary-400': ucrsTheme.colors.light.primary[400],
      '--primary-500': ucrsTheme.colors.light.primary[500],
      '--primary-600': ucrsTheme.colors.light.primary[600],
      '--primary-700': ucrsTheme.colors.light.primary[700],
      '--primary-800': ucrsTheme.colors.light.primary[800],
      '--primary-900': ucrsTheme.colors.light.primary[900],

      '--secondary-50': ucrsTheme.colors.light.secondary[50],
      '--secondary-100': ucrsTheme.colors.light.secondary[100],
      '--secondary-200': ucrsTheme.colors.light.secondary[200],
      '--secondary-300': ucrsTheme.colors.light.secondary[300],
      '--secondary-400': ucrsTheme.colors.light.secondary[400],
      '--secondary-500': ucrsTheme.colors.light.secondary[500],
      '--secondary-600': ucrsTheme.colors.light.secondary[600],
      '--secondary-700': ucrsTheme.colors.light.secondary[700],
      '--secondary-800': ucrsTheme.colors.light.secondary[800],
      '--secondary-900': ucrsTheme.colors.light.secondary[900],

      // Typography
      '--font-primary': ucrsTheme.typography.fontFamily.primary,
      '--font-heading': ucrsTheme.typography.fontFamily.heading,
      '--font-mono': ucrsTheme.typography.fontFamily.mono,

      // Font sizes
      '--font-size-xs': ucrsTheme.typography.fontSize.xs,
      '--font-size-sm': ucrsTheme.typography.fontSize.sm,
      '--font-size-base': ucrsTheme.typography.fontSize.base,
      '--font-size-lg': ucrsTheme.typography.fontSize.lg,
      '--font-size-xl': ucrsTheme.typography.fontSize.xl,
      '--font-size-2xl': ucrsTheme.typography.fontSize['2xl'],
      '--font-size-3xl': ucrsTheme.typography.fontSize['3xl'],
      '--font-size-4xl': ucrsTheme.typography.fontSize['4xl'],
      '--font-size-5xl': ucrsTheme.typography.fontSize['5xl'],
      '--font-size-6xl': ucrsTheme.typography.fontSize['6xl'],
      '--font-size-7xl': ucrsTheme.typography.fontSize['7xl'],

      // Font weights
      '--font-weight-normal': ucrsTheme.typography.fontWeight.normal,
      '--font-weight-medium': ucrsTheme.typography.fontWeight.medium,
      '--font-weight-semibold': ucrsTheme.typography.fontWeight.semibold,
      '--font-weight-bold': ucrsTheme.typography.fontWeight.bold,
      '--font-weight-extrabold': ucrsTheme.typography.fontWeight.extrabold,

      // Line heights
      '--line-height-tight': ucrsTheme.typography.lineHeight.tight,
      '--line-height-snug': ucrsTheme.typography.lineHeight.snug,
      '--line-height-normal': ucrsTheme.typography.lineHeight.normal,
      '--line-height-relaxed': ucrsTheme.typography.lineHeight.relaxed,
      '--line-height-loose': ucrsTheme.typography.lineHeight.loose,

      // Spacing
      '--spacing-xs': ucrsTheme.spacing.xs,
      '--spacing-sm': ucrsTheme.spacing.sm,
      '--spacing-md': ucrsTheme.spacing.md,
      '--spacing-lg': ucrsTheme.spacing.lg,
      '--spacing-xl': ucrsTheme.spacing.xl,
      '--spacing-2xl': ucrsTheme.spacing['2xl'],
      '--spacing-3xl': ucrsTheme.spacing['3xl'],
      '--spacing-4xl': ucrsTheme.spacing['4xl'],
      '--spacing-5xl': ucrsTheme.spacing['5xl'],
      '--spacing-6xl': ucrsTheme.spacing['6xl'],

      // Layout
      '--container-max-width': ucrsTheme.layout.containerMaxWidth,
      '--container-padding': ucrsTheme.layout.containerPadding,

      // Breakpoints
      '--breakpoint-sm': ucrsTheme.breakpoints.sm,
      '--breakpoint-md': ucrsTheme.breakpoints.md,
      '--breakpoint-lg': ucrsTheme.breakpoints.lg,
      '--breakpoint-xl': ucrsTheme.breakpoints.xl,
      '--breakpoint-2xl': ucrsTheme.breakpoints['2xl'],

      // Animation
      '--animation-duration-fast': ucrsTheme.animations.duration.fast,
      '--animation-duration-normal': ucrsTheme.animations.duration.normal,
      '--animation-duration-slow': ucrsTheme.animations.duration.slow,
      '--animation-easing-default': ucrsTheme.animations.easing.default,
      '--animation-easing-in': ucrsTheme.animations.easing.in,
      '--animation-easing-out': ucrsTheme.animations.easing.out,
      '--animation-easing-in-out': ucrsTheme.animations.easing.inOut,

      // Border radius
      '--radius': '0.375rem',
    }
  }
}

/**
 * Generate CSS custom properties for dark mode
 */
export const generateDarkModeCSS = () => {
  return {
    '.dark': {
      // Base colors
      '--background': ucrsTheme.colors.dark.background,
      '--foreground': ucrsTheme.colors.dark.foreground,
      '--card': ucrsTheme.colors.dark.card,
      '--card-foreground': ucrsTheme.colors.dark['card-foreground'],
      '--popover': ucrsTheme.colors.dark.popover,
      '--popover-foreground': ucrsTheme.colors.dark['popover-foreground'],

      // Primary colors (same as light mode for brand consistency)
      '--primary': ucrsTheme.colors.dark.primary,
      '--primary-foreground': ucrsTheme.colors.dark['primary-foreground'],
      '--primary-hover': ucrsTheme.colors.dark.primary,

      // Secondary colors (same as light mode for brand consistency)
      '--secondary': ucrsTheme.colors.dark.secondary,
      '--secondary-foreground': ucrsTheme.colors.dark['secondary-foreground'],

      // UI state colors
      '--muted': ucrsTheme.colors.dark.muted,
      '--muted-foreground': ucrsTheme.colors.dark['muted-foreground'],
      '--accent': ucrsTheme.colors.dark.accent,
      '--accent-foreground': ucrsTheme.colors.dark['accent-foreground'],

      // Interactive elements
      '--destructive': ucrsTheme.colors.dark.destructive,
      '--destructive-foreground': ucrsTheme.colors.dark['destructive-foreground'],
      '--border': ucrsTheme.colors.dark.border,
      '--input': ucrsTheme.colors.dark.input,
      '--ring': ucrsTheme.colors.dark.ring,

      // Extended color scales (same as light mode for consistency)
      '--primary-50': ucrsTheme.colors.light.primary[50],
      '--primary-100': ucrsTheme.colors.light.primary[100],
      '--primary-200': ucrsTheme.colors.light.primary[200],
      '--primary-300': ucrsTheme.colors.light.primary[300],
      '--primary-400': ucrsTheme.colors.light.primary[400],
      '--primary-500': ucrsTheme.colors.light.primary[500],
      '--primary-600': ucrsTheme.colors.light.primary[600],
      '--primary-700': ucrsTheme.colors.light.primary[700],
      '--primary-800': ucrsTheme.colors.light.primary[800],
      '--primary-900': ucrsTheme.colors.light.primary[900],

      '--secondary-50': ucrsTheme.colors.light.secondary[50],
      '--secondary-100': ucrsTheme.colors.light.secondary[100],
      '--secondary-200': ucrsTheme.colors.light.secondary[200],
      '--secondary-300': ucrsTheme.colors.light.secondary[300],
      '--secondary-400': ucrsTheme.colors.light.secondary[400],
      '--secondary-500': ucrsTheme.colors.light.secondary[500],
      '--secondary-600': ucrsTheme.colors.light.secondary[600],
      '--secondary-700': ucrsTheme.colors.light.secondary[700],
      '--secondary-800': ucrsTheme.colors.light.secondary[800],
      '--secondary-900': ucrsTheme.colors.light.secondary[900],

      // Typography (same as light mode)
      '--font-primary': ucrsTheme.typography.fontFamily.primary,
      '--font-heading': ucrsTheme.typography.fontFamily.heading,
      '--font-mono': ucrsTheme.typography.fontFamily.mono,

      // Font sizes (same as light mode)
      '--font-size-xs': ucrsTheme.typography.fontSize.xs,
      '--font-size-sm': ucrsTheme.typography.fontSize.sm,
      '--font-size-base': ucrsTheme.typography.fontSize.base,
      '--font-size-lg': ucrsTheme.typography.fontSize.lg,
      '--font-size-xl': ucrsTheme.typography.fontSize.xl,
      '--font-size-2xl': ucrsTheme.typography.fontSize['2xl'],
      '--font-size-3xl': ucrsTheme.typography.fontSize['3xl'],
      '--font-size-4xl': ucrsTheme.typography.fontSize['4xl'],
      '--font-size-5xl': ucrsTheme.typography.fontSize['5xl'],
      '--font-size-6xl': ucrsTheme.typography.fontSize['6xl'],
      '--font-size-7xl': ucrsTheme.typography.fontSize['7xl'],

      // Font weights (same as light mode)
      '--font-weight-normal': ucrsTheme.typography.fontWeight.normal,
      '--font-weight-medium': ucrsTheme.typography.fontWeight.medium,
      '--font-weight-semibold': ucrsTheme.typography.fontWeight.semibold,
      '--font-weight-bold': ucrsTheme.typography.fontWeight.bold,
      '--font-weight-extrabold': ucrsTheme.typography.fontWeight.extrabold,

      // Line heights (same as light mode)
      '--line-height-tight': ucrsTheme.typography.lineHeight.tight,
      '--line-height-snug': ucrsTheme.typography.lineHeight.snug,
      '--line-height-normal': ucrsTheme.typography.lineHeight.normal,
      '--line-height-relaxed': ucrsTheme.typography.lineHeight.relaxed,
      '--line-height-loose': ucrsTheme.typography.lineHeight.loose,

      // Spacing (same as light mode)
      '--spacing-xs': ucrsTheme.spacing.xs,
      '--spacing-sm': ucrsTheme.spacing.sm,
      '--spacing-md': ucrsTheme.spacing.md,
      '--spacing-lg': ucrsTheme.spacing.lg,
      '--spacing-xl': ucrsTheme.spacing.xl,
      '--spacing-2xl': ucrsTheme.spacing['2xl'],
      '--spacing-3xl': ucrsTheme.spacing['3xl'],
      '--spacing-4xl': ucrsTheme.spacing['4xl'],
      '--spacing-5xl': ucrsTheme.spacing['5xl'],
      '--spacing-6xl': ucrsTheme.spacing['6xl'],

      // Layout (same as light mode)
      '--container-max-width': ucrsTheme.layout.containerMaxWidth,
      '--container-padding': ucrsTheme.layout.containerPadding,

      // Breakpoints (same as light mode)
      '--breakpoint-sm': ucrsTheme.breakpoints.sm,
      '--breakpoint-md': ucrsTheme.breakpoints.md,
      '--breakpoint-lg': ucrsTheme.breakpoints.lg,
      '--breakpoint-xl': ucrsTheme.breakpoints.xl,
      '--breakpoint-2xl': ucrsTheme.breakpoints['2xl'],

      // Animation (same as light mode)
      '--animation-duration-fast': ucrsTheme.animations.duration.fast,
      '--animation-duration-normal': ucrsTheme.animations.duration.normal,
      '--animation-duration-slow': ucrsTheme.animations.duration.slow,
      '--animation-easing-default': ucrsTheme.animations.easing.default,
      '--animation-easing-in': ucrsTheme.animations.easing.in,
      '--animation-easing-out': ucrsTheme.animations.easing.out,
      '--animation-easing-in-out': ucrsTheme.animations.easing.inOut,

      // Border radius (same as light mode)
      '--radius': '0.375rem',
    }
  }
}

/**
 * Create a complete theme CSS object
 */
export const createThemeCSS = () => {
  return {
    ...generateLightModeCSS(),
    ...generateDarkModeCSS()
  }
}

/**
 * Helper function to get button styles based on variant
 */
export const getButtonStyles = (variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const buttonSpecs = getThemeComponent('buttons', variant)
  if (!buttonSpecs) return {}

  return {
    backgroundColor: buttonSpecs.backgroundColor,
    color: buttonSpecs.color,
    padding: buttonSpecs.padding,
    borderRadius: buttonSpecs.borderRadius,
    fontSize: buttonSpecs.fontSize,
    fontWeight: buttonSpecs.fontWeight,
    border: buttonSpecs.border,
    cursor: buttonSpecs.cursor,
    transition: buttonSpecs.transition,
    '&:hover': buttonSpecs.hover || {}
  }
}

/**
 * Helper function to get card styles based on variant
 */
export const getCardStyles = (variant: 'default' | 'testimonial' = 'default') => {
  const cardSpecs = getThemeComponent('cards', variant)
  if (!cardSpecs) return {}

  return {
    backgroundColor: cardSpecs.backgroundColor,
    borderRadius: cardSpecs.borderRadius,
    padding: cardSpecs.padding,
    boxShadow: cardSpecs.boxShadow,
    border: cardSpecs.border,
    transition: cardSpecs.transition,
    '&:hover': cardSpecs.hover || {}
  }
}

/**
 * Helper function to get input styles
 */
export const getInputStyles = () => {
  const inputSpecs = getThemeComponent('forms', 'input')
  if (!inputSpecs) return {}

  return {
    padding: inputSpecs.padding,
    borderRadius: inputSpecs.borderRadius,
    border: inputSpecs.border,
    fontSize: inputSpecs.fontSize,
    transition: inputSpecs.transition,
    '&:focus': inputSpecs.focus || {}
  }
}

/**
 * Get the current color mode based on system preference or stored preference
 */
export const getCurrentColorMode = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

/**
 * Apply theme to document root
 */
export const applyTheme = (mode: 'light' | 'dark' = getCurrentColorMode()) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    const cssVariables = mode === 'light' ? generateLightModeCSS()[':root'] : generateDarkModeCSS()['.dark']

    if (cssVariables) {
      Object.entries(cssVariables).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
    }

    // Add/remove dark class
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }
}

export default {
  getThemeColor,
  getThemeTypography,
  getThemeSpacing,
  getThemeLayout,
  getThemeComponent,
  generateLightModeCSS,
  generateDarkModeCSS,
  createThemeCSS,
  getButtonStyles,
  getCardStyles,
  getInputStyles,
  getCurrentColorMode,
  applyTheme
}