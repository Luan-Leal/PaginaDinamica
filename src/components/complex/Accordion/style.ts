import styled from 'styled-components'

export const AccordionItem = styled.div<{ $accordionColor?: string }>`
   width: 100%;
   overflow: hidden;
   border: 1px solid var(--color-border);
   border-radius: 12px;
   background-color: ${({ $accordionColor }) =>
      $accordionColor ?? 'var(--color-cream-light)'};
`

export const QuestionButton = styled.button`
   display: flex;
   width: 100%;
   min-height: 76px;
   align-items: center;
   justify-content: space-between;
   gap: 20px;
   padding: 20px 24px;
   border: 0;
   background: transparent;
   color: var(--color-text);
   text-align: left;
   cursor: pointer;

   &:focus-visible {
      outline-offset: -4px;
   }
`

export const Question = styled.span`
   font-family: var(--font-heading);
   font-size: 1.125rem;
   font-weight: 600;
   line-height: 1.4;
`

export const Icon = styled.span<{ $expanded: boolean }>`
   position: relative;
   display: block;
   width: 24px;
   height: 24px;
   flex: 0 0 24px;

   img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transition:
         opacity 220ms ease,
         transform 220ms ease;
   }

   img:first-child {
      opacity: ${({ $expanded }) => ($expanded ? 0 : 1)};
      transform: rotate(${({ $expanded }) => ($expanded ? '90deg' : '0')});
   }

   img:last-child {
      opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
      transform: scale(${({ $expanded }) => ($expanded ? 1 : 0.7)});
   }

   @media (prefers-reduced-motion: reduce) {
      img {
         transition: none;
      }
   }
`

export const AnswerPanel = styled.div<{ $expanded: boolean }>`
   display: grid;
   grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};
   transition: grid-template-rows 300ms ease;

   @media (prefers-reduced-motion: reduce) {
      transition: none;
   }
`

export const AnswerClip = styled.div`
   min-height: 0;
   overflow: hidden;
`

export const Answer = styled.p`
   padding: 0 24px 24px;
   color: var(--color-text-muted);
   font-family: var(--font-body);
   font-size: 1rem;
   line-height: 1.7;
`
