// Tags disponíveis para o CustomText.
// Para liberar uma nova tag, basta incluí-la em uma das listas abaixo.
export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

export const BODY_TAGS = [
   'p',
   'span',
   'strong',
   'em',
   'small',
   'blockquote',
   'mark',
   'cite',
] as const

export type HeadingTag = (typeof HEADING_TAGS)[number]
export type BodyTag = (typeof BODY_TAGS)[number]
export type TextTag = HeadingTag | BodyTag

// O JSON vem de fora, então a tag precisa ser validada em tempo de execução.
// Sem isso, um valor como "script" ou "iframe" seria renderizado de verdade
// pela prop `as` do styled-components.
export function resolveTag<T extends TextTag>(
   tag: unknown,
   allowed: readonly T[],
   fallback: T,
): T {
   return allowed.includes(tag as T) ? (tag as T) : fallback
}
