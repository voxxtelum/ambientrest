import React from 'react';
import { Link } from 'react-router-dom';

interface TButtonProps {
  buttonClass: string;
  displayText: string;
  href: string;
}

const ARButtonLink: React.FC<TButtonProps> = (props) => {
  return (
    <button className={props.buttonClass}>
      <span>
        <Link to={props.href}>{props.displayText}</Link>
      </span>
    </button>
  );
};

export default ARButtonLink;
