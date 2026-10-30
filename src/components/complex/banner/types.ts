import type { ReactNode } from 'react'

export type BannerProps = {
   id?: string
   bannerImage?: string
   title?: string
   text?: string
   textComponent?: ReactNode
   buttons?: ReactNode
}
