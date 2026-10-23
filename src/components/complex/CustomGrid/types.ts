import type { CSSProperties } from 'react'

export type GridDirection =
   | 'row'
   | 'row-reverse'
   | 'column'
   | 'column-reverse'

type ResponsiveCssValue<T extends string> =
   | T
   | `${T}|${T}`

export interface GridTextField {
   typeField: 'title' | 'text'
   tag?: string
   text: string
   color?: string
   fontSize?: string
   fontFamily?: string
   fontWeight?: CSSProperties['fontWeight']
   lineHeight?: string
   marginBottom?: string
}

export interface GridCell {
   typeField?: string
   title?: string | false
   logo?: string
   alt?: string
   TextComponent?: GridTextField[]
   components?: GridCell[]
   columns?: GridCell[]
   gap?: CSSProperties['gap']
   rowGap?: CSSProperties['rowGap']
   columnGap?: CSSProperties['columnGap']
   direction?: GridDirection
   alignItems?: ResponsiveCssValue<NonNullable<CSSProperties['alignItems']>>
   justifyContent?: ResponsiveCssValue<
      NonNullable<CSSProperties['justifyContent']>
   >
   textAlign?: CSSProperties['textAlign']
   backgroundColor?: string
   backgroundImage?: string
   padding?: CSSProperties['padding']
}

export interface CustomGridProps {
   id?: string
   columns?: GridCell[]
   gap?: CSSProperties['gap']
   rowGap?: CSSProperties['rowGap']
   columnGap?: CSSProperties['columnGap']
   direction?: GridDirection
   alignItems?: ResponsiveCssValue<NonNullable<CSSProperties['alignItems']>>
   justifyContent?: ResponsiveCssValue<
      NonNullable<CSSProperties['justifyContent']>
   >
   textAlign?: CSSProperties['textAlign']
   backgroundColor?: string
   backgroundImage?: string
   padding?: CSSProperties['padding']
   className?: string
}
