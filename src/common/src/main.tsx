import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

export interface PreloadData {
  loadDate: string;
  loadColor: string;
}

export interface AppProps {
  loadDate: string;
  loadColor: string;
}

export const App = (props: AppProps) => {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>App</title>
      </Helmet>

      <div style={{ padding: "20px" }}>
        <h1
          style={{
            color: props.loadColor,
            borderColor: props.loadColor,
            borderWidth: "2px",
            borderStyle: "solid"
          }}
        >
          This is the headline
        </h1>
        <p>Loaded: {props.loadDate}</p>
        <p>Path: {location.pathname}</p>
        <p>Subitems:</p>
        <ul>
          <li>
            <Link to="one/">One</Link>
          </li>
          <li>
            <Link to="two/">Two</Link>
          </li>
          <li>
            <Link to="three/">Three</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
