import * as React from 'react'
import CardMenu from '../cardMenu'
import * as S from './style'
import type { CarouselProps } from './types'

const Carousel = ({
   id,
   backgroundColor,
   dots = false,
   infinite = false,
   marquee = false,
   marqueeSpeed = 40,
   textComponent,
   buttons,
   items,
}: CarouselProps) => {
   const trackRef = React.useRef<HTMLDivElement>(null)
   const [paused, setPaused] = React.useState(false)
   const [reducedMotion, setReducedMotion] = React.useState(false)
   const [activeIndex, setActiveIndex] = React.useState(0)
   const [visibleItems, setVisibleItems] = React.useState(1)
   const maxIndex = Math.max(0, items.length - visibleItems)
   const renderedItems = marquee ? [...items, ...items] : items

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

   React.useEffect(() => {
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
      const updatePreference = () => setReducedMotion(preference.matches)

      updatePreference()
      preference.addEventListener('change', updatePreference)
      return () => preference.removeEventListener('change', updatePreference)
   }, [])

   React.useEffect(() => {
      if (
         !marquee ||
         items.length <= visibleItems ||
         !Number.isFinite(marqueeSpeed) ||
         marqueeSpeed <= 0
      ) {
         return
      }

      const track = trackRef.current
      if (!track) return

      const firstItem = track.children.item(0)
      const firstRepeatedItem = track.children.item(items.length)
      if (!(firstItem instanceof HTMLElement) ||
         !(firstRepeatedItem instanceof HTMLElement)) {
         return
      }

      let cycleWidth = 0
      const updateCycleWidth = () => {
         cycleWidth =
            firstRepeatedItem.getBoundingClientRect().left -
            firstItem.getBoundingClientRect().left
      }
      updateCycleWidth()
      if (cycleWidth <= 0) return

      let frameId = 0
      let previousTimestamp: number | undefined

      window.addEventListener('resize', updateCycleWidth)

      const animate = (timestamp: number) => {
         if (previousTimestamp !== undefined && !paused && !reducedMotion) {
            const elapsed = Math.min(timestamp - previousTimestamp, 50)
            track.scrollLeft += (marqueeSpeed * elapsed) / 1000

            if (track.scrollLeft >= cycleWidth) {
               track.scrollLeft %= cycleWidth
            }
         }

         previousTimestamp = timestamp
         frameId = window.requestAnimationFrame(animate)
      }

      frameId = window.requestAnimationFrame(animate)
      return () => {
         window.cancelAnimationFrame(frameId)
         window.removeEventListener('resize', updateCycleWidth)
      }
   }, [
      items.length,
      marquee,
      marqueeSpeed,
      paused,
      reducedMotion,
      visibleItems,
   ])

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
         const repeatedItem = marquee
            ? (track.children.item(items.length) as HTMLElement | null)
            : null
         const cycleWidth = repeatedItem
            ? repeatedItem.getBoundingClientRect().left -
              firstItem.getBoundingClientRect().left
            : 0
         const scrollPosition =
            marquee && cycleWidth
               ? track.scrollLeft % cycleWidth
               : track.scrollLeft

         const nextIndex = Math.min(
            maxIndex,
            Math.round(scrollPosition / step),
         )
         setActiveIndex((currentIndex) =>
            currentIndex === nextIndex ? currentIndex : nextIndex,
         )
      }
   }

   return (
      <S.CarouselSection id={id} $backgroundColor={backgroundColor}>
         <S.CarouselContainer>
            <S.CarouselHeader>
               <S.TextContent>{textComponent}</S.TextContent>
               {buttons && <S.ButtonContent>{buttons}</S.ButtonContent>}
            </S.CarouselHeader>

            {items.length > 0 && (
               <>
                  <S.SliderArea>
                     {!marquee && maxIndex > 0 && (
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
                        <S.Track
                           ref={trackRef}
                           $marquee={marquee}
                           onScroll={updateActiveIndex}
                           onMouseEnter={() => setPaused(true)}
                           onMouseLeave={() => setPaused(false)}
                           onFocus={() => setPaused(true)}
                           onBlur={(event) => {
                              if (!event.currentTarget.contains(event.relatedTarget)) {
                                 setPaused(false)
                              }
                           }}
                           role="region"
                           aria-roledescription="carousel"
                           aria-label="Carrossel de pratos"
                        >
                           {renderedItems.map((item, index) => (
                              <CardMenu
                                 key={`${item.title}-${index % items.length}-${index >= items.length ? 'duplicate' : 'original'}`}
                                 title={item.title}
                                 text={item.description}
                                 image={item.image}
                                 aria-hidden={
                                    marquee && index >= items.length
                                       ? true
                                       : undefined
                                 }
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
