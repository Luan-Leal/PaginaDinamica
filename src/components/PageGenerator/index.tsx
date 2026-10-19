import * as React from 'react'
import axios from 'axios'
import MockJson from '../../util/pagebuilder.json'
import Button from '../micros/Button'
import CustomText from '../micros/Text'
import {
   HEADING_TAGS,
   BODY_TAGS,
   resolveTag,
   type HeadingTag,
   type BodyTag,
} from '../micros/Text/tags'
import Banner from '../complex/banner'
import CardMenu from '../complex/cardMenu'
import Carousel from '../complex/carousel'
import type { CarouselItem } from '../complex/carousel/types'
import Footer from '../complex/footer'
import type { FooterProps } from '../complex/footer/types'
import Header, { HeaderProps } from '../complex/header'

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

// `tag` é opcional: sem ela, title usa h1 e text usa p.
interface TitleField {
   typeField: 'title'
   tag?: HeadingTag
   text: string
   color?: string
   fontSize?: string
   fontFamily?: string
   fontWeight?: React.CSSProperties['fontWeight']
   lineHeight?: string
   marginBottom?: string
}

interface TextField {
   typeField: 'text'
   tag?: BodyTag
   text: string
   color?: string
   fontSize?: string
   fontFamily?: string
   fontWeight?: React.CSSProperties['fontWeight']
   lineHeight?: string
   marginBottom?: string
}

interface BannerField {
   typeField: 'banner'
   id?: string
   title?: string
   text?: string
   TextComponent?: (TitleField | TextField)[]
   Button?: ButtonField[]
}

interface ButtonField {
   typeField: 'button'
   label: string
   link: string
   target?: boolean
   as?: 'button' | 'a'
   variant?: 'primary' | 'outline'
}

interface CardMenuField {
   typeField: 'cardMenu'
   title: string
   text: string
   image: string
}

interface CarouselField {
   typeField: 'carousel'
   id?: string
   backgroundColor?: string
   dots?: boolean
   infinite?: boolean
   marquee?: boolean
   marqueeSpeed?: number
   TextComponent?: (TitleField | TextField)[]
   Button?: ButtonField[]
   CarouselItems: CarouselItem[]
}

type PageField =
   | TitleField
   | TextField
   | BannerField
   | ButtonField
   | CardMenuField
   | CarouselField

// Elementos fixos do site (aparecem em todas as páginas).
// Para criar um footer: adicionar `footer?: FooterProps` aqui.
interface GlobalData {
   header?: HeaderProps
   footer?: FooterProps
}

interface PageData {
   id: string
   context: string
   global?: GlobalData[]
   page: {
      pageTitle: string
      pageFields: PageField[]
   }[]
}

/* ------------------------------------------------------------------ */
/* Registro de componentes do conteúdo da página (pageFields)          */
/* Serve para itens que se repetem e têm ordem definida pelo JSON.     */
/* ------------------------------------------------------------------ */

type FieldRenderers = {
   [K in PageField['typeField']]: (
      field: Extract<PageField, { typeField: K }>,
      index: number,
   ) => React.ReactNode
}

const fieldRegistry: FieldRenderers = {
   title: (field, index) => (
      <CustomText
         key={index}
         as={resolveTag(field.tag, HEADING_TAGS, 'h1')}
         text={field.text}
         color={field.color}
         fontSize={field.fontSize}
         fontFamily={field.fontFamily}
         fontWeight={field.fontWeight}
         lineHeight={field.lineHeight}
         marginBottom={field.marginBottom}
      />
   ),
   text: (field, index) => (
      <CustomText
         key={index}
         as={resolveTag(field.tag, BODY_TAGS, 'p')}
         text={field.text}
         color={field.color}
         fontSize={field.fontSize}
         fontFamily={field.fontFamily}
         fontWeight={field.fontWeight}
         lineHeight={field.lineHeight}
         marginBottom={field.marginBottom}
      />
   ),
   button: (field, index) => {
      const commonProps = {
         key: index,
         label: field.label,
         variant: field.variant,
      }

      return field.as === 'button' ? (
         <Button {...commonProps} as="button" />
      ) : (
         <Button
            {...commonProps}
            as="a"
            link={field.link}
            target={field.target}
         />
      )
   },
   banner: (field, index) => {
      const textComponent = field.TextComponent?.length
         ? field.TextComponent.map(renderField)
         : undefined
      const buttons = field.Button?.length
         ? field.Button.map(renderField)
         : undefined

      return (
         <Banner
            key={index}
            id={field.id}
            title={field.title}
            text={field.text}
            textComponent={textComponent}
            buttons={buttons}
         />
      )
   },
   cardMenu: (field, index) => {
      return (
         <CardMenu
            key={index}
            title={field.title}
            text={field.text}
            image={field.image}
         />
      )
   },
   carousel: (field, index) => {
      const textComponent = field.TextComponent?.length
         ? field.TextComponent.map(renderField)
         : undefined
      const buttons = field.Button?.length
         ? field.Button.map(renderField)
         : undefined

      return (
         <Carousel
            key={index}
            id={field.id}
            backgroundColor={field.backgroundColor}
            dots={field.dots}
            infinite={field.infinite}
            marquee={field.marquee}
            marqueeSpeed={field.marqueeSpeed}
            textComponent={textComponent}
            buttons={buttons}
            items={field.CarouselItems}
         />
      )
   },
}

function renderField(field: PageField, index: number): React.ReactNode {
   const render = fieldRegistry[field.typeField] as
      | ((field: PageField, index: number) => React.ReactNode)
      | undefined

   return render ? render(field, index) : null
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

interface PageGeneratorProps {
   url?: string
}

const PageGenerator: React.FC<PageGeneratorProps> = ({ url }) => {
   const [pageData, setPageData] = React.useState<PageData | null>(
      url ? null : (MockJson as PageData),
   )
   const [loading, setLoading] = React.useState(Boolean(url))

   React.useEffect(() => {
      if (!url) {
         setPageData(MockJson as PageData)
         setLoading(false)
         return
      }

      let cancelled = false
      setLoading(true)

      axios
         .get<PageData>(url)
         .then(({ data }) => {
            if (!cancelled) setPageData(data)
         })
         .catch((error) => {
            console.error('Erro ao buscar o JSON da página:', error)
            // Fallback: usa o JSON local (mantenha-o igual ao formato novo)
            if (!cancelled) setPageData(MockJson as PageData)
         })
         .finally(() => {
            if (!cancelled) setLoading(false)
         })

      return () => {
         cancelled = true
      }
   }, [url])

   if (loading || !pageData) return <p>Carregando página...</p>

   const header = pageData.global?.[0]?.header
   const footer = pageData.global?.[0]?.footer
   const fields = pageData.page[0].pageFields

   return (
      <>
         {header && <Header {...header} />}
         <main>{fields.map(renderField)}</main>
         {footer && <Footer {...footer} />}
      </>
   )
}

export default PageGenerator
