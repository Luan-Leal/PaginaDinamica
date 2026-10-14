import * as React from 'react'
import CardMenu from '../cardMenu'
import * as S from './style'
import type { CarouselProps } from './types'

const Carousel = ({
   id,
   dots = false,
   infinite = false,
   textComponent,
   buttons,
   items,
}: CarouselProps) => {
   const trackRef = React.useRef<HTMLDivElement>(null)
   const [activeIndex, setActiveIndex] = React.useState(0)
   const [visibleItems, setVisibleItems] = React.useState(1)
   const maxIndex = Math.max(0, items.length - visibleItems)

   React.useEffect(() => {
      const track = trackRef.current
      if (!track) return

      const updateVisibleItems = () => {
         const firstItem = track.firstElementChild
         if (!firstItem) return

         const gap = parseFloat(getComputedStyle(track).columnGap) || 0
         const itemWidth = firstItem.getBoundingClientRect().width
         if (!itemWidth) return

         const count = Math.max(
            1,
            Math.floor((track.clientWidth + gap) / (itemWidth + gap)),
         )
         setVisibleItems(count)
      }

      updateVisibleItems()
      window.addEventListener('resize', updateVisibleItems)
      return () => window.removeEventListener('resize', updateVisibleItems)
   }, [items.length])

   React.useEffect(() => {
      setActiveIndex((index) => Math.min(index, maxIndex))
   }, [maxIndex])

   const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current
      const item = track?.children.item(index) as HTMLElement | null
      if (!track || !item) return

      const left =
         track.scrollLeft +
         item.getBoundingClientRect().left -
         track.getBoundingClientRect().left
      track.scrollTo({ left, behavior })
      setActiveIndex(index)
   }

   const move = (direction: -1 | 1) => {
      if (maxIndex === 0) return

      const nextIndex = activeIndex + direction
      if (nextIndex < 0) {
         scrollToIndex(infinite ? maxIndex : 0, infinite ? 'auto' : 'smooth')
      } else if (nextIndex > maxIndex) {
         scrollToIndex(infinite ? 0 : maxIndex, infinite ? 'auto' : 'smooth')
      } else {
         scrollToIndex(nextIndex)
      }
   }

   const updateActiveIndex = () => {
      const track = trackRef.current
      const firstItem = track?.firstElementChild as HTMLElement | null
      if (!track || !firstItem) return

      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      const step = firstItem.getBoundingClientRect().width + gap
      if (step) {
         setActiveIndex(
            Math.min(maxIndex, Math.round(track.scrollLeft / step)),
         )
      }
   }

   return (
      <S.CarouselSection id={id}>
         <S.CarouselContainer>
            <S.CarouselHeader>
               <S.TextContent>{textComponent}</S.TextContent>
               {buttons && <S.ButtonContent>{buttons}</S.ButtonContent>}
            </S.CarouselHeader>

            {items.length > 0 && (
               <>
                  <S.SliderArea>
                     {maxIndex > 0 && (
                        <>
                           <S.PreviousButton
                              type="button"
                              aria-label="Ver cards anteriores"
                              onClick={() => move(-1)}
                              disabled={!infinite && activeIndex === 0}
                           >
                              ‹
                           </S.PreviousButton>
                           <S.NextButton
                              type="button"
                              aria-label="Ver próximos cards"
                              onClick={() => move(1)}
                              disabled={!infinite && activeIndex === maxIndex}
                           >
                              ›
                           </S.NextButton>
                        </>
                     )}

                     <S.Viewport>
                        <S.Track ref={trackRef} onScroll={updateActiveIndex}>
                           {items.map((item, index) => (
                              <CardMenu
                                 key={`${item.title}-${index}`}
                                 title={item.title}
                                 text={item.description}
                                 image={item.image}
                              />
                           ))}
                        </S.Track>
                     </S.Viewport>
                  </S.SliderArea>

                  {dots && maxIndex > 0 && (
                     <S.Dots aria-label="Navegação do carrossel">
                        {Array.from({ length: maxIndex + 1 }, (_, index) => (
                           <S.Dot
                              key={index}
                              type="button"
                              aria-label={`Ir para grupo ${index + 1}`}
                              aria-current={activeIndex === index}
                              $active={activeIndex === index}
                              onClick={() => scrollToIndex(index)}
                           />
                        ))}
                     </S.Dots>
                  )}
               </>
            )}
         </S.CarouselContainer>
      </S.CarouselSection>
   )
}

export default Carousel
