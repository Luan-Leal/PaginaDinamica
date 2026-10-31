import * as React from 'react'
import CustomText from '../../micros/Text'
import {
   BODY_TAGS,
   HEADING_TAGS,
   resolveTag,
} from '../../micros/Text/tags'
import * as S from './style'
import type {
   FooterColumn,
   FooterOption,
   FooterProps,
   FooterSocialMedia,
   FooterTextField,
   FooterTextOption,
} from './types'

const FOOTER_TEXT_TAGS = [...HEADING_TAGS, ...BODY_TAGS] as const

const isTextOption = (
   option: FooterOption | FooterTextOption,
): option is FooterTextOption => 'TextComponent' in option

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
   const normalizedName = name.toLowerCase()

   if (normalizedName === 'instagram') {
      return (
         <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect
               x="3"
               y="3"
               width="18"
               height="18"
               rx="5"
               stroke="currentColor"
               strokeWidth="2"
            />
            <circle
               cx="12"
               cy="12"
               r="4"
               stroke="currentColor"
               strokeWidth="2"
            />
            <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
         </svg>
      )
   }

   if (normalizedName === 'whatsapp' || normalizedName === 'whats app') {
      return (
         <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
               d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.3Z"
               stroke="currentColor"
               strokeWidth="1.8"
               strokeLinejoin="round"
            />
            <path
               d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.7 1.2 1.6 2.1 2.8 2.8.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1.1-.6 1.4-.5.5-1.3.8-2.2.6-1.1-.2-2.5-.8-4-2.2-1.2-1.1-2-2.5-2.2-3.6-.2-.9.1-1.8.6-2.4Z"
               fill="currentColor"
            />
         </svg>
      )
   }

   return <span aria-hidden="true">{name}</span>
}

const FooterText: React.FC<{ field: FooterTextField }> = ({ field }) => (
   <CustomText
      as={resolveTag(
         field.tag,
         FOOTER_TEXT_TAGS,
         field.typeField === 'title' ? 'h2' : 'p',
      )}
      text={field.text}
      color={field.color}
      fontSize={field.fontSize}
      fontFamily={field.fontFamily}
      fontWeight={field.fontWeight}
      lineHeight={field.lineHeight}
      marginBottom={field.marginBottom}
   />
)

const FooterColumnContent: React.FC<{ column: FooterColumn }> = ({
   column,
}) => {
   return (
      <S.Column>
         {column.title && (
            <S.ColumnTitle
               $color={column.fontColor}
               $fontFamily={column.fontFamily}
               $fontSize={column.fontSize}
            >
               {column.title}
            </S.ColumnTitle>
         )}

         {column.logo && <S.Logo src={column.logo} alt="Logo do restaurante" />}
         {column.description && (
            <S.Description>{column.description}</S.Description>
         )}

         {column.options && (
            <S.Options>
               {column.options.map((option, index) =>
                  isTextOption(option) ? (
                     <div key={`text-${index}`}>
                        {option.TextComponent.map((field, fieldIndex) => (
                           <FooterText
                              key={`${field.typeField}-${fieldIndex}`}
                              field={field}
                           />
                        ))}
                     </div>
                  ) : (
                     <S.OptionLink
                        key={`${option.label}-${index}`}
                        href={option.link}
                        $color={column.fontColor}
                     >
                        {option.label}
                     </S.OptionLink>
                  ),
               )}
            </S.Options>
         )}

         {column.socialMedia && column.socialMedia.length > 0 && (
            <S.SocialLinks>
               {column.socialMedia.map((social: FooterSocialMedia) => (
                  <S.SocialLink
                     key={`${social.icon}-${social.link}`}
                     href={social.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={social.icon}
                  >
                     <SocialIcon name={social.icon} />
                  </S.SocialLink>
               ))}
            </S.SocialLinks>
         )}
      </S.Column>
   )
}

const Footer: React.FC<FooterProps> = ({
   backgroundColor,
   copyright,
   columns,
}) => {
   const footerColumns = columns?.length ? columns : [{}]
   const columnCount = footerColumns.length
   const currentYear = new Date().getFullYear()
   const copyrightText = copyright?.replace(
      /\{\{year\}\}/g,
      String(currentYear),
   )

   return (
      <S.FooterSection $backgroundColor={backgroundColor}>
         <S.FooterContainer>
            <S.Columns $columnCount={columnCount}>
               {footerColumns.map((column, index) => (
                  <FooterColumnContent
                     key={`footer-column-${index}`}
                     column={column}
                  />
               ))}
            </S.Columns>
            {copyrightText && <S.Copyright>{copyrightText}</S.Copyright>}
         </S.FooterContainer>
      </S.FooterSection>
   )
}

export default Footer
