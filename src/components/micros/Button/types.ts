import type React from 'react'

type ButtonProps =
   | ({
        as: 'button'
        label: string
        variant?: 'primary' | 'outline'
     } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)
   | ({
        as?: 'a'
        label: string
        link: string
        target?: boolean
        variant?: 'primary' | 'outline'
     } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'children' | 'href' | 'target'
     >)

export type { ButtonProps }