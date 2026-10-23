import * as React from 'react'
import axios from 'axios'
import MockJson from '../../util/pagebuilder.json'
import Button from '../micros/Button'
import CustomText from '../micros/Text'
import ImageComponent from '../micros/ImageComponent'
import CardAboutUs from '../micros/CardAboutUs'
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
import CustomGrid from '../complex/CustomGrid'
import type {
   GridCell,
   GridDirection,
} from '../complex/CustomGrid/types'
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
   bannerImage?: string
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
   variant?: 'primary' | 'outline' | 'text'
   icon?: 'schedule' | 'arrow'
   iconPosition?: 'left' | 'right'
}

interface CardMenuField {
   typeField: 'cardMenu'
   title: string
   text: string
   image: string
}

interface ImageField {
   typeField: 'ImageComponente'
   src: string
   alt: string
   width?: React.CSSProperties['width']
   height?: React.CSSProperties['height']
   objectFit?: React.CSSProperties['objectFit']
   objectPosition?: React.CSSProperties['objectPosition']
   borderRadius?: React.CSSProperties['borderRadius']
   loading?: 'eager' | 'lazy'
   decoding?: 'async' | 'auto' | 'sync'
}

interface CardAboutUsField {
   typeField: 'CardAboutUs'
   icon: string
   TextComponent: (TitleField | TextField)[]
}

interface CarouselField {
   typeField: 'carousel'
   id?: string
   backgroundColor?: string
   dots?: boolean
   infinite?: boolean
   marquee?: boolean
   removeMarqueeOnMobile?: boolean
   marqueeSpeed?: number
   TextComponent?: (TitleField | TextField)[]
   Button?: ButtonField[]
   CarouselItems: CarouselItem[]
}

interface GridField {
   typeField: 'grid'
   id?: string
   columns?: GridCell[]
   direction?: GridDirection
   alignItems?: GridCell['alignItems']
   justifyContent?: GridCell['justifyContent']
   gap?: React.CSSProperties['gap']
   rowGap?: React.CSSProperties['rowGap']
   columnGap?: React.CSSProperties['columnGap']
   backgroundColor?: string
   backgroundImage?: string
   padding?: React.CSSProperties['padding']
}

type PageField =
   | TitleField
   | TextField
   | BannerField
   | ButtonField
   | CardMenuField
   | ImageField
   | CardAboutUsField
   | CarouselField
   | GridField

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

function renderGrid(
   field: GridCell & { id?: string },
   index: number,
   isNested = false,
): React.ReactNode {
   return (
      <CustomGrid
         key={index}
         id={field.id}
         columns={field.columns}
         direction={field.direction}
         alignItems={field.alignItems}
         justifyContent={field.justifyContent}
         gap={field.gap}
         rowGap={field.rowGap}
         columnGap={field.columnGap}
         backgroundColor={field.backgroundColor}
         backgroundImage={field.backgroundImage}
         padding={field.padding}
         isNested={isNested}
         renderCell={renderGridCell}
      />
   )
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
         icon: field.icon,
         iconPosition: field.iconPosition,
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
            bannerImage={field.bannerImage}
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
   ImageComponente: (field, index) => (
      <ImageComponent
         key={index}
         src={field.src}
         alt={field.alt}
         width={field.width}
         height={field.height}
         objectFit={field.objectFit}
         objectPosition={field.objectPosition}
         borderRadius={field.borderRadius}
         loading={field.loading}
         decoding={field.decoding}
      />
   ),
   CardAboutUs: (field, index) => (
      <CardAboutUs
         key={index}
         icon={field.icon}
         textComponent={field.TextComponent.map(renderField)}
      />
   ),
   grid: (field, index) => renderGrid(field, index),
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
            removeMarqueeOnMobile={field.removeMarqueeOnMobile}
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

function renderGridCell(cell: GridCell, index: number): React.ReactNode {
   if (cell.typeField) {
      if (cell.typeField === 'grid') {
         return renderGrid(cell, index, true)
      }

      return renderField(cell as PageField, index)
   }

   return (
      <>
         {cell.TextComponent?.map((textField, textIndex) =>
            renderField(textField as PageField, textIndex),
         )}
         {cell.components?.map((component, componentIndex) =>
            renderGridCell(component, componentIndex),
         )}
         {cell.columns && (
            <CustomGrid
               columns={cell.columns}
               direction={cell.direction}
               alignItems={cell.alignItems}
               justifyContent={cell.justifyContent}
               gap={cell.gap}
               rowGap={cell.rowGap}
               columnGap={cell.columnGap}
               backgroundColor={cell.backgroundColor}
               backgroundImage={cell.backgroundImage}
               padding={cell.padding}
               isNested
               renderCell={renderGridCell}
            />
         )}
      </>
   )
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
