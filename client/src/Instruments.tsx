// 3rd party library imports
import React, { useState, useEffect } from "react";
import * as Tone from "tone";

// project imports
import { DispatchAction } from "./Reducer";
import { AppState } from "./State";

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

type ToneSynth = Tone.Synth | Tone.MonoSynth | Tone.MembraneSynth;
type SYNTH_TYPES = "SYNTH" | "MONO_SYNTH" | "MEMBRANE_SYNTH";

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: ToneSynth;
  setSynth: (f: (oldSynth: ToneSynth) => ToneSynth | Tone.MonoSynth | Tone.MembraneSynth) => void;
}

// Find the different instruments here : https://tonejs.github.io/docs/14.7.77/MonoSynth

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;
  public readonly synthType: SYNTH_TYPES;

  constructor(
    name: string,
    component: React.FC<InstrumentProps>,
    synthType: SYNTH_TYPES = "SYNTH" // change the instrument depending on this variable
  ) {
    this.name = name;
    this.component = component;
    this.synthType = synthType;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        "w-100 h3 bb b--light-gray flex justify-between items-center ph4"
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const synthType = instrument.synthType;

  /**
   * Get the right instrument (piano is Tone.Synth and flute is Tone.MonoSynth)
   */
  const toneSynth =
    synthType === "MONO_SYNTH"
      ? new Tone.MonoSynth({
          oscillator: { type: "sine" } as Tone.OmniOscillatorOptions,
        }).toDestination()
    : synthType === "MEMBRANE_SYNTH"
      ? new Tone.MembraneSynth({
          oscillator: { type: "sine" } as Tone.OmniOscillatorOptions,
      }).toDestination()
      : new Tone.Synth({
          oscillator: { type: "sine" } as Tone.OmniOscillatorOptions,
        }).toDestination();

  const [synth, setSynth] = useState(toneSynth);

  const notes = state.get("notes");

  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(" ");
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, "4n", time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction("STOP_SONG"));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {};
  }, [notes, synth, dispatch]);

  // Change synth each time we navigate to another instrument
  useEffect(() => {
    setSynth(toneSynth);
  }, [synthType]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={"bg-white absolute right-0 left-0"}
        style={{ top: "4rem" }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
        />
      </div>
    </div>
  );
};
