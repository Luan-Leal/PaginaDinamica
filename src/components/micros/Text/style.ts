import styled from 'styled-components'

interface TextProps {
   color?: string
   fontSize?: string
}

export const TextComponent = styled.p<TextProps>`
   color: ${(props) => (props.color ? props.color : '#000')};
   font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
`

export const TitleComponent = styled.h1<TextProps>`
   color: ${(props) => (props.color ? props.color : '#000')};
   font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
`
