import * as React from 'react'
import * as S from './style'
import type { TextTag } from './tags'
import { parseResponsiveValue } from '../../../util/responsiveValue'

interface TextProps {
   text: string
   as?: TextTag
   color?: React.CSSProperties['color']
   fontSize?: React.CSSProperties['fontSize']
   fontFamily?: string
   fontWeight?: React.CSSProperties['fontWeight']
   lineHeight?: React.CSSProperties['lineHeight']
   marginBottom?: React.CSSProperties['marginBottom']
}

type TextStyleWithVariables = React.CSSProperties & {
   [key: `--text-${string}`]: string | undefined
}

const toCssValue = (
   value: string | number | undefined,
   unit = '',
): string | undefined => {
   if (value === undefined) {
      return undefined
   }

   return typeof value === 'number' ? `${value}${unit}` : value
}

const responsiveStyleVariables = (
   property: string,
   value: string | number | undefined,
   numericUnit = '',
): TextStyleWithVariables => {
   const responsiveValue = parseResponsiveValue(value)

   return {
      [`--text-${property}`]: toCssValue(responsiveValue.desktop, numericUnit),
      [`--text-${property}-mobile`]: toCssValue(
         responsiveValue.mobile,
         numericUnit,
      ),
   }
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
   const style: TextStyleWithVariables = {
      ...responsiveStyleVariables('color', color),
      ...responsiveStyleVariables('font-size', fontSize, 'px'),
      ...responsiveStyleVariables('font-family', fontFamily),
      ...responsiveStyleVariables('font-weight', fontWeight),
      ...responsiveStyleVariables('line-height', lineHeight),
      ...responsiveStyleVariables('margin-bottom', marginBottom, 'px'),
   }

   return (
      <S.Text as={as} style={style}>
         {text}
      </S.Text>
   )
}

export default CustomText
