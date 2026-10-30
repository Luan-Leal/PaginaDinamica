import * as React from 'react'
import axios from 'axios'
import MockJson from '../../util/pagebuilder.json'
import PageGenerator from '../PageGenerator'
import type { PageData } from '../PageGenerator'

const PAGE_JSON_URL = 'https://api.npoint.io/06f271e1bb5f0a1aa654'

const isRecord = (value: unknown): value is Record<string, unknown> =>
   typeof value === 'object' && value !== null && !Array.isArray(value)

const isPageData = (value: unknown): value is PageData => {
   if (!isRecord(value) || typeof value.id !== 'string') {
      return false
   }

   if (
      value.context !== undefined &&
      typeof value.context !== 'string'
   ) {
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
         Array.isArray(page.pageFields) &&
         page.pageFields.every(
            (field) => isRecord(field) && typeof field.typeField === 'string',
         ),
   )
}

const Template: React.FC = () => {
   const [pageData, setPageData] = React.useState<PageData | null>(null)

   React.useEffect(() => {
      let cancelled = false

      axios
         .get<unknown>(PAGE_JSON_URL)
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
   }, [])

   if (!pageData) {
      return <p>Carregando página...</p>
   }

   return (
      <div>
         <PageGenerator data={pageData} />
      </div>
   )
}

export default Template