import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/sass/components/_ar-home.scss';

const AmbientRest = () => {
  return (
    <>
      <div className="ar-home">
        <div className="ar-home___spacer"></div>
        <div className="ar-home___content">
          <div className="ar-home___content-cover">
            <h1 className="ar-h1 ar-home-h1">ЛMBIΞNT REST</h1>
          </div>
          <div className="ar-home___content-right ar-mono">
            <section>
              <h2 className="ar-h2 ar-home-h2">FORWARD</h2>
              <nav className="ar-home___content-nav">
                <Link className="ar-hover-border-1" to="/colorgen">
                  colorGen
                </Link>
                <Link to="/colorgen">discovery</Link>
                <Link to="/colorgen">voyager</Link>
                <Link to="/colorgen">mariner</Link>
                <Link to="/colorgen">passage</Link>
              </nav>
            </section>
          </div>
        </div>
        <div className="ar-home___spacer"></div>
      </div>
    </>
  );
};

export default AmbientRest;
