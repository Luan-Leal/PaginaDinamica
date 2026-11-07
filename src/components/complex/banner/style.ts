import styled from 'styled-components'

export const BannerContainer = styled.section<{ $bannerImage?: string }>`
   justify-content: flex-end !important;
   min-height: 600px;
   background-image: ${({ $bannerImage }) =>
      $bannerImage ? `url("${$bannerImage}")` : 'none'};
   background-size: cover;
   background-position: center center;
   position: relative;

   &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
         90deg,
         rgb(0 0 0 / 55%) 0%,
         rgb(0 0 0 / 34%) 35%,
         rgb(0 0 0 / 14%) 58%,
         transparent 78%
      );
      pointer-events: none;

      @media (max-width: 768px) {
         background: rgb(0 0 0 / 30%);
      }
   }

   > .page-spacing {
      position: relative;
      z-index: 1;
   }

   @media (min-width: 767px) {
      min-height: 800px;
   }
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
   gap: 16px;
`

export const Buttons = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   @media (min-width: 767px) {
      flex-direction: row;
   }
`
