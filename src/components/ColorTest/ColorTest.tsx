//import { stringify } from 'querystring';
import React, { useState } from 'react';

import { colord, getFormat } from 'colord';
import { Format } from 'colord/types';

const ColorTest = () => {
  interface ColorForm {
    colorValue?: string;
    colorName?: string;
  }

  interface ColorResponse {
    response?: string;
    responseType?: string;
  }

  const [color, setColor] = useState<ColorResponse | null>({});

  const [form, setForm] = useState<ColorForm>({});

  const generateColorResponse = (
    name: string,
    hex: string,
    iterations: number,
    strength: number
  ) => {
    let colorShades: string = '';
    for (let i = 0; i < iterations; i++) {
      const colorShade: string = colord(hex)
        .darken(i * strength)
        .toHslString();
      colorShades += `--${name}-${i + 1}:  ${colorShade} \n`;
    }
    const response = colorShades;
    const responseType = 'SUCCESS';
    return { response, responseType };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      colorValueField: { value: string };
      colorNameField: { value: string };
    };

    const colorValue = target.colorValueField.value.trim();
    const colorName = target.colorNameField.value.trim();
    const colorFormat = getFormat(colorValue) as Format;

    let colorArray: ColorResponse = {};

    if (colorFormat !== 'hex' || !colorFormat) {
      colorArray.response = 'Color needs to be Hex.';
      setColor(colorArray);
    }

    if (colorFormat === 'hex') {
      colorArray = generateColorResponse(colorName, colorValue, 5, 0.05);

      setColor(colorArray);
    }
  };

  return (
    <section className="App">
      <header className="App-header"></header>
      <form onSubmit={handleSubmit}>
        <label>
          Hex Color
          <input
            name="colorValueField"
            type="textarea"
            value={form.colorValue}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Name
          <input
            type="text"
            name="colorNameField"
            value={form.colorName}
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">submit</button>
      </form>

      <pre id="output">{color?.response || 'Add a color.'}</pre>
    </section>
  );
};

export default ColorTest;
