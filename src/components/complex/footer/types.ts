import type { BodyTag, HeadingTag } from '../../micros/Text/tags'

export interface FooterTextField {
   typeField: 'title' | 'text'
   tag?: HeadingTag | BodyTag
   text: string
   color?: string
   fontSize?: string
   fontFamily?: string
   fontWeight?: React.CSSProperties['fontWeight']
   lineHeight?: string
   marginBottom?: string
}

export interface FooterOption {
   label: string
   link: string
}

export interface FooterTextOption {
   TextComponent: FooterTextField[]
}

export interface FooterSocialMedia {
   icon: string
   link: string
}

export interface FooterColumn {
   title?: string | false
   logo?: string
   description?: string
   socialMedia?: FooterSocialMedia[]
   options?: (FooterOption | FooterTextOption)[]
   fontColor?: string
   fontFamily?: string
   fontFamly?: string
   fontSize?: string
}

export interface FooterProps {
   backgroundColor?: string
   copyright?: string
   columns?: FooterColumn[]
}
