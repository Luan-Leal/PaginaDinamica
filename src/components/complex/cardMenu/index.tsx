import React from 'react';
import * as S from './style'
import { CardMenuProps } from './types';

const CardMenu = ({
   title,
   text,
   image,
   className,
   'aria-hidden': ariaHidden,
}: CardMenuProps) => {
    return (
       <S.CardMenuContainer className={className} aria-hidden={ariaHidden}>
          <S.CardMenuImage image={image} />
          <S.CardMenuContent>
             <S.CardMenuTitle>{title}</S.CardMenuTitle>
             <S.CardMenuText>{text}</S.CardMenuText>
          </S.CardMenuContent>
       </S.CardMenuContainer>
    )
}


export default CardMenu;