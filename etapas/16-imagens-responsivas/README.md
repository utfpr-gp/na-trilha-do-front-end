# Etapa 16: imagens responsivas e leves

As ilustrações em SVG dos cartões e do carrossel viram imagens em **WebP** (com **JPEG** de reserva), em duas larguras, na pasta `img/trilhas/` (`salto-480.webp`, `salto-960.webp`…):

- `<picture>` com um `<source type="image/webp">` e o `<img>` em JPEG para navegadores sem WebP.
- `srcset` com as duas larguras (`480w`, `960w`) e `sizes` dizendo quanto da tela a foto ocupa (o mesmo grid do capítulo 7).
- `width` e `height` declarados, para o espaço ser reservado antes de a imagem chegar.
- `loading="lazy"` nas imagens que não aparecem logo de início.
- O `object-fit: cover` do mixin `cover-image()` (capítulo 14) mantém as fotos na proporção 4:3 sem distorcer.
