import { Config } from "./config";
import { Stats } from './types'

/**
 * This HTML file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = ({
  stats,
  content,
  config,
  css = ''
}: {
  stats: Stats
  content: string
  config: Config
  css?: string
}): string => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <base href="/">
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="theme-color" content="${config.app.THEME_COLOR}" />
      <title>${config.app.TITLE}</title>
      <link rel="manifest" href="${config.app.PUBLIC_URL}/manifest.json" />
      <link rel="shortcut icon" href="${config.app.PUBLIC_URL}/favicon.ico" />
      <script id="config-server-side">
        window.__CONFIG__ = ${JSON.stringify(config)};
      </script>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
      />
      ${stats.styles.map(filename => `<link rel="stylesheet" href="${config.app.DIST_URL}/${filename}" />`).join('\n')}
      <style id="jss-server-side">${css}</style>
    </head>
    <body>
      <div id="root">${content}</div>
      ${stats.scripts.map(filename => `<script src="${config.app.DIST_URL}/${filename}" crossorigin></script>`).join('\n')}
    </body>
  </html>`

export default html
