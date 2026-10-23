export interface ResponsiveValue {
   desktop?: string | number
   mobile?: string | number
}

// Values use "desktop|mobile"; without the separator, they apply everywhere.
export function parseResponsiveValue(
   value?: string | number,
): ResponsiveValue {
   if (value === undefined) {
      return {}
   }

   if (typeof value !== 'string') {
      return { desktop: value }
   }

   const separatorIndex = value.indexOf('|')

   if (separatorIndex === -1) {
      return { desktop: value }
   }

   const desktop = value.slice(0, separatorIndex).trim()
   const mobile = value.slice(separatorIndex + 1).trim()

   return {
      desktop: desktop || undefined,
      mobile: mobile || undefined,
   }
}
