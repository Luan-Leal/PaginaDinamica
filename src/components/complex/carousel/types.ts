import type { ReactNode } from 'react'

export interface CarouselItem {
   image: string
   title: string
   description: string
}

export interface CarouselProps {
   id?: string
   backgroundColor?: string
   dots?: boolean
   infinite?: boolean
   marquee?: boolean
   removeMarqueeOnMobile?: boolean
   marqueeSpeed?: number
   textComponent?: ReactNode
   buttons?: ReactNode
   items: CarouselItem[]
}
