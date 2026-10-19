import styled from 'styled-components'

export const CarouselSection = styled.section<{ $backgroundColor?: string }>`
   width: 100%;
   padding: 64px;
   background-color: ${({ $backgroundColor }) =>
      $backgroundColor ?? 'var(--color-cream-light)'};
   color: var(--color-text);

   @media (max-width: 768px) {
      padding: 40px 24px;
   }
`

export const CarouselContainer = styled.div`
   width: 100%;
   max-width: 1696px;
   margin-inline: auto;
`

export const CarouselHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 24px;
   margin-bottom: 28px;

   @media (max-width: 600px) {
      align-items: flex-start;
      flex-direction: column;
   }
`

export const TextContent = styled.div`
   display: flex;
   flex-direction: column;
`

export const ButtonContent = styled.div`
   display: flex;
   flex-shrink: 0;
`

export const SliderArea = styled.div`
   position: relative;
   padding-inline: 40px;

   @media (max-width: 600px) {
      padding-inline: 32px;
   }
`

export const Viewport = styled.div`
   overflow: hidden;
`

export const Track = styled.div<{ $marquee: boolean }>`
   display: flex;
   gap: 16px;
   overflow-x: auto;
   scroll-behavior: ${({ $marquee }) => ($marquee ? 'auto' : 'smooth')};
   scroll-snap-type: ${({ $marquee }) =>
      $marquee ? 'none' : 'x mandatory'};
   scrollbar-width: none;

   &::-webkit-scrollbar {
      display: none;
   }

   > div {
      flex: 0 0 calc((100% - 48px) / 4);
      width: calc((100% - 48px) / 4);
      scroll-snap-align: ${({ $marquee }) =>
         $marquee ? 'none' : 'start'};
   }

   @media (max-width: 1024px) {
      > div {
         flex-basis: calc((100% - 16px) / 2);
         width: calc((100% - 16px) / 2);
      }
   }

   @media (max-width: 600px) {
      > div {
         flex-basis: 100%;
         width: 100%;
      }
   }
`

const ArrowButton = styled.button`
   position: absolute;
   z-index: 1;
   top: 50%;
   display: grid;
   width: 40px;
   height: 40px;
   place-items: center;
   border: 1px solid var(--color-border);
   border-radius: 50%;
   background: var(--color-cream-light);
   color: var(--color-forest);
   box-shadow: var(--shadow-soft);
   cursor: pointer;
   transform: translateY(-50%);

   &:hover:not(:disabled) {
      background: var(--color-forest);
      color: var(--color-cream-light);
   }

   &:disabled {
      cursor: default;
      opacity: 0.4;
   }

   &:focus-visible {
      outline: 3px solid var(--color-olive);
      outline-offset: 3px;
   }
`

export const PreviousButton = styled(ArrowButton)`
   left: -8px;
`

export const NextButton = styled(ArrowButton)`
   right: -8px;
`

export const Dots = styled.div`
   display: flex;
   justify-content: center;
   gap: 8px;
   margin-top: 24px;
`

export const Dot = styled.button<{ $active: boolean }>`
   width: 12px;
   height: 12px;
   padding: 0;
   border: 0;
   border-radius: 50%;
   background: ${({ $active }) =>
      $active ? 'var(--color-forest)' : 'var(--color-sand-light)'};
   cursor: pointer;
`
