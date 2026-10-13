import React from 'react'
import type { ButtonProps } from './types'
import * as S from './style'

const Button: React.FC<ButtonProps> = (props) => {
   if (props.as === 'button') {
      const {
         as,
         label,
         type = 'button',
         variant,
         ...buttonProps
      } = props

      return (
         <S.Button $variant={variant ?? 'primary'} type={type} {...buttonProps}>
            {label}
         </S.Button>
      )
   }

   const {
      as,
      label,
      link,
      target,
     rel,
      variant,
      ...anchorProps
   } = props

   return (
      <S.Anchor
         $variant={variant ?? 'primary'}
         href={link}
         target={target ? '_blank' : '_self'}
         rel={target ? 'noopener noreferrer' : rel}
         {...anchorProps}
      >
         {label}
      </S.Anchor>
   )
}

export default Button