import styled from 'styled-components'
import headerButtonIcon from './icons/header-button.svg'
import arrowIcon from './icons/arrow.svg'

type ButtonVariant = 'primary' | 'outline' | 'text'
type IconPosition = 'left' | 'right'

const buttonStyles = `
   display: inline-flex;
   align-items: center;
   gap: 8px;
   text-decoration: none;
   font-weight: 400;
   font-size: 16px;
   cursor: pointer;
   padding: 12px 24px;
   border-radius: 16px;
   transition: background-color 0.3s, color 0.3s, border-color 0.3s;
   text-transform: uppercase;
`

const variantStyles = (variant: ButtonVariant) =>
   variant === 'text'
      ? `
         padding: 0;
         border: 0;
         border-radius: 0;
         color: var(--color-wood);
         background: transparent;
         font-size: 14px;
         font-weight: 500;
         letter-spacing: 0.04em;

         &:hover {
            color: var(--color-wood-light);
         }
      `
      : variant === 'outline'
        ? `
         color: var(--color-cream-light);
         background-color: transparent;
         border: 2px solid var(--color-sand);

         &:hover {
            color: var(--color-forest);
            background-color: var(--color-sand);
         }
        `
        : `
         color: var(--color-cream-light);
         background-color: var(--color-olive);
         border: 2px solid var(--color-olive);

         &:hover {
            background-color: var(--color-olive-light);
            border-color: var(--color-olive-light);
         }
        `

type StyledButtonProps = {
   $variant: ButtonVariant
   $iconPosition: IconPosition
}

export const Anchor = styled.a<StyledButtonProps>`
   ${buttonStyles}
   ${({ $variant }) => variantStyles($variant)}

   &::before {
      display: ${({ $variant }) => ($variant === 'text' ? 'none' : 'block')};
      content: '';
      width: 18px;
      height: 18px;
      flex: none;
      background-color: currentColor;
      mask: url(${headerButtonIcon}) center / contain no-repeat;
   }
`

export const Button = styled.button<StyledButtonProps>`
   ${buttonStyles}
   ${({ $variant }) => variantStyles($variant)}
`

export const ArrowIcon = styled.span<{ $position: IconPosition }>`
   display: inline-block;
   width: 18px;
   height: 18px;
   flex: none;
   background-color: currentColor;
   mask: url(${arrowIcon}) center / contain no-repeat;
   transform: ${({ $position }) =>
      $position === 'left' ? 'rotate(180deg)' : 'none'};
   transition: transform 0.2s ease;
`

export const Label = styled.span<{ $position: IconPosition }>`
   order: ${({ $position }) => ($position === 'left' ? 1 : 0)};
`