import styled from 'styled-components'

export const BannerContainer = styled.section<{
   $bannerImage?: string
   $justifyContent?: React.CSSProperties['justifyContent']
   $alignItems?: React.CSSProperties['alignItems']
}>`
   justify-content: ${({ $justifyContent }) =>
      $justifyContent ?? 'flex-end'} !important;
   align-items: ${({ $alignItems }) => $alignItems ?? 'center'} !important;
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

export const BannerContent = styled.div<{
   $contentAlignItems?: React.CSSProperties['alignItems']
}>`
   display: flex;
   width: 100%;
   max-width: 1696px;
   flex-direction: column;
   justify-content: space-between;
   align-items: ${({ $contentAlignItems }) =>
      $contentAlignItems ?? 'stretch'};
   gap: 24px;
`

export const TextContent = styled.div<{
   $textAlign?: React.CSSProperties['textAlign']
}>`
   display: flex;
   flex-direction: column;
   max-width: 450px;
   text-align: ${({ $textAlign }) => $textAlign ?? 'left'};
`

export const ButtonContainer = styled.div<{
   $contentAlignItems?: React.CSSProperties['alignItems']
}>`
   display: flex;
   width: 100%;
   gap: 16px;
   justify-content: ${({ $contentAlignItems }) =>
      $contentAlignItems === 'center'
         ? 'center'
         : $contentAlignItems === 'flex-end'
           ? 'flex-end'
           : 'flex-start'};
`

export const Buttons = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   @media (min-width: 767px) {
      flex-direction: row;
   }
`
