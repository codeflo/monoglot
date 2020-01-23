import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import { App, AppProps, PreloadData } from "@monoglot/common";
import { StaticRouter } from "react-router-dom";

export type PrerenderContext = {
  location: string;
};

export async function prerender(context: PrerenderContext): Promise<string> {
  const preloadData: PreloadData = {
    loadDate: new Date().toISOString(),
    loadColor: getRandomColor()
  };

  const appProps: AppProps = {
    loadDate: preloadData.loadDate,
    loadColor: preloadData.loadColor
  };

  const clientString = ReactDOMServer.renderToString(
    <StaticRouter location={context.location}>
      <App {...appProps} />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <script src="/main.js" defer></script>
            <script id="preload" type="application/json">${JSON.stringify(
              preloadData
            )}</script>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">
                ${clientString}
            </div>
        </body>
    </html>
  `;

  return html;
}

function getRandomColor(): string {
  // https://stackoverflow.com/a/1484514
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
