import React from 'react'
import type {
   ButtonIcon,
   ButtonIconPosition,
   ButtonProps,
} from './types'
import * as S from './style'

const ButtonContent: React.FC<{
   label: string
   icon?: ButtonIcon
   iconPosition: ButtonIconPosition
}> = ({ label, icon, iconPosition }) => {
   const iconElement = icon ? (
      <S.Icon
         $icon={icon}
         $position={iconPosition}
         aria-hidden="true"
      />
   ) : null

   return (
      <>
         {iconPosition === 'left' && iconElement}
         <S.Label>{label}</S.Label>
         {iconPosition === 'right' && iconElement}
      </>
   )
}

const Button: React.FC<ButtonProps> = (props) => {
   if (props.as === 'button') {
      const {
         as,
         label,
         type = 'button',
         variant,
         icon,
         iconPosition = 'right',
         ...buttonProps
      } = props

      return (
         <S.Button
            $variant={variant ?? 'primary'}
            type={type}
            {...buttonProps}
         >
            <ButtonContent
               label={label}
               icon={icon}
               iconPosition={iconPosition}
            />
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
      icon,
      iconPosition = 'right',
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
         <ButtonContent
            label={label}
            icon={icon}
            iconPosition={iconPosition}
         />
      </S.Anchor>
   )
}

export default Button