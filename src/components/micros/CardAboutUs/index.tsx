import * as React from 'react'
import * as S from './style'
import type { ReactNode } from 'react'

interface CardAboutUsProps {
   icon: string
   textComponent?: ReactNode
}

const CardAboutUs: React.FC<CardAboutUsProps> = ({ icon, textComponent }) => (
   <S.Card>
      <S.Icon>
         <img src={icon} alt="" aria-hidden="true" />
      </S.Icon>
      <S.TextContainer>{textComponent}</S.TextContainer>
   </S.Card>
)

export default CardAboutUs