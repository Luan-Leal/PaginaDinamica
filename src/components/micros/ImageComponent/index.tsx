import * as React from 'react'

export interface ImageComponentProps {
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

const ImageComponent: React.FC<ImageComponentProps> = ({
   src,
   alt,
   width = '100%',
   height = 'auto',
   objectFit,
   objectPosition,
   borderRadius,
   loading,
   decoding,
}) => {
   const style: React.CSSProperties = {
      width,
      height,
      objectFit,
      objectPosition,
      borderRadius,
   }

   return (
      <img
         src={src}
         alt={alt}
         style={style}
         loading={loading}
         decoding={decoding}
      />
   )
}

export default ImageComponent