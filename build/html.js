const INCLUDE = /<!--\s*@include\s+([\w-]+)\s*-->/g;
const MARKER = /<!--\s*@render\s+([\w-]+)(?:\s+([^\s]+))?\s*-->/g;

/** Troca `<!-- @include NOME -->` pelo parcial, recursivamente. */
export function expandIncludes(html, readPartial, depth = 0) {
  if (depth > 10) throw new Error('Parciais incluídos em ciclo');
  return html.replace(INCLUDE, (_, name) => expandIncludes(readPartial(name), readPartial, depth + 1));
}

/** Troca `{{base}}` pelo caminho base do site. */
export function replaceBase(html, base) {
  return html.replaceAll('{{base}}', base);
}

/** Troca `<!-- @render NOME ARG? -->` pelo retorno do renderer. */
export function renderMarkers(html, renderers) {
  return html.replace(MARKER, (_, name, arg) => {
    const render = renderers[name];
    if (!render) throw new Error(`Renderer não encontrado: ${name}`);
    return render(arg);
  });
}
