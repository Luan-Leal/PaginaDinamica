import styled from 'styled-components'
import headerButtonIcon from './icons/header-button.svg'

export const Header = styled.header`
   position: fixed;
   top: 0;
   width: 100%;
   background-color: transparent;
   z-index: 1000;
`

export const Logo = styled.div`
   img {
      height: auto;
      width: 50px!important;
   }
`

export const Content = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: start;
`

export const Nav = styled.nav`
   display: flex;
   align-items: center;
   gap: 32px;
   padding: 56px 24px 0;
   ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
`