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
   max-width: 740px;
   margin-bottom: 42px;

   h2 {
      color: inherit;
      font-size: clamp(2rem, 4vw, 3.5rem);
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

export const Grid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   gap: 28px;

   @media (max-width: 768px) {
      grid-template-columns: 1fr;
   }
`

export const Card = styled.article`
   overflow: hidden;
   background: #ffffff;
   border: 1px solid #d6e0e7;
`

export const Image = styled.img`
   width: 100%;
   aspect-ratio: 16 / 8;
   object-fit: cover;
`

export const Content = styled.div`
   padding: 26px 28px 30px;

   h3 {
      color: inherit;
      font-size: 1.5rem;
      margin: 8px 0 12px;
   }

   > p {
      color: #647382;
      max-width: 540px;
   }
`

export const Sector = styled.p<{ $accentColor?: string }>`
   color: ${({ $accentColor }) => $accentColor ?? '#087F83'};
   font-size: 0.75rem;
   font-weight: 700;
   letter-spacing: 0.12em;
   text-transform: uppercase;
`

export const Outcome = styled.p<{ $accentColor?: string }>`
   border-left: 3px solid ${({ $accentColor }) => $accentColor ?? '#087F83'};
   color: #172534;
   font-weight: 600;
   margin-top: 20px;
   padding-left: 14px;
`

export const Link = styled.a<{ $accentColor?: string }>`
   display: inline-flex;
   align-items: center;
   gap: 10px;
   color: ${({ $accentColor }) => $accentColor ?? '#087F83'};
   font-weight: 700;
   margin-top: 22px;

   &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
   }
`
