import styled from 'styled-components'

export const Section = styled.section<{
   $backgroundColor?: string
   $textColor?: string
   $accentColor?: string
}>`
   width: 100%;
   background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#F4F7FA'};
   color: ${({ $textColor }) => $textColor ?? '#172534'};
`

export const Container = styled.div`
   width: 100%;
   max-width: 1696px;
`

export const Header = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   gap: 48px;
   margin-bottom: 48px;

   h2 {
      color: inherit;
      max-width: 640px;
      font-size: clamp(2rem, 4vw, 3.5rem);
   }

   > p {
      max-width: 440px;
      color: #647382;
   }

   @media (max-width: 768px) {
      align-items: flex-start;
      flex-direction: column;
      gap: 18px;
   }
`

export const Eyebrow = styled.p<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#087F83'};
   font-size: 0.8rem;
   font-weight: 700;
   letter-spacing: 0.14em;
   margin-bottom: 12px;
   text-transform: uppercase;
`

export const Grid = styled.div<{ $itemCount: number }>`
   display: grid;
   grid-template-columns: repeat(
      ${({ $itemCount }) => Math.max(1, Math.min($itemCount, 3))},
      minmax(0, 1fr)
   );
   border-top: 1px solid #D6E0E7;

   @media (max-width: 768px) {
      grid-template-columns: 1fr;
   }
`

export const Card = styled.article<{ $accentColor?: string }>`
   min-height: 240px;
   padding: 28px 32px 24px 0;
   border-right: 1px solid #D6E0E7;

   & + & {
      padding-left: 32px;
   }

   &:last-child {
      border-right: 0;
   }

   h3 {
      margin: 34px 0 12px;
      color: inherit;
      font-size: 1.35rem;
   }

   > p {
      color: #647382;
      max-width: 360px;
   }

   @media (max-width: 768px) {
      min-height: auto;
      padding: 24px 0;
      border-right: 0;
      border-bottom: 1px solid #D6E0E7;

      & + & {
         padding-left: 0;
      }
   }
`

export const Number = styled.span<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#087F83'};
   font-size: 0.8rem;
   font-weight: 700;
   letter-spacing: 0.12em;
`
