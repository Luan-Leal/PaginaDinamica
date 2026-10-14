import type { ReactNode } from 'react'

export interface CarouselItem {
   image: string
   title: string
   description: string
}

export interface CarouselProps {
   id?: string
   dots?: boolean
   infinite?: boolean
   textComponent?: ReactNode
   buttons?: ReactNode
   items: CarouselItem[]
}
