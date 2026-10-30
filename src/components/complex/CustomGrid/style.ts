import styled from 'styled-components'
import type { GridDirection } from './types'
import { parseResponsiveValue } from '../../../util/responsiveValue'

interface GridStyleProps {
   $columnCount: number
   $direction?: GridDirection
   $gap?: React.CSSProperties['gap']
   $rowGap?: React.CSSProperties['rowGap']
   $columnGap?: React.CSSProperties['columnGap']
   $padding?: React.CSSProperties['padding']
}

export const Section = styled.section<{
   $backgroundColor?: string
   $backgroundImage?: string
}>`
   width: 100%;
   background-color: ${({ $backgroundColor }) =>
      $backgroundColor ?? 'transparent'};
   background-image: ${({ $backgroundImage }) =>
      $backgroundImage ? `url("${$backgroundImage}")` : 'none'};
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
`

export const Grid = styled.div<GridStyleProps>`
   display: ${({ $direction }) => ($direction ? 'flex' : 'grid')};
   width: 100%;
   max-width: 1696px;
   flex-direction: ${({ $direction }) => $direction ?? 'row'};
   flex-wrap: ${({ $direction }) => ($direction ? 'wrap' : 'nowrap')};
   grid-template-columns: ${({ $columnCount, $direction }) =>
      $direction
         ? 'none'
         : `repeat(${Math.max(1, $columnCount)}, minmax(0, 1fr))`};
   gap: ${({ $gap }) => $gap ?? '32px'};
   row-gap: ${({ $rowGap, $gap }) => $rowGap ?? $gap ?? '32px'};
   column-gap: ${({ $columnGap, $gap }) => $columnGap ?? $gap ?? '32px'};
   padding: ${({ $padding }) => $padding ?? ''};

   > * {
      ${({ $columnCount, $direction, $gap, $columnGap }) =>
         $direction === 'row' || $direction === 'row-reverse'
            ? `
               flex: 0 0 calc(
                  (100% - (${Math.max(1, $columnCount) - 1} * ${
                     $columnGap ?? $gap ?? '32px'
                  }))
                  / ${Math.max(1, $columnCount)}
               );
            `
            : $direction
            ? 'width: 100%;'
            : ''}
   }

   @media (max-width: 768px) {
      ${({ $direction }) =>
         $direction
            ? `
               flex-direction: column;

               > * {
                  width: 100%;
                  flex-basis: auto;
               }
            `
            : 'grid-template-columns: 1fr;'}
   }
`

export const Cell = styled.div<{
   $alignItems?: string
   $justifyContent?: string
   $textAlign?: React.CSSProperties['textAlign']
}>`
   display: flex;
   flex-direction: column;
   min-width: 0;
   align-items: ${({ $alignItems }) =>
      parseResponsiveValue($alignItems).desktop ?? 'stretch'};
   justify-content: ${({ $justifyContent, $alignItems }) => {
      const responsiveJustifyContent = parseResponsiveValue($justifyContent)
      const alignItems = parseResponsiveValue($alignItems)
      const desktopAlignItems = alignItems.desktop
      const defaultDesktop =
         desktopAlignItems === 'center'
            ? 'center'
            : desktopAlignItems === 'flex-end' || desktopAlignItems === 'end'
              ? 'flex-end'
              : 'flex-start'

      return responsiveJustifyContent.desktop ?? defaultDesktop
   }};
   text-align: ${({ $textAlign }) => $textAlign ?? 'left'};

   @media (max-width: 767px) {
      align-items: ${({ $alignItems }) => {
         const { desktop, mobile } = parseResponsiveValue($alignItems)
         return mobile ?? desktop ?? 'stretch'
      }};
      justify-content: ${({ $justifyContent, $alignItems }) => {
         const responsiveJustifyContent = parseResponsiveValue($justifyContent)
         const responsiveAlignItems = parseResponsiveValue($alignItems)
         const mobileAlignItems =
            responsiveAlignItems.mobile ?? responsiveAlignItems.desktop
         const defaultMobile =
            mobileAlignItems === 'center'
               ? 'center'
               : mobileAlignItems === 'flex-end' || mobileAlignItems === 'end'
                 ? 'flex-end'
                 : 'flex-start'

         return (
            responsiveJustifyContent.mobile ??
            responsiveJustifyContent.desktop ??
            defaultMobile
         )
      }};
   }
`

export const CellTitle = styled.h2`
   margin-bottom: 16px;
`

export const Logo = styled.img`
   display: block;
   max-width: 100%;
   height: auto;
`
