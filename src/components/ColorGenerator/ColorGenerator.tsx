import React, { useState, useEffect, useCallback } from 'react';

import '../../styles/sass/pages/_color-generator.scss';

import ColorGenHeader from '../ColorGenHeader';

import { Colord, colord, getFormat, random } from 'colord';
import { Format } from 'colord/types';

const ColorGenerator = () => {
  interface FormValues {
    colorHex?: string;
    colorName?: string;
    colorIterations?: number;
    colorStrength?: number;
    colorLighten?: boolean;
    formError?: boolean;
    [key: string]: string | number | boolean | undefined;
  }

  interface ColorScheme {
    colorScheme?: string | number | boolean | undefined;
    colorBG?: string;
    colorText?: string;
    error?: string;
  }

  const [formValues, setFormValues] = useState<FormValues[]>([
    {
      colorHex: '#fddd72',
      colorName: 'one',
      colorIterations: 5,
      colorStrength: 0.05,
      colorLighten: false,
    },
    {
      colorHex: '#0ac2ff',
      colorName: 'two',
      colorIterations: 5,
      colorStrength: 0.05,
      colorLighten: false,
    },
  ]);

  const [colorScheme, setColorScheme] = useState<ColorScheme[]>([
    {
      colorScheme: '',
      error: '',
    },
  ]);

  const [colorLen, setColorLen] = useState(2);

  const generateColorSchemeOutput = useCallback(
    (colorValues: FormValues[]): ColorScheme[] => {
      let colorSchemeOutput: ColorScheme[] = [];
      colorValues.forEach((row) => {
        if (!row.colorHex) {
          colorSchemeOutput.push({
            colorScheme: '',
            error: `Add a valid Hex color to begin.`,
          });
        }

        if (row.colorHex) {
          let colorFormat = getFormat(row.colorHex.trim()) as Format;

          if (colorFormat !== 'hex') {
            colorSchemeOutput.push({
              colorScheme: '',
              error: `Color is not a valid Hex.`,
            });
          }

          if (colorFormat === 'hex') {
            let value = row.colorHex.trim();
            let name = row.colorName?.trim() || value;
            let iterations = row.colorIterations || 5;
            let strength = row.colorStrength || 0.05;
            let lighten = row.colorLighten || false;

            colorSchemeOutput.push({
              colorScheme: `// ${name} - ${value.toUpperCase()} iterations:${iterations} strength:${strength} lighten:${lighten}`,
              error: '',
            });

            for (let i = 0; i < iterations; i++) {
              let colorBG: Colord;
              let colorText: string = '';

              if (lighten === true) {
                colorBG = colord(value).lighten(i * strength);
              } else {
                colorBG = colord(value).darken(i * strength);
              }

              let colorShade: string = colorBG.toHslString();
              let colorString = `--${name}-${i + 1}: ${colorShade};`;

              if (colorBG.isLight()) {
                colorText = '#000000';
              }

              colorSchemeOutput.push({
                colorScheme: colorString,
                colorBG: colorBG.toHex(),
                colorText: colorText,
                error: '',
              });
            }
            colorSchemeOutput.push({
              colorScheme: ' ',
              error: '',
            });
          }
        }
      });
      return colorSchemeOutput;
    },
    []
  );

  useEffect(() => {
    const colorSchemeOutput = generateColorSchemeOutput(formValues);
    setColorScheme(colorSchemeOutput);
  }, [generateColorSchemeOutput, formValues]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newFormValues = [...formValues];

    newFormValues[index][e.target.name] = e.target.value;
    setFormValues(newFormValues);

    const colorSchemeOutput = generateColorSchemeOutput(newFormValues);
    setColorScheme(colorSchemeOutput);
  };

  const handleCheckChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newFormValues = [...formValues];

    newFormValues[index][e.target.name] = e.target.checked;
    setFormValues(newFormValues);

    const colorSchemeOutput = generateColorSchemeOutput(newFormValues);
    setColorScheme(colorSchemeOutput);
  };

  const addNewColor = () => {
    let newColor = random().toHex();
    let newFormValues = [
      ...formValues,
      {
        colorHex: newColor,
        colorName: '',
        colorIterations: 5,
        colorStrength: 0.05,
      },
    ];
    setFormValues(newFormValues);
    const colorSchemeOutput = generateColorSchemeOutput(newFormValues);
    setColorScheme(colorSchemeOutput);

    setColorLen(newFormValues.length);
  };

  const removeColorRow = (index: number) => {
    let newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
    const colorSchemeOutput = generateColorSchemeOutput(newFormValues);
    setColorScheme(colorSchemeOutput);
    setColorLen(newFormValues.length);
  };

  return (
    <>
      <div className="color-generator ar-mono">
        <form className="color-form" autoComplete="off">
          <ColorGenHeader title="ColorGen" />
          <div className="color-form___input">
            {formValues.map((element, index) => (
              <div
                className="color-form___inline swing-in-top-fwd"
                key={index}
                role={'row'}
              >
                <div className="color-form___cell">
                  <input
                    type="color"
                    name="colorHex"
                    value={element.colorHex || ''}
                    onChange={(e) => handleChange(index, e)}
                    size={12}
                  ></input>
                  <label htmlFor="colorHex">Color</label>
                </div>
                <div className="color-form___cell">
                  <input
                    type="text"
                    name="colorName"
                    value={element.colorName || ''}
                    onChange={(e) => handleChange(index, e)}
                    size={16}
                  ></input>
                  <label htmlFor="colorName">Name</label>
                </div>
                <div className="color-form___cell">
                  <input
                    type="number"
                    name="colorIterations"
                    value={element.colorIterations || ''}
                    onChange={(e) => handleChange(index, e)}
                    min={1}
                    max={10}
                  ></input>
                  <label htmlFor="colorIterations">Iterations</label>
                </div>
                <div className="color-form___cell">
                  <input
                    type="number"
                    name="colorStrength"
                    value={element.colorStrength || ''}
                    onChange={(e) => handleChange(index, e)}
                    min={0.01}
                    max={0.1}
                    step={0.01}
                  ></input>
                  <label htmlFor="colorStrength">Strength</label>
                </div>
                <div className="color-form___cell">
                  <input
                    type="checkbox"
                    name="colorLighten"
                    checked={element.colorLighten || false}
                    onChange={(e) => handleCheckChange(index, e)}
                  ></input>
                  <label htmlFor="colorLighten">Lighten</label>
                </div>
                {colorLen === 1 ? (
                  ''
                ) : (
                  <div className="color-form___cell">
                    <button
                      className="color-form___remove"
                      type="button"
                      onClick={() => removeColorRow(index)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addNewColor()}>
            &#65291;
          </button>

          <div className="color-form___output">
            {colorScheme.map((element, index) => (
              <span
                style={{
                  backgroundColor: element.colorBG ? element.colorBG : '',
                  color: element.colorText ? element.colorText : '',
                }}
                className={`color-form___result ${
                  element.error ? 'color-form___error' : ''
                }`}
                key={index}
              >
                {element.error ? element.error : element.colorScheme}
              </span>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default ColorGenerator;
