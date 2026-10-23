import styled from 'styled-components'

// Um único componente base; a tag (p, h1, h2...) é trocada pela prop `as`.
export const Text = styled.p`
   color: var(--text-color, #000);
   font-size: var(--text-font-size, revert);
   font-family: var(--text-font-family, revert);
   font-weight: var(--text-font-weight, revert);
   line-height: var(--text-line-height, revert);
   margin-bottom: var(--text-margin-bottom, revert);

   @media (max-width: 767px) {
      color: var(--text-color-mobile, var(--text-color, #000));
      font-size: var(--text-font-size-mobile, var(--text-font-size, revert));
      font-family: var(
         --text-font-family-mobile,
         var(--text-font-family, revert)
      );
      font-weight: var(
         --text-font-weight-mobile,
         var(--text-font-weight, revert)
      );
      line-height: var(
         --text-line-height-mobile,
         var(--text-line-height, revert)
      );
      margin-bottom: var(
         --text-margin-bottom-mobile,
         var(--text-margin-bottom, revert)
      );
   }
`
