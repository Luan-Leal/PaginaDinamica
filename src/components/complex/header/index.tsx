import React from 'react'
import * as S from './style'
import Button from '../../micros/Button'

interface MenuItem {
   label: string
   link: string
}

interface HeaderButton {
   hasButton: boolean
   label: string
   link: string
   target?: boolean
}

export interface HeaderProps {
   logo: string
   menu: MenuItem[]
   button?: HeaderButton
}

const Header: React.FC<HeaderProps> = ({ logo, menu, button }) => {
   console.log('Header props:', { logo, menu, button })
   return (
      <S.Header className="template">
         <S.Content className="page-spacing">
            <div className="logo">
               <img src={logo} alt="Logo" draggable="false" />
            </div>

            <S.Nav>
               <ul>
                  {menu.map((item) => (
                     <li key={item.link}>
                        <a href={item.link}>{item.label}</a>
                     </li>
                  ))}
               </ul>

            {button?.hasButton && (
               <a className="button" href={button.link} target={button.target ? '_blank' : '_self'} rel="noopener noreferrer">
                  {button.label}
               </a>
            )}
            </S.Nav>

         </S.Content>
      </S.Header>
   )
}

export default Header
