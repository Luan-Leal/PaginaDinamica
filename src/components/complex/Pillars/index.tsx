import * as S from './style'

export interface PillarItem {
   number?: string
   title: string
   description: string
}

export interface PillarsProps {
   id?: string
   eyebrow?: string
   heading?: string
   intro?: string
   items: PillarItem[]
   backgroundColor?: string
   textColor?: string
   accentColor?: string
}

const Pillars = ({
   id,
   eyebrow,
   heading,
   intro,
   items,
   backgroundColor,
   textColor,
   accentColor,
}: PillarsProps) => (
   <S.Section
      id={id}
      className="template"
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $accentColor={accentColor}
   >
      <S.Container>
         {(eyebrow || heading || intro) && (
            <S.Header>
               <div>
                  {eyebrow && (
                     <S.Eyebrow $accentColor={accentColor}>{eyebrow}</S.Eyebrow>
                  )}
                  {heading && <h2>{heading}</h2>}
               </div>
               {intro && <p>{intro}</p>}
            </S.Header>
         )}
         <S.Grid $itemCount={items.length}>
            {items.map((item, index) => (
               <S.Card key={`${item.title}-${index}`}>
                  <S.Number $accentColor={accentColor}>
                     {item.number ?? `0${index + 1}`}
                  </S.Number>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
               </S.Card>
            ))}
         </S.Grid>
      </S.Container>
   </S.Section>
)

export default Pillars
