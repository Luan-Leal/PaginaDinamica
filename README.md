# Page Builder

Este projeto monta uma página React a partir de um JSON. A estrutura da página, os textos, as imagens e as configurações dos componentes ficam nos dados; o código interpreta esses dados e renderiza os componentes cadastrados.

## Sumário

- [Executar o projeto](#executar-o-projeto)
- [Como os dados percorrem o projeto](#como-os-dados-percorrem-o-projeto)
- [Formato geral do JSON](#formato-geral-do-json)
- [JSON mock e JSON externo](#json-mock-e-json-externo)
- [Imagens e outros arquivos de mídia](#imagens-e-outros-arquivos-de-mídia)
- [Componentes micros](#componentes-micros)
- [Componentes complexos](#componentes-complexos)
  - [Grid](#grid)
  - [Header](#header)
  - [Footer](#footer)
  - [Accordion](#accordion)
  - [Banner](#banner)
  - [Carousel](#carousel)
- [Responsividade](#responsividade)
- [Adicionar um novo tipo de componente](#adicionar-um-novo-tipo-de-componente)

## Executar o projeto

Requer Node.js e npm. Na pasta do projeto:

```bash
npm install
npm start
```

O servidor de desenvolvimento abre em `http://localhost:3000`.

Outros comandos:

```bash
npm test       # executa os testes
npm run build  # gera a versão de produção na pasta build
```

## Como os dados percorrem o projeto

### `Template`

O componente [Template](./src/components/Template/index.tsx) inicia a aplicação. Ele busca o JSON configurado em `PAGE_JSON_URL` usando Axios. Atualmente, a URL apontada é:

```text
https://api.npoint.io/06f271e1bb5f0a1aa654
```

Se a resposta tiver a estrutura mínima esperada, o `Template` registra no console `Fonte do JSON da página: API` e entrega os dados ao `PageGenerator`. Se a requisição falhar ou a resposta for nula/inválida, registra o problema no console e usa `src/util/pagebuilder.json` como fallback, indicando `Fonte do JSON da página: mock local`.

Para mudar a API, altere `PAGE_JSON_URL` no `Template`. A hospedagem pode ser npoint ou qualquer serviço que entregue o JSON por HTTP/HTTPS, sem autenticação exposta no navegador e com CORS permitindo que o domínio do site faça a requisição.

### `PageGenerator`

O [PageGenerator](./src/components/PageGenerator/index.tsx) recebe os dados já carregados e associa cada `typeField` a um componente. Assim, a lógica de requisição e fallback fica no `Template`, enquanto o gerador cuida da renderização.

O `PageGenerator` usa o primeiro objeto de `global` para Header/Footer e renderiza o `pageFields` da primeira página em `page`. O campo `typeField` identifica o componente. A grafia é sensível a maiúsculas/minúsculas.

## Formato geral do JSON

O JSON precisa ter um identificador e uma lista `page`, contendo pelo menos uma página com `pageFields`. `global` é opcional e guarda elementos compartilhados, como Header e Footer.

```json
{
  "id": "restaurante",
  "context": "home-page",
  "global": [
    {
      "header": {
        "menu": []
      },
      "footer": {
        "columns": []
      }
    }
  ],
  "page": [
    {
      "pageTitle": "Página inicial",
      "pageFields": [
        {
          "typeField": "title",
          "text": "Bem-vindo"
        }
      ]
    }
  ]
}
```

`pageTitle` é descritivo; a renderização dos componentes acontece por `pageFields`.

### Onde editar os dados

- **Mock local:** `src/util/pagebuilder.json`. É a cópia local de contingência, útil para desenvolvimento e quando a API estiver indisponível.
- **JSON externo:** o documento publicado na URL configurada em `PAGE_JSON_URL`. É a fonte usada normalmente pelo site. Mudanças feitas somente no mock não atualizam automaticamente o documento remoto, e vice-versa; mantenha-os sincronizados se quiser que ambos representem a mesma página.

O validador do `Template` verifica a estrutura principal antes de renderizar (por exemplo, `id`, `page` e `pageFields`). Ele não valida todos os atributos de cada componente. Use os nomes e tipos descritos neste documento e teste as alterações.

## Imagens e outros arquivos de mídia

As imagens podem ser usadas por URL, sem importar ou exportar os arquivos pelo código do site. A URL é guardada no JSON e o navegador carrega o recurso diretamente.

Os arquivos podem ser hospedados em qualquer serviço que permita acesso público por HTTPS. Por exemplo, este projeto usa um repositório separado para imagens e ícones:

[Luan-Leal/dynamic-page-assets](https://github.com/Luan-Leal/dynamic-page-assets)

Uma URL direta do GitHub Raw pode ter este formato:

```text
https://raw.githubusercontent.com/Luan-Leal/dynamic-page-assets/main/images/prato-1.webp
```

Também é possível usar a URL do GitHub com `?raw=true`, desde que o arquivo esteja público. Não coloque tokens, chaves ou credenciais nas URLs do JSON: tudo que é enviado ao navegador fica visível para quem acessa o site. Para fotos, WebP é uma boa opção; SVG funciona bem para ícones e ilustrações vetoriais.

## Componentes micros

Micros são componentes pequenos, usados isoladamente ou dentro de componentes complexos.

### Texto — `title` e `text`

Cria títulos e textos com uma tag HTML permitida.

```json
{
  "typeField": "title",
  "tag": "h2",
  "text": "Tradição, família e natureza",
  "color": "#28251F",
  "fontSize": "48px|40px",
  "fontFamily": "'Lora', Georgia, serif",
  "fontWeight": 500,
  "lineHeight": "1.2",
  "marginBottom": "16px|12px"
}
```

| Atributo | Descrição |
|---|---|
| `typeField` | `title` ou `text`. |
| `tag` | Tag HTML permitida. Em `title`, o padrão é `h1`; em `text`, `p`. |
| `text` | Conteúdo textual. |
| `color` | Cor CSS. |
| `fontSize` | Tamanho da fonte; aceita valor responsivo `desktop\|mobile`. |
| `fontFamily` | Família de fontes CSS. |
| `fontWeight` | Peso da fonte, como `400`, `500` ou `bold`. |
| `lineHeight` | Altura de linha CSS. |
| `marginBottom` | Margem inferior CSS. |

Tags de título disponíveis: `h1` a `h6`. Tags de corpo disponíveis: `p`, `span`, `strong`, `em`, `small`, `blockquote`, `mark` e `cite`. Tags inválidas são substituídas pelo padrão.

### Botão — `button`

```json
{
  "typeField": "button",
  "as": "a",
  "variant": "primary",
  "label": "Faça sua reserva",
  "link": "https://exemplo.com/reserva",
  "target": true,
  "icon": "schedule",
  "iconPosition": "left"
}
```

| Atributo | Descrição |
|---|---|
| `as` | `a` para link (padrão) ou `button` para botão de ação. |
| `label` | Texto exibido. |
| `link` | Destino quando `as` é `a`. |
| `target` | `true` abre o link em outra aba. |
| `variant` | `primary`, `outline` ou `text`. |
| `icon` | Opcional: `schedule` ou `arrow`. Sem esse campo, não mostra ícone. |
| `iconPosition` | `left` ou `right`; padrão à direita. A seta aponta para a esquerda quando `icon` é `arrow` e a posição é `left`. |

Quando `as` é `button`, propriedades padrão de botão HTML também podem ser usadas, como `disabled`.

### Imagem — `ImageComponent`

```json
{
  "typeField": "ImageComponent",
  "src": "https://exemplo.com/imagens/fachada.webp",
  "alt": "Fachada do restaurante",
  "width": "100%",
  "height": "auto",
  "objectFit": "cover",
  "objectPosition": "center",
  "borderRadius": "16px",
  "loading": "lazy",
  "decoding": "async"
}
```

| Atributo | Descrição |
|---|---|
| `src` | URL da imagem. |
| `alt` | Texto alternativo para acessibilidade. |
| `width` | Largura; padrão `100%`. |
| `height` | Altura; padrão `auto`. |
| `objectFit` | Ajuste da imagem, como `cover` ou `contain`. |
| `objectPosition` | Posição do recorte, como `center` ou `top`. |
| `borderRadius` | Arredondamento dos cantos. |
| `loading` | `lazy` adia o carregamento até a imagem se aproximar da tela; `eager` carrega imediatamente. |
| `decoding` | Estratégia de decodificação: `async`, `auto` ou `sync`. |

### Card de menu — `cardMenu`

```json
{
  "typeField": "cardMenu",
  "image": "https://exemplo.com/imagens/prato.webp",
  "title": "Prato da casa",
  "text": "Receita preparada com ingredientes frescos.",
  "hover": true
}
```

`image` é a imagem de fundo do card. `title` e `text` são opcionais; se ambos estiverem ausentes, vazios ou forem `null`, o card exibe apenas a imagem em tamanho integral. `hover: true` ativa, em telas maiores que 768px, a expansão da imagem e o recolhimento do texto ao passar o mouse. Em telas mobile, o hover não é aplicado. O mesmo card é usado pelo Carousel; nesse caso, `hover` é definido em cada item do array `CarouselItems`.

### Card informativo — `CardAboutUs`

```json
{
  "typeField": "CardAboutUs",
  "icon": "https://exemplo.com/icons/natureza.svg",
  "TextComponent": [
    {
      "typeField": "title",
      "tag": "h3",
      "text": "Contato com a natureza"
    },
    {
      "typeField": "text",
      "text": "Muito verde, ar puro e tranquilidade."
    }
  ]
}
```

| Atributo | Descrição |
|---|---|
| `icon` | URL do ícone/imagem. |
| `TextComponent` | Lista de componentes `title` e/ou `text` que formam o conteúdo do card. |

## Componentes complexos

Componentes complexos agrupam conteúdo ou outros componentes. Podem ser colocados em `pageFields` ou, quando indicado, em células de um Grid.

### Grid

O Grid organiza células e pode conter micros, componentes complexos ou outros grids. As células são os objetos do array `columns`.

```json
{
  "typeField": "grid",
  "id": "sobre",
  "columns": [
    {
      "typeField": "ImageComponent",
      "src": "https://exemplo.com/imagens/espaco.webp",
      "alt": "Área externa",
      "objectFit": "cover"
    },
    {
      "TextComponent": [
        {
          "typeField": "title",
          "tag": "h2",
          "text": "Nosso espaço"
        }
      ]
    }
  ],
  "gap": "32px",
  "backgroundColor": "#FBF8F1",
  "padding": "64px 0"
}
```

| Atributo do Grid/célula | Descrição |
|---|---|
| `id` | Identificador HTML da seção, útil para links como `#sobre`. |
| `columns` | Array de células. O nome representa as áreas/células, e não precisa corresponder literalmente a colunas verticais. |
| `typeField` | Na célula, pode identificar diretamente um componente, como `ImageComponent`, `CardAboutUs`, `cardMenu`, `accordion`, `button` ou outro `grid`. |
| `TextComponent` | Lista de textos renderizados dentro da célula. |
| `components` | Lista de componentes aninhados na célula. |
| `columns` (na célula) | Cria um Grid interno. Grids internos não recebem a classe global `template`. |
| `direction` | Sem valor, usa CSS Grid; com `row`, `row-reverse`, `column` ou `column-reverse`, organiza com Flexbox. Em mobile, as opções flexíveis empilham em coluna. |
| `gap` | Espaçamento geral entre células/itens. |
| `rowGap` | Espaçamento entre linhas; substitui `gap` no eixo das linhas. |
| `columnGap` | Espaçamento entre colunas; substitui `gap` no eixo das colunas. |
| `alignItems` | Alinhamento no eixo transversal da célula. Aceita valor único ou `desktop\|mobile`. |
| `justifyContent` | Alinhamento no eixo principal da célula. Aceita valor único ou `desktop\|mobile`. |
| `textAlign` | Alinhamento do texto, como `left`, `center` ou `right`. |
| `backgroundColor` | Cor de fundo; por padrão é transparente. |
| `backgroundImage` | URL da imagem de fundo. |
| `padding` | Espaçamento interno do Grid. |
| `title` | Título opcional da célula. |
| `logo` / `alt` | Imagem e texto alternativo opcionais da célula. |

No Grid, `alignItems` e `justifyContent` também podem ser definidos no objeto principal como padrão para as células; a configuração individual da célula tem prioridade. Para um botão à direita e centralizado verticalmente, por exemplo, use `alignItems: "end"` e `justifyContent: "center"` na célula.

### Header

O Header fica em `global[0].header`, fora de `pageFields`.

```json
{
  "header": {
    "logo": "https://exemplo.com/imagens/logo.webp",
    "fixed": true,
    "menu": [
      { "label": "Início", "link": "#" },
      { "label": "Sobre", "link": "#sobre" }
    ],
    "button": {
      "hasButton": true,
      "label": "Faça sua reserva",
      "link": "https://exemplo.com/reserva",
      "target": true
    }
  }
}
```

| Atributo | Descrição |
|---|---|
| `logo` | URL do logo. |
| `fixed` | `true` fixa o Header no topo durante a rolagem; `false` ou omitido usa posicionamento absoluto no topo. |
| `menu` | Lista de links com `label` e `link`. |
| `button` | CTA opcional: `hasButton` controla sua exibição; `label`, `link` e `target` configuram o link. O ícone de agenda e o estilo desse CTA são definidos pelo Header. |

Até 768px, o menu vira um overlay vertical com botão hambúrguer. O overlay bloqueia a rolagem da página; fecha ao selecionar um link, pressionar `Escape` ou redimensionar para desktop.

### Footer

O Footer fica em `global[0].footer`.

```json
{
  "footer": {
    "backgroundColor": "#34452D",
    "copyright": "© {{year}} Restaurante. Todos os direitos reservados.",
    "columns": [
      {
        "title": "Contato",
        "fontColor": "#F5F0E5",
        "fontFamily": "'Lora', Georgia, serif",
        "fontSize": "20px",
        "options": [
          { "label": "Como chegar", "link": "https://maps.google.com/" },
          {
            "TextComponent": [
              { "typeField": "text", "text": "Aberto aos fins de semana." }
            ]
          }
        ],
        "socialMedia": [
          { "icon": "Instagram", "link": "https://instagram.com/" },
          { "icon": "Whatsapp", "link": "https://wa.me/5500000000000" }
        ]
      }
    ]
  }
}
```

| Atributo | Descrição |
|---|---|
| `backgroundColor` | Cor de fundo do Footer. |
| `copyright` | Texto de direitos autorais. `{{year}}` é substituído pelo ano atual. |
| `columns` | Colunas de conteúdo; em mobile, são empilhadas. Se omitido ou vazio, é renderizada uma coluna vazia. |
| `columns[].title` | Título da coluna; pode ser `false` para ocultá-lo. |
| `columns[].logo` | URL do logo da coluna. |
| `columns[].description` | Descrição opcional. |
| `columns[].fontColor` | Cor usada nos títulos/links da coluna. |
| `columns[].fontFamily` | Família de fonte do título da coluna. |
| `columns[].fontSize` | Tamanho do título da coluna. |
| `columns[].options` | Links (`label` e `link`) ou objetos com `TextComponent`. |
| `columns[].socialMedia` | Lista de redes com `icon` e `link`. Os nomes de ícone reconhecidos são `Instagram` e `Whatsapp` (sem distinção de maiúsculas/minúsculas). |

### Accordion

O Accordion (ou acordeão) é expansível, podendo ser colocado como `typeField: "accordion"` em `pageFields`, `columns` ou `components`.

```json
{
  "typeField": "accordion",
  "quest": "Quais são os dias de funcionamento?",
  "answer": "Funcionamos aos sábados, domingos e feriados, das 10h às 18h.",
  "accordionColor": "#FFFFFF"
}
```

`quest` é a pergunta, `answer` é a resposta e `accordionColor` é a cor de fundo do item. O botão alterna entre `+` e `−` e anima a abertura da resposta.

### Banner

```json
{
  "typeField": "banner",
  "id": "inicio",
  "bannerImage": "https://exemplo.com/imagens/banner.webp",
  "TextComponent": [
    {
      "typeField": "title",
      "tag": "h1",
      "text": "Natureza que acalma",
      "fontSize": "58px|48px"
    },
    {
      "typeField": "text",
      "text": "Uma descrição do restaurante."
    }
  ],
  "Button": [
    {
      "typeField": "button",
      "as": "a",
      "label": "Conheça o espaço",
      "link": "#sobre",
      "variant": "outline"
    }
  ]
}
```

| Atributo | Descrição |
|---|---|
| `id` | Identificador da seção. |
| `bannerImage` | URL da imagem de fundo. |
| `TextComponent` | Conteúdo de texto renderizado com micros `title`/`text`. |
| `Button` | Lista de micros `button`. |
| `title` e `text` | Alternativa simples quando `TextComponent` não é informado. |

### Carousel

```json
{
  "typeField": "carousel",
  "id": "pratos",
  "backgroundColor": "#FBF8F1",
  "dots": false,
  "dotsOnMobile": true,
  "infinite": true,
  "marquee": false,
  "removeMarqueeOnMobile": false,
  "removeArrowsOnMobile": true,
  "marqueeSpeed": 40,
  "TextComponent": [
    { "typeField": "title", "tag": "h2", "text": "Pratos em destaque" }
  ],
  "Button": [
    {
      "typeField": "button",
      "as": "a",
      "label": "Ver cardápio completo",
      "link": "#cardapio",
      "variant": "text",
      "icon": "arrow"
    }
  ],
  "CarouselItems": [
    {
      "image": "https://exemplo.com/imagens/prato.webp",
      "title": "Prato da casa",
      "description": "Preparado com ingredientes frescos.",
      "hover": true
    }
  ]
}
```

| Atributo | Descrição |
|---|---|
| `id` | Identificador da seção. |
| `backgroundColor` | Cor de fundo. |
| `TextComponent` | Lista de micros de texto exibida no cabeçalho. |
| `Button` | Lista de micros de botão exibida no cabeçalho. |
| `CarouselItems` | Itens com `image` e campos opcionais `title`, `description` e `hover`. |
| `dots` | Exibe os indicadores de navegação. |
| `dotsOnMobile` | Força os indicadores em mobile, mesmo com `dots: false`. |
| `infinite` | Faz as setas continuarem do último grupo para o primeiro e vice-versa. |
| `marquee` | Ativa rolagem automática contínua. |
| `marqueeSpeed` | Velocidade do marquee em pixels por segundo; padrão `40`. |
| `removeMarqueeOnMobile` | Desativa o marquee no mobile e força a exibição dos dots. |
| `removeArrowsOnMobile` | Esconde as setas no mobile; o usuário ainda pode trocar de slide deslizando horizontalmente. |

O número de cards visíveis varia com a largura: até 768px é exibido um card por vez; em larguras intermediárias, dois; em telas maiores, até quatro. Com `marquee: true`, os itens são duplicados para criar o ciclo contínuo. A animação respeita `prefers-reduced-motion`.

## Responsividade

Alguns atributos aceitam dois valores no mesmo campo separados por `|`: primeiro desktop e depois mobile, aplicado até 767px. Sem o separador, o valor vale em todos os tamanhos.

```json
{
  "fontSize": "58px|40px",
  "marginBottom": "24px|12px"
}
```

Essa convenção é suportada pelas propriedades de estilo do componente de texto e pelos alinhamentos `alignItems`/`justifyContent` das células do Grid. Não use `|` em atributos sem suporte responsivo.

## Adicionar um novo tipo de componente

Para que um componente possa ser declarado em `pageFields`, adicione seu tipo à união `PageField` e inclua um renderer em `fieldRegistry` no `PageGenerator`. Para aceitar o componente dentro de grids, atualize também o tipo `GridCell` se ele exigir campos próprios. Se o componente precisar ser carregado no JSON, a validação de estrutura do `Template` já permite qualquer objeto de `pageFields` que tenha `typeField` como string; a validação completa dos atributos continua sendo responsabilidade do tipo e do renderer.
