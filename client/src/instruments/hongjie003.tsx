// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
  row: number; // Top / Bottom Border Display
}

export function PianoKey({
    note,
    synth,
    //   minor,
    index,
    row,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('br bl pointer absolute dim grow bg-washed-red', {
        // 'bg-black black h3': minor, // minor keys are black
        // 'black bg-white h4': !minor, // major keys are white
        'black bg-white h2': true, // major keys are white
        'bt': row == 1, // Top border for top row,
        'bb': row == 4, // Bottom border for bottom row,

      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 1 - 7}rem`,
        // zIndex: minor ? 1 : 0,
        zIndex: 0,
        // width: minor ? '1.5rem' : '2rem',
        width: '5rem',
        // marginLeft: minor ? '0.25rem' : 0,
        marginLeft: 0,
      }}
    >
        <div
            className={classNames('ba b--dark-pink bw1 w-100 dib v-base')}
        ></div>
    </div>
  );
}

// eslint-disable-next-line
function PianoKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = [
    List([
      { note: 'A', idx: 0, octave: 4 },
      { note: 'Bb', idx: 5, octave: 4 },
      { note: 'B', idx: 10, octave: 4 },
      { note: 'C', idx: 8, octave: 5 },
      { note: 'Db', idx: 13, octave: 5 },
      { note: 'D', idx: 18, octave: 5 },
      { note: 'Eb', idx: 23, octave: 5 },
      { note: 'E', idx: 28, octave: 5 },
      { note: 'F', idx: 33, octave: 5 },
      { note: 'Gb', idx: 38, octave: 5 },
      { note: 'G', idx: 43, octave: 5 },
      { note: 'Ab', idx: 48, octave: 5 },
    ]),
    List([
      { note: 'E', idx: 0, octave: 4 },
      { note: 'F', idx: 5, octave: 4 },
      { note: 'Gb', idx: 10, octave: 4 },
      { note: 'G', idx: 15, octave: 4 },
      { note: 'Ab', idx: 20, octave: 4 },
      { note: 'A', idx: 25, octave: 4 },
      { note: 'Bb', idx: 30, octave: 4 },
      { note: 'B', idx: 35, octave: 4 },
      { note: 'C', idx: 33, octave: 5 },
      { note: 'Db', idx: 38, octave: 5 },
      { note: 'D', idx: 43, octave: 5 },
      { note: 'Eb', idx: 48, octave: 5 },
    ]),
    List([
    { note: 'C', idx: 0, octave: 4 },
    { note: 'Db', idx: 5, octave: 4 },
    { note: 'D', idx: 10, octave: 4 },
    { note: 'Eb', idx: 15, octave: 4 },
    { note: 'E', idx: 20, octave: 4 },
    { note: 'F', idx: 25, octave: 4 },
    { note: 'Gb', idx: 30, octave: 4 },
    { note: 'G', idx: 35, octave: 4 },
    { note: 'Ab', idx: 40, octave: 4 },
    { note: 'A', idx: 45, octave: 4 },
    { note: 'Bb', idx: 50, octave: 4 },
    { note: 'B', idx: 55, octave: 4 },
    ]),
    List([
      { note: 'G', idx: 0, octave: 4 },
      { note: 'Ab', idx: 5, octave: 4 },
      { note: 'A', idx: 10, octave: 4 },
      { note: 'Bb', idx: 15, octave: 4 },
      { note: 'B', idx: 20, octave: 4 },
      { note: 'C', idx: 18, octave: 5 },
      { note: 'Db', idx: 23, octave: 5 },
      { note: 'D', idx: 28, octave: 5 },
      { note: 'Eb', idx: 33, octave: 5 },
      { note: 'E', idx: 38, octave: 5 },
      { note: 'F', idx: 43, octave: 5 },
      { note: 'Gb', idx: 48, octave: 5 },
    ])
  ];

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
        {Range(1, 5).map(string =>
            <div className="relative dib h2 w-100">
                {keys[string - 1].map(key => {
                    const note = `${key.note}${key.octave}`;
                    return (
                    <PianoKey
                        key={note} //react key
                        note={note}
                        synth={synth}
                        octave={key.octave}
                        index={(key.octave - 2) * 7 + key.idx}
                        row={string}
                        />
                        );
                    })}
            </div>
        )}

      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <PianoType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const UkuleleInstrument = new Instrument('hongjie003', Piano);
