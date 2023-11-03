// CustomText.tsx
import * as React from 'react'
import * as S from './style'

interface TextProps {
   index: number
   text: string
   as: 'p' | 'h1'
   color?: string
   fontSize?: string
}

const CustomText: React.FC<TextProps> = (
   { index, text, as, color, fontSize },
) => {
   const style: React.CSSProperties = {}

   if (fontSize) {
      style.fontSize = fontSize
   }

   switch (as) {
      case 'p':
         return (
            <S.TextComponent key={index} color={color} style={style}>
               {text}
            </S.TextComponent>
         )
      case 'h1':
         return (
            <S.TitleComponent key={index} color={color} style={style}>
               {text}
            </S.TitleComponent>
         )
      default:
         return null
   }
}

export default CustomText
