import * as React from 'react'
import {
   Link,
   useInRouterContext,
   useLocation,
} from 'react-router-dom'

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
   href: string
}

const isInternalPath = (href: string) =>
   href.startsWith('/') && !href.startsWith('//')

const RoutedLink: React.FC<SmartLinkProps> = ({
   href,
   children,
   ...props
}) => {
   const location = useLocation()
   const normalizedHref = href.startsWith('#/') ? href.slice(1) : href

   if (!isInternalPath(normalizedHref) || props.target === '_blank') {
      return (
         <a href={href} {...props}>
            {children}
         </a>
      )
   }

   const destination = new URL(normalizedHref, window.location.origin)
   const currentDemo = new URLSearchParams(location.search).get('demo')

   if (currentDemo && !destination.searchParams.has('demo')) {
      destination.searchParams.set('demo', currentDemo)
   }

   return (
      <Link
         to={`${destination.pathname}${destination.search}${destination.hash}`}
         {...props}
      >
         {children}
      </Link>
   )
}

const SmartLink: React.FC<SmartLinkProps> = (props) => {
   const isInRouter = useInRouterContext()
   const { href, children, ...anchorProps } = props

   return isInRouter ? (
      <RoutedLink href={href} {...anchorProps}>
         {children}
      </RoutedLink>
   ) : (
      <a href={href} {...anchorProps}>
         {children}
      </a>
   )
}

export default SmartLink
