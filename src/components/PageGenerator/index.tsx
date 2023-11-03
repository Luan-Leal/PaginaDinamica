import * as React from 'react'
import axios from 'axios'
import CustomText from '../micros/Text'
import Banner from '../complex/banner'

interface PageField {
   typeField: string
   title: string
   text: string
   color?: string
   fontSize?: string
}

const PageGenerator: React.FC = () => {
   const json = 'https://api.npoint.io/b7675d776e615c22c94f'
   const [renderedFields, setRenderedFields] = React.useState<
      React.ReactNode[]
   >([])

   React.useEffect(() => {
      axios
         .get(json)
         .then((response) => {
            const data = response.data
            const pageFields: PageField[] = data.page[0].pageFields

            const rendered = pageFields.map((field, index) => {
               switch (field.typeField) {
                  case 'title':
                     return (
                        <CustomText
                           key={index}
                           index={index}
                           as="h1"
                           text={field.text}
                           color={field.color}
                           fontSize={field.fontSize}
                        />
                     )
                  case 'text':
                     return (
                        <CustomText
                           key={index}
                           index={index}
                           as="p"
                           text={field.text}
                           color={field.color}
                           fontSize={field.fontSize}
                        />
                     )
                  case 'banner':
                     return (
                        <Banner
                           key={index}
                           title={field.title}
                           text={field.text}
                        />
                     )
                  default:
                     return null
               }
            })

            setRenderedFields(rendered)
         })
         .catch((error) => {
            console.error('Ocorreu um erro na solicitação: ' + error)
         })
   }, [])

   return <div>{renderedFields}</div>
}

export default PageGenerator
