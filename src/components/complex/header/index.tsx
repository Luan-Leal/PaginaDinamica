import React from 'react'
import * as S from './style'
import menuIcon from './icons/menu.svg'
import closeIcon from './icons/close.svg'

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
   logo?: string
   fixed?: boolean
   menu: MenuItem[]
   button?: HeaderButton
}

const Header: React.FC<HeaderProps> = ({
   logo,
   fixed = false,
   menu,
   button,
}) => {
   const [menuOpen, setMenuOpen] = React.useState(false)

   React.useEffect(() => {
      if (!menuOpen) return

      const previousOverflow = document.body.style.overflow
      const closeOnEscape = (event: KeyboardEvent) => {
         if (event.key === 'Escape') setMenuOpen(false)
      }

      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', closeOnEscape)

      return () => {
         document.body.style.overflow = previousOverflow
         document.removeEventListener('keydown', closeOnEscape)
      }
   }, [menuOpen])

   React.useEffect(() => {
      const closeOnDesktop = () => {
         if (window.innerWidth > 768) setMenuOpen(false)
      }

      window.addEventListener('resize', closeOnDesktop)
      return () => window.removeEventListener('resize', closeOnDesktop)
   }, [])

   const closeMenu = () => setMenuOpen(false)

   return (
      <S.Header
         className="template"
         $fixed={fixed}
         style={{ paddingBottom: 0, paddingTop: 0 }}
      >
         <S.Content className="page-spacing">
            <div className="logo">
               <img src={logo} alt="Logo" draggable="false" />
            </div>

            <S.Nav
               id="mobile-navigation"
               aria-label="Navegação principal"
               $open={menuOpen}
            >
               <ul>
                  {menu.map((item) => (
                     <li key={item.link}>
                        <a href={item.link} onClick={closeMenu}>
                           {item.label}
                        </a>
                     </li>
                  ))}
               </ul>

               {button?.hasButton && (
                  <a
                     className="button"
                     href={button.link}
                     target={button.target ? '_blank' : '_self'}
                     onClick={closeMenu}
                     rel="noopener noreferrer"
                  >
                     {button.label}
                  </a>
               )}
            </S.Nav>

            <S.MobileMenuToggle
               type="button"
               aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
               aria-expanded={menuOpen}
               aria-controls="mobile-navigation"
               onClick={() => setMenuOpen((open) => !open)}
            >
               <img
                  src={menuOpen ? closeIcon : menuIcon}
                  alt=""
                  aria-hidden="true"
               />
            </S.MobileMenuToggle>
         </S.Content>
      </S.Header>
   )
}

export default Header
