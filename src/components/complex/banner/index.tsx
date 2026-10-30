import * as S from './style'
import { BannerProps } from './types'

const Banner = ({
   title,
   text,
   id,
   bannerImage,
   textComponent,
   buttons,
}: BannerProps) => {
   return (
      <S.BannerContainer
         className="template"
         id={id}
         $bannerImage={bannerImage}
      >
         <div className="page-spacing">
            <S.BannerContent>
               <S.TextContent>
                  {textComponent ?? (
                     <>
                        {title && <h1>{title}</h1>}
                        {text && <p>{text}</p>}
                     </>
                  )}
               </S.TextContent>
               <S.ButtonContainer>
                  {buttons && <S.Buttons>{buttons}</S.Buttons>}
               </S.ButtonContainer>
            </S.BannerContent>
         </div>
      </S.BannerContainer>
   )
}

export default Banner
