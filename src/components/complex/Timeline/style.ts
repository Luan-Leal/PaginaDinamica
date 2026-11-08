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
   display: grid;
   width: 100%;
   max-width: 1696px;
   grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.5fr);
   gap: 80px;

   @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 36px;
   }
`

export const Intro = styled.div`
   h2 {
      color: inherit;
      font-size: clamp(2rem, 4vw, 3.5rem);
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

export const List = styled.div`
   border-top: 1px solid rgb(244 247 250 / 20%);
`

export const Entry = styled.article`
   display: grid;
   grid-template-columns: 80px 48px minmax(0, 1fr);
   gap: 20px;
   padding: 24px 0;
   border-bottom: 1px solid rgb(244 247 250 / 20%);

   h3 {
      color: inherit;
      font-size: 1.2rem;
      margin-bottom: 8px;
   }

   p {
      max-width: 560px;
      color: rgb(244 247 250 / 70%);
   }

   @media (max-width: 480px) {
      grid-template-columns: 58px 34px minmax(0, 1fr);
      gap: 12px;
   }
`

export const Year = styled.span<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#69D5C2'};
   font-weight: 700;
`

export const Marker = styled.span<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#69D5C2'};
   font-size: 0.8rem;
   opacity: 0.75;
`
