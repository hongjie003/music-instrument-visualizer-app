// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { ChartBubblePacked16, NonCertified16 } from '@carbon/icons-react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface GuitarKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the guitar key
}

let colors = ['red', 'light-red', 'orange', 'yellow', 'light-yellow', 'green', 'light-green', 'blue', 'light-blue', 'purple', 'pink']

let uniqueRandoms:number[] = [];
let numRandoms = 10;
function makeUniqueRandom() {
    if (!uniqueRandoms.length) {
        for (let i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    let index = Math.floor(Math.random() * uniqueRandoms.length);
    let val = uniqueRandoms[index];

    uniqueRandoms.splice(index, 1);

    return val;

}

let randomColor = () => colors[makeUniqueRandom()];

export function GuitarKey({
  note,
  synth,
  minor,
  index,
}: GuitarKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the guitar.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('br2 bb bl pointer absolute dim grow', {
        'bg-hot-pink h3': minor, // minor keys are black
        'h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        color: randomColor(),
        borderWidth: '6px',
        borderTopWidth: '10px',
        borderLeftColor: 'pink',
        borderLeftWidth: '5px',
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.5rem' : 0,
      }}
    ></div>
  );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);
  const guitarSampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3"
  },
  baseUrl: `${process.env.PUBLIC_URL}/samples/acoustic-guitar/`,
    
  }).toDestination();
  
  // Tone.loaded().then(() => {
  //   guitarSampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
  // })

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <GuitarKey
                key={note} //react key
                note={note}
                synth={guitarSampler}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('avannak', Guitar, 'MEMBRANE_SYNTH');
