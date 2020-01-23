import { App, AppProps, PreloadData } from "@monoglot/common";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom";
import * as React from "react";

export function main() {
  const preloadData = JSON.parse(
    document.getElementById("preload")!.innerHTML
  ) as PreloadData;

  const appProps: AppProps = {
    loadDate: preloadData.loadDate,
    loadColor: preloadData.loadColor
  };

  ReactDOM.hydrate(
    <BrowserRouter>
      <App {...appProps} />
    </BrowserRouter>,
    document.getElementById("app")
  );
}

main();
