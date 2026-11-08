import styled from 'styled-components'

export const Section = styled.section<{
   $backgroundColor?: string
   $textColor?: string
   $accentColor?: string
}>`
   width: 100%;
   background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#111D2A'};
   color: ${({ $textColor }) => $textColor ?? '#F4F7FA'};
`

export const Container = styled.div`
   width: 100%;
   max-width: 1696px;
`

export const Heading = styled.div`
   margin-bottom: 36px;

   h2 {
      color: inherit;
      font-size: clamp(1.75rem, 3vw, 2.75rem);
   }
`

export const Eyebrow = styled.p<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#69D5C2'};
   font-size: 0.8rem;
   font-weight: 700;
   letter-spacing: 0.14em;
   margin-bottom: 12px;
   text-transform: uppercase;
`

export const Items = styled.div<{ $itemCount: number }>`
   display: grid;
   grid-template-columns: repeat(
      ${({ $itemCount }) => Math.max(1, Math.min($itemCount, 4))},
      minmax(0, 1fr)
   );

   @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px 20px;
   }
`

export const Item = styled.div`
   padding: 8px 28px;
   border-left: 1px solid rgb(244 247 250 / 24%);

   &:first-child {
      border-left: 0;
      padding-left: 0;
   }

   @media (max-width: 768px) {
      padding: 0 0 0 16px;

      &:nth-child(odd) {
         border-left: 0;
         padding-left: 0;
      }
   }
`

export const Value = styled.p<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#69D5C2'};
   font-size: clamp(2rem, 4vw, 3.75rem);
   font-weight: 600;
   letter-spacing: -0.06em;
   line-height: 1;
   margin-bottom: 12px;
`

export const Label = styled.h3`
   color: inherit;
   font-family: var(--font-body);
   font-size: 1rem;
   font-weight: 600;
`

export const Detail = styled.p`
   color: rgb(244 247 250 / 68%);
   font-size: 0.875rem;
   margin-top: 6px;
`
