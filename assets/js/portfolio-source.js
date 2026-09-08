const PORTFOLIO_SOURCE = 'https://raw.githubusercontent.com/Edson-Mambo/Edson_Mambo-Portifolio/main/index.html';
const SOURCE_REPO = 'https://github.com/Edson-Mambo/Edson_Mambo-Portifolio';

async function loadOriginalPortfolio() {
  const container = document.getElementById('original-portfolio');
  if (!container) return;

  try {
    const response = await fetch(PORTFOLIO_SOURCE, { cache: 'no-store' });
    if (!response.ok) throw new Error('Não foi possível carregar o portfólio original.');

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const main = doc.querySelector('main');
    if (!main) throw new Error('Estrutura do portfólio original não encontrada.');

    const base = document.createElement('base');
    base.href = 'https://edson-mambo.github.io/Edson_Mambo-Portifolio/';

    const frame = document.createElement('iframe');
    frame.title = 'Portfólio original de Edson Mambo';
    frame.loading = 'lazy';
    frame.className = 'original-portfolio-frame';
    frame.setAttribute('scrolling', 'no');

    const sourceDoc = doc.documentElement.cloneNode(true);
    sourceDoc.querySelector('head')?.prepend(base);
    const body = sourceDoc.querySelector('body');
    if (body) {
      body.innerHTML = '';
      body.appendChild(main.cloneNode(true));
    }

    const styles = Array.from(doc.querySelectorAll('link[rel="stylesheet"], style'))
      .map(node => node.outerHTML).join('');
    const scripts = Array.from(doc.querySelectorAll('script'))
      .map(node => node.outerHTML).join('');

    const embedded = '<!doctype html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">' + styles + '</head><body>' + body.innerHTML + scripts + '</body></html>';
    frame.srcdoc = embedded;
    container.replaceChildren(frame);

    frame.addEventListener('load', () => {
      try {
        const height = frame.contentDocument.documentElement.scrollHeight;
        frame.style.height = Math.max(height, 900) + 'px';
      } catch (_) {
        frame.style.height = '1400px';
      }
    });

    const sourceLink = document.getElementById('portfolio-source-link');
    if (sourceLink) sourceLink.href = SOURCE_REPO;
  } catch (error) {
    container.innerHTML = '<div class="source-error"><strong>Portfólio original temporariamente indisponível.</strong><p>A ligação continua configurada para o repositório original do Edson Mambo.</p><a href="' + SOURCE_REPO + '" target="_blank" rel="noopener">Abrir portfólio original no GitHub ↗</a></div>';
  }
}

document.addEventListener('DOMContentLoaded', loadOriginalPortfolio);
