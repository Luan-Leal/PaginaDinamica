import styled from 'styled-components'

export const BannerContainer = styled.section<{ $bannerImage?: string }>`
   justify-content: flex-end !important;
   min-height: 800px;
   background-image: ${({ $bannerImage }) =>
      $bannerImage ? `url("${$bannerImage}")` : 'none'};
   background-size: cover;
   background-position: center center;
   position: relative;
   padding: 80px;
`

export const BannerContent = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 24px;
`

export const TextContent = styled.div`
   display: flex;
   flex-direction: column;
   max-width: 450px;
`

export const ButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
`

export const Buttons = styled.div`
   display: flex;
   gap: 16px;
`
