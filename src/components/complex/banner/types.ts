import type { ReactNode } from 'react'
import type { CSSProperties } from 'react'

export type BannerProps = {
   id?: string
   bannerImage?: string
   title?: string
   text?: string
   justifyContent?: CSSProperties['justifyContent']
   alignItems?: CSSProperties['alignItems']
   textAlign?: CSSProperties['textAlign']
   textComponent?: ReactNode
   buttons?: ReactNode
}
