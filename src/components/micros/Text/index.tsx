import * as React from 'react'
import * as S from './style'
import type { TextTag } from './tags'

interface TextProps {
   text: string
   as?: TextTag
   color?: string
   fontSize?: string
   fontFamily?: string
   fontWeight?: React.CSSProperties['fontWeight']
   lineHeight?: string
   marginBottom?: React.CSSProperties['marginBottom']
}

const CustomText: React.FC<TextProps> = ({
   text,
   as = 'p',
   color,
   fontSize,
   fontFamily,
   fontWeight,
   lineHeight,
   marginBottom,
}) => {
   // Valores vindos do JSON entram por style inline: o React aplica cada
   // propriedade separadamente, então um valor malformado não consegue
   // injetar outras declarações CSS. Propriedades undefined são ignoradas.
   const style: React.CSSProperties = {
      color,
      fontSize,
      fontFamily,
      fontWeight,
      lineHeight,
      marginBottom,
   }

   return (
      <S.Text as={as} style={style}>
         {text}
      </S.Text>
   )
}

export default CustomText
