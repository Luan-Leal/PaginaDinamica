import * as S from './style'

export interface CaseStudy {
   sector: string
   title: string
   summary: string
   image: string
   outcome: string
   link?: string
   linkLabel?: string
}

export interface CaseStudiesProps {
   id?: string
   eyebrow?: string
   heading?: string
   items: CaseStudy[]
   backgroundColor?: string
   textColor?: string
   accentColor?: string
}

const CaseStudies = ({
   id,
   eyebrow,
   heading,
   items,
   backgroundColor,
   textColor,
   accentColor,
}: CaseStudiesProps) => (
   <S.Section
      id={id}
      className="template"
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $accentColor={accentColor}
   >
      <S.Container>
         {(eyebrow || heading) && (
            <S.Header>
               {eyebrow && (
                  <S.Eyebrow $accentColor={accentColor}>{eyebrow}</S.Eyebrow>
               )}
               {heading && <h2>{heading}</h2>}
            </S.Header>
         )}
         <S.Grid>
            {items.map((item) => (
               <S.Card key={item.title}>
                  <S.Image src={item.image} alt="" loading="lazy" />
                  <S.Content>
                     <S.Sector $accentColor={accentColor}>
                        {item.sector}
                     </S.Sector>
                     <h3>{item.title}</h3>
                     <p>{item.summary}</p>
                     <S.Outcome $accentColor={accentColor}>
                        {item.outcome}
                     </S.Outcome>
                     {item.link && (
                        <S.Link href={item.link} $accentColor={accentColor}>
                           {item.linkLabel ?? 'Saiba mais'}
                           <span aria-hidden="true">↗</span>
                        </S.Link>
                     )}
                  </S.Content>
               </S.Card>
            ))}
         </S.Grid>
      </S.Container>
   </S.Section>
)

export default CaseStudies
