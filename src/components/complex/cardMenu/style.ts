import styled from 'styled-components'

export const CardMenuContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 25%;
   height: 400px;
   border: 1px solid var(--color-border);
   border-radius: 16px;
   background-color: var(--color-cream);
   overflow: hidden;
`

export const CardMenuImage = styled.div<{ image: string }>`
   width: 100%;
   height: 250px;
   flex-shrink: 0;
   border-radius: 16px 16px 0 0;
   background-image: url(${(props) => props.image});
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
`

export const CardMenuContent = styled.div`
   padding: 1rem;
`

export const CardMenuTitle = styled.h3`
   font-size: 1.5rem;
   margin: 0.5rem 0;
`

export const CardMenuText = styled.p`
   font-size: 1rem;
   margin: 0.5rem 0;
`