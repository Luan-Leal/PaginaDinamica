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
         iconPosition = 'right',
         ...buttonProps
      } = props

      return (
         <S.Button
            $variant={variant ?? 'primary'}
            $iconPosition={iconPosition}
            type={type}
            {...buttonProps}
         >
            {variant === 'text' && iconPosition === 'left' && (
               <S.ArrowIcon $position={iconPosition} aria-hidden="true" />
            )}
            <S.Label $position={iconPosition}>{label}</S.Label>
            {variant === 'text' && iconPosition === 'right' && (
               <S.ArrowIcon $position={iconPosition} aria-hidden="true" />
            )}
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
      iconPosition = 'right',
      ...anchorProps
   } = props

   return (
      <S.Anchor
         $variant={variant ?? 'primary'}
         $iconPosition={iconPosition}
         href={link}
         target={target ? '_blank' : '_self'}
         rel={target ? 'noopener noreferrer' : rel}
         {...anchorProps}
      >
         {variant === 'text' && iconPosition === 'left' && (
            <S.ArrowIcon $position={iconPosition} aria-hidden="true" />
         )}
         <S.Label $position={iconPosition}>{label}</S.Label>
         {variant === 'text' && iconPosition === 'right' && (
            <S.ArrowIcon $position={iconPosition} aria-hidden="true" />
         )}
      </S.Anchor>
   )
}

export default Button