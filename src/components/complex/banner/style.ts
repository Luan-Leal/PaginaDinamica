import styled from 'styled-components'

export const BannerContainer = styled.section`
   justify-content: flex-end !important;
   min-height: 800px;
   background-image: url(https://placehold.co/1920x1080/000000/4B3524);
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
