import styled from 'styled-components'
import headerButtonIcon from './icons/header-button.svg'

type ButtonVariant = 'primary' | 'outline'

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
   variant === 'outline'
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

type StyledButtonProps = { $variant: ButtonVariant }

export const Anchor = styled.a<StyledButtonProps>`
   ${buttonStyles}
   ${({ $variant }) => variantStyles($variant)}

   &::before {
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