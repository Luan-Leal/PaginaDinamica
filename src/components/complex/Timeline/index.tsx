import * as S from './style'

export interface TimelineEntry {
   year: string
   title: string
   description: string
}

export interface TimelineProps {
   id?: string
   eyebrow?: string
   heading?: string
   items: TimelineEntry[]
   backgroundColor?: string
   textColor?: string
   accentColor?: string
}

const Timeline = ({
   id,
   eyebrow,
   heading,
   items,
   backgroundColor,
   textColor,
   accentColor,
}: TimelineProps) => (
   <S.Section
      id={id}
      className="template"
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $accentColor={accentColor}
   >
      <S.Container>
         <S.Intro>
            {eyebrow && (
               <S.Eyebrow $accentColor={accentColor}>{eyebrow}</S.Eyebrow>
            )}
            {heading && <h2>{heading}</h2>}
         </S.Intro>
         <S.List>
            {items.map((item, index) => (
               <S.Entry key={`${item.year}-${item.title}`}>
                  <S.Year $accentColor={accentColor}>{item.year}</S.Year>
                  <S.Marker $accentColor={accentColor} aria-hidden="true">
                     {`0${index + 1}`}
                  </S.Marker>
                  <div>
                     <h3>{item.title}</h3>
                     <p>{item.description}</p>
                  </div>
               </S.Entry>
            ))}
         </S.List>
      </S.Container>
   </S.Section>
)

export default Timeline
