import styled from 'styled-components'

// Um único componente base; a tag (p, h1, h2...) é trocada pela prop `as`.
// color e fontSize do JSON chegam por style inline e sobrescrevem estes padrões.
export const Text = styled.p`
   color: #000;
`
