import styled from 'styled-components'
import headerButtonIcon from './icons/header-button.svg'

export const Header = styled.header<{ $fixed: boolean }>`
   position: ${({ $fixed }) => ($fixed ? 'fixed' : 'absolute')};
   top: 0;
   width: 100%;
   background-color: transparent;
   z-index: 1000;
`

export const Logo = styled.div`
   img {
      height: auto;
      width: 50px !important;
   }
`

export const Content = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`

export const Nav = styled.nav<{ $open: boolean }>`
   display: flex;
   align-items: center;
   gap: 32px;
   ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 16px;
   }
   li {
      a {
         text-decoration: none;
         color: var(--color-cream-light);
         font-weight: 500;
         transition: color 0.3s;
         font-size: 16px;
         &:hover {
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 6px;
         }
      }
   }
   .button {
      text-decoration: none;
      background-color: var(--color-olive);
      color: var(--color-cream-light);
      font-weight: 400;
      font-size: 16px;
      border: none;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 16px;
      transition: background-color 0.3s;
      text-transform: uppercase;
      &:hover {
         background-color: var(--color-olive-light);
      }
      display: inline-flex;
      align-items: center;
      gap: 8px;
      &::before {
         content: '';
         width: 18px;
         height: 18px;
         flex: none;
         background-color: currentColor;
         mask: url(${headerButtonIcon}) center / contain no-repeat;
      }
   }

   @media (max-width: 768px) {
      position: fixed;
      inset: 0;
      z-index: 2;
      display: ${({ $open }) => ($open ? 'flex' : 'none')};
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 40px;
      padding: 96px 32px 40px;
      background-color: var(--color-forest);

      ul {
         flex-direction: column;
         gap: 24px;
      }

      li a {
         font-size: 20px;
      }

      .button {
         font-size: 16px;
      }
   }
`

export const MobileMenuToggle = styled.button`
   position: relative;
   z-index: 3;
   display: none;
   width: 44px;
   height: 44px;
   flex: 0 0 44px;
   align-items: center;
   justify-content: center;
   padding: 8px;
   border: 0;
   background: transparent;
   cursor: pointer;

   img {
      width: 28px;
      height: 28px;
   }

   &:focus-visible {
      outline: 2px solid var(--color-cream-light);
      outline-offset: 3px;
      border-radius: 4px;
   }

   @media (max-width: 768px) {
      display: inline-flex;
   }
`