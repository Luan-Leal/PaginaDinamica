import styled, { css } from 'styled-components'

export const CardMenuContainer = styled.div<{ $hoverEnabled: boolean }>`
   position: relative;
   display: flex;
   flex-direction: column;
   width: 25%;
   height: 400px;
   border: 1px solid var(--color-border);
   border-radius: 16px;
   background-color: var(--color-cream);
   overflow: hidden;

   ${({ $hoverEnabled }) =>
      $hoverEnabled &&
      css`
         @media (min-width: 769px) {
            &:hover ${CardMenuImage} {
               flex-basis: 100%;
            }

            &:hover ${CardMenuContent} {
               max-height: 0;
               padding-block: 0;
               opacity: 0;
            }
         }
      `}
`

export const CardMenuImage = styled.div<{
   image: string
   $imageOnly: boolean
}>`
   width: 100%;
   height: 250px;
   flex: 0 0 ${({ $imageOnly }) => ($imageOnly ? '100%' : '250px')};
   border-radius: 16px 16px 0 0;
   background-image: url(${(props) => props.image});
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   transition: flex-basis 300ms ease;

   @media (prefers-reduced-motion: reduce) {
      transition: none;
   }
`

export const CardMenuContent = styled.div`
   max-height: 150px;
   padding: 1rem;
   overflow: hidden;
   opacity: 1;
   transition:
      max-height 300ms ease,
      padding 300ms ease,
      opacity 200ms ease;

   @media (prefers-reduced-motion: reduce) {
      transition: none;
   }
`

export const CardMenuTitle = styled.h3`
   font-size: 1.5rem;
   margin: 0.5rem 0;
`

export const CardMenuText = styled.p`
   font-size: 1rem;
   margin: 0.5rem 0;
`
