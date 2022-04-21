// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { UkuleleInstrument as Hongjie003Instrument } from './instruments/hongjie003'; // Ukulele
import { newWaveformVisualizer } from './visualizers/shamarireland79-1';
import { avannak_WaveformVisualizer } from './visualizers/avannak-Visualizer'
import { WaveformVisualizer } from './visualizers/Waveform';
import { Hongjie003Visualizer } from './visualizers/hongjie003';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, Hongjie003Instrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, newWaveformVisualizer, Hongjie003Visualizer, avannak_WaveformVisualizer]);    // similar to Visualizer[]


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