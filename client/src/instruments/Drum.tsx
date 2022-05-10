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

interface DrumPadProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.MembraneSynth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function DrumPad({
  note,
  synth,
  index,
}: DrumPadProps): JSX.Element {
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
      className={classNames('ba pointer absolute dim', {
        'black bg-white h4': true, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        // left: `${index * 2}rem`,
        left: `${index * 10}rem`,
        zIndex: 0,
        background: 'grey',
        height: '10rem',
        width: '10rem',
        borderStyle: 'solid',
        borderWidth: '5px',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 100,
      }}
    ></div>
  );
}

function DrumType({ title, onClick, active }: any): JSX.Element {
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

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'A', idx: 0 },
    { note: 'Bb', idx: 1 },
    { note: 'B', idx: 2 },
    { note: 'C', idx: 3 },
    // { note: 'Db', idx: 4 },
    // { note: 'Eb', idx: 5},
    // { note: 'E', idx: 6 },
    // { note: 'F', idx: 7},
    // { note: 'Gb', idx: 9 },
    // { note: 'G', idx: 10 },
  ]);

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
      <div className="relative dib h4 w-100 ml4">
        {Range(1, 5).map(octave =>
          keys.map(key => {
            const note = `${key.note}${octave}`;
            return (
              <DrumPad
                key={note} //react key
                note={note}
                synth={synth as Tone.MembraneSynth}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
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

export const DrumInstrument = new Instrument('Drum', Drum, 'MEMBRANE_SYNTH');
