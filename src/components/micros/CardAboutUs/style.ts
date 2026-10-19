import styled from "styled-components";

export const Card = styled.div`
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   gap: 24px;
`

export const Icon = styled.div`
   display: grid;
   width: 56px;
   height: 56px;
   flex: 0 0 56px;
   place-items: center;
   overflow: hidden;
   border-radius: 50%;
   border: 1px solid var(--color-sand);

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }
`

export const TextContainer = styled.div`
   display: flex;
   min-width: 0;
   flex-direction: column;
`