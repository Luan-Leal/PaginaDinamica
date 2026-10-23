import React from 'react'
import * as S from './style'
import type { CardMenuProps } from './types'

const hasVisibleText = (value: string | null | undefined): value is string =>
   typeof value === 'string' && value.trim().length > 0

const CardMenu = ({
   title,
   text,
   image,
   hover = false,
   className,
   'aria-hidden': ariaHidden,
}: CardMenuProps) => {
   const showTitle = hasVisibleText(title)
   const showText = hasVisibleText(text)
   const hasContent = showTitle || showText

   return (
      <S.CardMenuContainer
         className={className}
         aria-hidden={ariaHidden}
         $hoverEnabled={hover}
      >
         <S.CardMenuImage image={image} $imageOnly={!hasContent} />
         {hasContent && (
            <S.CardMenuContent>
               {showTitle && <S.CardMenuTitle>{title}</S.CardMenuTitle>}
               {showText && <S.CardMenuText>{text}</S.CardMenuText>}
            </S.CardMenuContent>
         )}
      </S.CardMenuContainer>
   )
}

export default CardMenu
