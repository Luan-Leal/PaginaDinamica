import * as S from './style'

export interface StatItem {
   value: string
   label: string
   detail?: string
}

export interface StatsProps {
   id?: string
   eyebrow?: string
   heading?: string
   items: StatItem[]
   backgroundColor?: string
   textColor?: string
   accentColor?: string
}

const Stats = ({
   id,
   eyebrow,
   heading,
   items,
   backgroundColor,
   textColor,
   accentColor,
}: StatsProps) => (
   <S.Section
      id={id}
      className="template"
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $accentColor={accentColor}
   >
      <S.Container>
         {(eyebrow || heading) && (
            <S.Heading>
               {eyebrow && <S.Eyebrow $accentColor={accentColor}>{eyebrow}</S.Eyebrow>}
               {heading && <h2>{heading}</h2>}
            </S.Heading>
         )}
         <S.Items $itemCount={items.length}>
            {items.map((item) => (
               <S.Item key={`${item.value}-${item.label}`}>
                  <S.Value $accentColor={accentColor}>{item.value}</S.Value>
                  <S.Label>{item.label}</S.Label>
                  {item.detail && <S.Detail>{item.detail}</S.Detail>}
               </S.Item>
            ))}
         </S.Items>
      </S.Container>
   </S.Section>
)

export default Stats
