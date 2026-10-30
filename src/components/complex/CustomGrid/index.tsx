import * as React from 'react'
import ImageComponent from '../../micros/ImageComponent'
import * as S from './style'
import type { CustomGridProps, GridCell } from './types'

interface CustomGridComponentProps extends CustomGridProps {
   isNested?: boolean
   renderCell: (cell: GridCell, index: number) => React.ReactNode
}

const CustomGrid: React.FC<CustomGridComponentProps> = ({
   id,
   isNested = false,
   columns,
   gap,
   rowGap,
   columnGap,
   direction,
   alignItems,
   justifyContent,
   backgroundColor,
   backgroundImage,
   padding,
   className,
   renderCell,
}) => {
   const cells = columns?.length ? columns : [{}]

   return (
      <S.Section
         className={isNested ? undefined : 'template'}
         id={id}
         $backgroundColor={backgroundColor}
         $backgroundImage={backgroundImage}
      >
            <S.Grid
               className={className}
               $columnCount={cells.length}
               $direction={direction}
               $gap={gap}
               $rowGap={rowGap}
               $columnGap={columnGap}
               $padding={padding}
            >
               {cells.map((cell, index) => (
                  <S.Cell
                     key={`grid-cell-${index}`}
                     $alignItems={cell.alignItems ?? alignItems}
                     $justifyContent={cell.justifyContent ?? justifyContent}
                     $textAlign={cell.textAlign}
                  >
                     {cell.title && <S.CellTitle>{cell.title}</S.CellTitle>}
                     {cell.logo && (
                        <ImageComponent
                           src={cell.logo}
                           alt={cell.alt ?? ''}
                           loading="lazy"
                        />
                     )}
                     {renderCell(cell, index)}
                  </S.Cell>
               ))}
            </S.Grid>
      </S.Section>
   )
}

export default CustomGrid
