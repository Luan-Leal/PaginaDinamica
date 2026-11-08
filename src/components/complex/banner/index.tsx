import * as S from './style'
import { BannerProps } from './types'

const Banner = ({
   title,
   text,
   id,
   bannerImage,
   justifyContent,
   alignItems,
   textAlign,
   textComponent,
   buttons,
}: BannerProps) => {
   return (
      <S.BannerContainer
         className="template"
         id={id}
         $bannerImage={bannerImage}
         $justifyContent={justifyContent}
         $alignItems={alignItems}
      >
         <div className="page-spacing">
            <S.BannerContent $contentAlignItems={alignItems}>
               <S.TextContent $textAlign={textAlign}>
                  {textComponent ?? (
                     <>
                        {title && <h1>{title}</h1>}
                        {text && <p>{text}</p>}
                     </>
                  )}
               </S.TextContent>
               <S.ButtonContainer $contentAlignItems={alignItems}>
                  {buttons && <S.Buttons>{buttons}</S.Buttons>}
               </S.ButtonContainer>
            </S.BannerContent>
         </div>
      </S.BannerContainer>
   )
}

export default Banner
