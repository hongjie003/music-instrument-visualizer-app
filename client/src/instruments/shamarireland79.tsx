// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List } from "immutable";
import React from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.MonoSynth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the flute key
}

function FluteType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames("dim pointer ph2 pv1 ba mr2 br1 fw7 bw1", {
        "b--saddlebrown": active,
        "gray b--saddlebrown": !active,
      })}
    >
      {title}
      <div
            className={classNames('ba b--burlywood w-100 dib v-base')}
        ></div>
    </div>
  );
}

function FluteHole({
  onMouseDown,
  onMouseUp,
  dimension,
}: {
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  dimension: number;
}): JSX.Element {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ backgroundColor: "#423224", height: dimension, width: dimension }}
    />
  );
}

function FluteDrawing({
  synth,
  keys,
}: {
  synth: Tone.MonoSynth;
  keys: List<{ note: string; idx: number }>;
}): JSX.Element {
  const octave = 6;
  const flutePart1 = keys.get(0);
  const note1 = `${flutePart1?.note}${octave}`;

  const flutePart2 = keys.slice(1, 4);
  const flutePart3 = keys.slice(4);

  return (
    <div
      style={{
        height: 80,
        width: 900,
        backgroundColor: "burlywood",
        display: "flex",
        alignItems: "center",
        paddingLeft: 35,
        marginLeft: 55,
        paddingRight: 35,
      }}
    >
      <div style={{ flex: 1 }}>
        <FluteHole
          onMouseDown={() => synth?.triggerAttack(`${note1}`)}
          onMouseUp={() => synth?.triggerRelease("+0.25")}
          dimension={35}
        />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          flex: "2.5",
          display: "flex",
          borderRadius: "50%",
          gap: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {flutePart2.map((x) => {
            const note = `${x?.note}${octave}`;
            return (
              <FluteHole
                onMouseDown={() => synth?.triggerAttack(`${note}`)}
                onMouseUp={() => synth?.triggerRelease("+0.25")}
                dimension={35}
              />
            );
          })}
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {flutePart3.map((x, index) => {
            const note = `${x?.note}${octave}`;
            const dimension = index === 1 ? 45 : 35;
            return (
              <FluteHole
                onMouseDown={() => synth?.triggerAttack(`${note}`)}
                onMouseUp={() => synth?.triggerRelease("+0.25")}
                dimension={dimension}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: "C", idx: 0 },
    { note: "Db", idx: 0.5 },
    { note: "D", idx: 1 },
    { note: "Eb", idx: 1.5 },
    { note: "E", idx: 2 },
    { note: "F", idx: 3 },
    { note: "Gb", idx: 3.5 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();

      return new Tone.MonoSynth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    "sine",
    "sawtooth",
    "square",
    "triangle",
    "fmsine",
    "fmsawtooth",
    "fmtriangle",
    "amsine",
    "amsawtooth",
    "amtriangle",
  ]) as List<OscillatorType>;

  return (
   
    <div className="pv4 gold">
      <FluteDrawing
        keys={keys}
        synth={synth as Tone.MonoSynth} // Specify the type for typescript
      />

  
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <FluteType
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

export const shamarireland79Instrument = new Instrument("shamarireland79- Flute", Flute, "MONO_SYNTH");
