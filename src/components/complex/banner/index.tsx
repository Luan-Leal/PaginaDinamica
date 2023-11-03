import * as React from 'react'
import * as S from './style'
import { BannerProps } from './types'

const Banner = ({ index, title, text }: BannerProps) => {
   return (
      <S.BannerContainer>
         <S.Text key={index}>
            <h1>{title ? title : 'Título do Banner'}</h1>
            <p>{text ? text : 'Texto descritivo ou chamada para ação'}</p>
         </S.Text>
      </S.BannerContainer>
   )
}

export default Banner
