import styled from 'styled-components'
import BannerImage from '../../../assets/bannerExemplo.jpg'

export const BannerContainer = styled.div`
   width: 100%;
   height: 300px;
   background-image: url(${BannerImage});
   background-size: cover;
   background-position: center center;
   position: relative;
`

export const Text = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
   color: #e4e4e4;
`
