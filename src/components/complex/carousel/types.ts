import type { ReactNode } from 'react'

export interface CarouselItem {
   image: string
   title?: string | null
   description?: string | null
   hover?: boolean
}

export interface CarouselProps {
   id?: string
   backgroundColor?: string
   dots?: boolean
   dotsOnMobile?: boolean
   infinite?: boolean
   marquee?: boolean
   removeMarqueeOnMobile?: boolean
   removeArrowsOnMobile?: boolean
   marqueeSpeed?: number
   textComponent?: ReactNode
   buttons?: ReactNode
   items: CarouselItem[]
}
