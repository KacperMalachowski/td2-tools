import { Link } from "gatsby";
import React from "react";
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <main>
      <Helmet htmlAttributes={{ lang: 'pl' }}>
        <title>My BLog</title>
      </Helmet>
      <h1>Hello World</h1>
      <Link to="/train-number">
        Generator numerów dla TD2
      </Link>
    </main>
  );
}
