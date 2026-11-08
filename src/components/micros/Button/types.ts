import type React from 'react'

type ButtonIcon = 'schedule' | 'arrow'
type ButtonIconPosition = 'left' | 'right'

interface ButtonColorProps {
   backgroundColor?: string
   textColor?: string
   borderColor?: string
   hoverBackgroundColor?: string
   hoverTextColor?: string
}

type ButtonProps =
   | ({
        as: 'button'
        label: string
        variant?: 'primary' | 'outline' | 'text'
        icon?: ButtonIcon
        iconPosition?: ButtonIconPosition
     } & ButtonColorProps &
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)
   | ({
        as?: 'a'
        label: string
        link: string
        target?: boolean
        variant?: 'primary' | 'outline' | 'text'
        icon?: ButtonIcon
        iconPosition?: ButtonIconPosition
     } & ButtonColorProps &
        Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'children' | 'href' | 'target'
     >)

export type { ButtonIcon, ButtonIconPosition, ButtonProps }