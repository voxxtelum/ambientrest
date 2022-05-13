import React from 'react';

const ColorGenHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <section>
      <header className="color-form___header">
        <h1>{title}</h1>
      </header>
    </section>
  );
};

export default ColorGenHeader;
