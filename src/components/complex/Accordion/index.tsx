import * as React from 'react'
import * as S from './style'
import type { AccordionProps } from './types'
import plusIcon from './icons/plus.svg'
import minusIcon from './icons/minus.svg'

const Accordion: React.FC<AccordionProps> = ({
   quest,
   answer,
   accordionColor,
}) => {
   const [expanded, setExpanded] = React.useState(false)
   const answerId = React.useId()

   return (
      <S.AccordionItem $accordionColor={accordionColor}>
         <S.QuestionButton
            type="button"
            aria-expanded={expanded}
            aria-controls={answerId}
            onClick={() => setExpanded((current) => !current)}
         >
            <S.Question>{quest}</S.Question>
            <S.Icon $expanded={expanded} aria-hidden="true">
               <img src={plusIcon} alt="" />
               <img src={minusIcon} alt="" />
            </S.Icon>
         </S.QuestionButton>
         <S.AnswerPanel
            id={answerId}
            $expanded={expanded}
            aria-hidden={!expanded}
         >
            <S.AnswerClip>
               <S.Answer>{answer}</S.Answer>
            </S.AnswerClip>
         </S.AnswerPanel>
      </S.AccordionItem>
   )
}

export default Accordion
