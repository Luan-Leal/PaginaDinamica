import styled from 'styled-components'

export const FooterSection = styled.footer<{ $backgroundColor?: string }>`
   width: 100%;
   padding: 56px 64px 24px;
   background-color: ${({ $backgroundColor }) =>
      $backgroundColor ?? 'var(--color-forest)'};
   color: var(--color-cream-light);

   @media (max-width: 768px) {
      padding: 40px 24px 20px;
   }
`

export const FooterContainer = styled.div`
   width: 100%;
   max-width: 1696px;
   margin-inline: auto;
`

export const Columns = styled.div<{ $columnCount: number }>`
   display: grid;
   grid-template-columns: ${({ $columnCount }) =>
      `repeat(${Math.max(1, $columnCount)}, minmax(0, 1fr))`};
   gap: 40px;

   @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
   }
`

export const Column = styled.div`
   min-width: 0;
`

export const ColumnTitle = styled.h2<{
   $color?: string
   $fontFamily?: string
}>`
   margin-bottom: 24px;
   color: ${({ $color }) => $color ?? 'var(--color-cream-light)'};
   font-family: ${({ $fontFamily }) =>
      $fontFamily ?? 'var(--font-heading)'};
   font-size: 1.125rem;
`

export const Logo = styled.img`
   height: auto;
`

export const Description = styled.p`
   margin-bottom: 20px;
   max-width: 300px;
   color: var(--color-cream-light);
`

export const Options = styled.div`
   display: flex;
   flex-direction: column;
   font-size: 16px;
   gap: 8px;
`

export const OptionLink = styled.a<{ $color?: string }>`
   width: fit-content;
   color: ${({ $color }) => $color ?? 'var(--color-cream-light)'};
   text-decoration: none;
   transition: color 0.2s ease;
   color: var(--color-sand-light);

   &:hover {
      color: var(--color-sand);
      text-decoration: underline;
      text-underline-offset: 3px;
   }
`

export const SocialLinks = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;
   margin-top: 20px;
`

export const SocialLink = styled.a`
   display: inline-flex;
   width: 28px;
   height: 28px;
   align-items: center;
   justify-content: center;
   color: var(--color-sand-light);
   transition: color 0.2s ease, transform 0.2s ease;

   &:hover {
      color: var(--color-cream-light);
      transform: translateY(-2px);
   }

   svg {
      width: 24px;
      height: 24px;
   }
`

export const Copyright = styled.div`
   margin-top: 36px;
   padding-top: 20px;
   border-top: 1px solid rgb(245 240 229 / 20%);
   color: var(--color-sand-light);
   font-size: 0.875rem;
`
