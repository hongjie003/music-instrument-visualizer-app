// 3rd party
import { List, Map } from 'immutable';

// project dependencies
// instruments
import { PianoInstrument } from './instruments/Piano';
import { shamarireland79Instrument } from './instruments/shamarireland79';
import { UkuleleInstrument as Hongjie003Instrument } from './instruments/hongjie003'; // Ukulele
<<<<<<< HEAD
import { DrumInstrument as IvanDrumInstrument} from './instruments/Drum';
=======
import { GuitarInstrument as avannakInstrument} from './instruments/avannak';
>>>>>>> 3efe7ba698ac2979958d52c39bac4b4caa41e688

// visualizers
import { shamarireland79Visualizer } from './visualizers/shamarireland79';
import { avannak_WaveformVisualizer } from './visualizers/avannak-Visualizer'
import { WaveformVisualizer } from './visualizers/Waveform';
import { Hongjie003Visualizer } from './visualizers/hongjie003';
import { IvanVisualizer } from './visualizers/ivan-visualizer';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
<<<<<<< HEAD
const instruments = List([PianoInstrument, shamarireland79Instrument, Hongjie003Instrument, IvanDrumInstrument]);       // similar to Instrument[]
=======
const instruments = List([PianoInstrument, shamarireland79Instrument, Hongjie003Instrument, avannakInstrument]);       // similar to Instrument[]
>>>>>>> 3efe7ba698ac2979958d52c39bac4b4caa41e688

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, shamarireland79Visualizer, Hongjie003Visualizer, avannak_WaveformVisualizer, IvanVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});