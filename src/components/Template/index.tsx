import * as React from 'react'
import axios from 'axios'
import MockJson from '../../util/pagebuilder.json'
import BarbershopJson from '../../util/barbearia-pagebuilder.json'
import MultinationalJson from '../../util/multinacional-pagebuilder.json'
import '../../global/barbearia.css'
import '../../global/multinacional.css'
import PageGenerator from '../PageGenerator'
import type { PageData } from '../PageGenerator'

const PAGE_JSON_URL = 'https://api.npoint.io/06f271e1bb5f0a1aa654'

interface LoadingConfig {
   backgroundColor?: string
   text?: string
   logo?: string
   alt?: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
   typeof value === 'object' && value !== null && !Array.isArray(value)

const isLoadingConfig = (value: unknown): value is LoadingConfig =>
   isRecord(value) &&
   ['backgroundColor', 'text', 'logo', 'alt'].every(
      (key) => value[key] === undefined || typeof value[key] === 'string',
   )

const isPageData = (value: unknown): value is PageData => {
   if (!isRecord(value) || typeof value.id !== 'string') {
      return false
   }

   if (value.favicon !== undefined && typeof value.favicon !== 'string') {
      return false
   }

   if (value.loading !== undefined && !isLoadingConfig(value.loading)) {
      return false
   }

   if (value.context !== undefined && typeof value.context !== 'string') {
      return false
   }

   if (
      value.global !== undefined &&
      (!Array.isArray(value.global) || !value.global.every(isRecord))
   ) {
      return false
   }

   if (!Array.isArray(value.page) || value.page.length === 0) {
      return false
   }

   return value.page.every(
      (page) =>
         isRecord(page) &&
         (page.slug === undefined || typeof page.slug === 'string') &&
         Array.isArray(page.pageFields) &&
         page.pageFields.every(
            (field) => isRecord(field) && typeof field.typeField === 'string',
         ),
   )
}

const Template: React.FC = () => {
   const isBarbeariaDemo =
      new URLSearchParams(window.location.search).get('demo') === 'barbearia'
   const isMultinationalDemo =
      new URLSearchParams(window.location.search).get('demo') === 'multinacional'
   const isLocalDemo = isBarbeariaDemo || isMultinationalDemo
   const [pageData, setPageData] = React.useState<PageData | null>(() =>
      isBarbeariaDemo
         ? (BarbershopJson as PageData)
         : isMultinationalDemo
           ? (MultinationalJson as PageData)
           : null,
   )

   React.useEffect(() => {
      if (isLocalDemo) {
         console.log(
            isBarbeariaDemo
               ? 'Fonte do JSON da página: demonstração local de barbearia'
               : 'Fonte do JSON da página: demonstração local multinacional',
         )
         return
      }

      let cancelled = false

      axios
         .get<unknown>(PAGE_JSON_URL, {
            params: { _cacheBust: Date.now() },
         })
         .then(({ data }) => {
            if (isPageData(data)) {
               if (!cancelled) {
                  console.log('Fonte do JSON da página: API')
                  setPageData(data)
               }
               return
            }

            console.error(
               'A API retornou um JSON nulo ou inválido. Usando o JSON local como fallback.',
            )
            if (!cancelled) {
               console.log('Fonte do JSON da página: mock local')
               setPageData(MockJson as PageData)
            }
         })
         .catch((error: unknown) => {
            console.error('Erro ao buscar o JSON da página:', error)
            if (!cancelled) {
               console.log('Fonte do JSON da página: mock local')
               setPageData(MockJson as PageData)
            }
         })

      return () => {
         cancelled = true
      }
   }, [isBarbeariaDemo, isLocalDemo])

   if (!pageData) {
      const loading = (MockJson as PageData).loading

      return (
         <main
            role="status"
            aria-live="polite"
            style={{
               display: 'flex',
               minHeight: '100vh',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '24px',
               padding: '24px',
               backgroundColor: loading?.backgroundColor ?? '#F5F0E5',
               color: 'var(--color-forest)',
               textAlign: 'center',
            }}
         >
            {loading?.logo && (
               <img
                  src={loading.logo}
                  alt={loading.alt || 'Logo do Restaurante Luancas'}
                  loading="eager"
                  style={{
                     maxWidth: '180px',
                     maxHeight: '180px',
                     objectFit: 'contain',
                  }}
               />
            )}
            <p>{loading?.text ?? 'Carregando página...'}</p>
         </main>
      )
   }

   return (
      <div
         className={
            isBarbeariaDemo
               ? 'barbearia-theme'
               : isMultinationalDemo
                 ? 'multinacional-theme'
                 : undefined
         }
      >
         <PageGenerator data={pageData} />
      </div>
   )
}

export default Template