import React from 'react';
import { Link } from 'react-router-dom';

import ARButtonLink from '../ARButtonLink';

import '../../styles/sass/pages/_ar-home.scss';

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
                <ARButtonLink
                  buttonClass="ar-btn hover-slide-right"
                  href="/colorgen"
                  displayText="discovery"
                />
                <ARButtonLink
                  buttonClass="ar-btn hover-slide-right"
                  href="/colorgen"
                  displayText="voyager"
                />
                <ARButtonLink
                  buttonClass="ar-btn hover-slide-right"
                  href="/colorgen"
                  displayText="mariner"
                />
                <ARButtonLink
                  buttonClass="ar-btn hover-slide-right"
                  href="/colorgen"
                  displayText="passage"
                />
                <ARButtonLink
                  buttonClass="ar-btn hover-slide-right"
                  href="/colorgen"
                  displayText="origin"
                />
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
