import { ucrsTheme } from './theme-config'

/**
 * UCRS Theme Utilities
 * Provides easy access to design tokens and utility functions for the UCRS theme system
 */

/**
 * Get a color value from the theme
 * @param path - Path to the color (e.g., 'primary.500', 'secondary.50')
 * @returns HSL color value or null if not found
 */
export const getThemeColor = (path: string): string | null => {
  const keys = path.split('.')
  let current: any = ucrsTheme.colors

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
 * Generate CSS custom properties
 */
export const generateThemeCSS = () => {
  return {
    ':root': {
      // Base colors
      '--background': ucrsTheme.colors.background,
      '--foreground': ucrsTheme.colors.foreground,
      '--card': ucrsTheme.colors.card,
      '--card-foreground': ucrsTheme.colors['card-foreground'],
      '--popover': ucrsTheme.colors.popover,
      '--popover-foreground': ucrsTheme.colors['popover-foreground'],

      // Primary colors
      '--primary': ucrsTheme.colors.primary.DEFAULT,
      '--primary-foreground': ucrsTheme.colors.primary.foreground,
      '--primary-hover': ucrsTheme.colors.primary.hover || ucrsTheme.colors.primary[600],

      // Secondary colors
      '--secondary': ucrsTheme.colors.secondary.DEFAULT,
      '--secondary-foreground': ucrsTheme.colors.secondary.foreground,

      // UI state colors
      '--muted': ucrsTheme.colors.muted,
      '--muted-foreground': ucrsTheme.colors['muted-foreground'],
      '--accent': ucrsTheme.colors.accent.green.DEFAULT,
      '--accent-foreground': ucrsTheme.colors.accent.green.foreground,
      '--accent-orange': ucrsTheme.colors.accent.orange.DEFAULT,
      '--accent-orange-foreground': ucrsTheme.colors.accent.orange.foreground,

      // Interactive elements
      '--destructive': ucrsTheme.colors.destructive,
      '--destructive-foreground': ucrsTheme.colors['destructive-foreground'],
      '--border': ucrsTheme.colors.border,
      '--input': ucrsTheme.colors.input,
      '--ring': ucrsTheme.colors.ring,

      // Extended color scales
      '--primary-50': ucrsTheme.colors.primary[50],
      '--primary-100': ucrsTheme.colors.primary[100],
      '--primary-200': ucrsTheme.colors.primary[200],
      '--primary-300': ucrsTheme.colors.primary[300],
      '--primary-400': ucrsTheme.colors.primary[400],
      '--primary-500': ucrsTheme.colors.primary[500],
      '--primary-600': ucrsTheme.colors.primary[600],
      '--primary-700': ucrsTheme.colors.primary[700],
      '--primary-800': ucrsTheme.colors.primary[800],
      '--primary-900': ucrsTheme.colors.primary[900],

      '--secondary-50': ucrsTheme.colors.secondary[50],
      '--secondary-100': ucrsTheme.colors.secondary[100],
      '--secondary-200': ucrsTheme.colors.secondary[200],
      '--secondary-300': ucrsTheme.colors.secondary[300],
      '--secondary-400': ucrsTheme.colors.secondary[400],
      '--secondary-500': ucrsTheme.colors.secondary[500],
      '--secondary-600': ucrsTheme.colors.secondary[600],
      '--secondary-700': ucrsTheme.colors.secondary[700],
      '--secondary-800': ucrsTheme.colors.secondary[800],
      '--secondary-900': ucrsTheme.colors.secondary[900],

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

export default {
  getThemeColor,
  getThemeTypography,
  getThemeSpacing,
  getThemeLayout,
  getThemeComponent,
  generateThemeCSS,
  getButtonStyles,
  getCardStyles,
  getInputStyles,
}