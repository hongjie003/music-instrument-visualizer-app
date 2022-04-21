// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const IvanVisualizer = new Visualizer(
  'Ivan-Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    // visualizer settings
    p5.background(54, 81, 94, 150);
    p5.strokeWeight(dim * 0.001);
    p5.stroke(255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape(p5.TRIANGLE_FAN);
    for (let i = 0; i < values.length; i++) {
        // let r = p5.random();
        // p5.fill(r);
        // p5.stroke(r * 5);
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = (height / 2) + amplitude * height;
        // Place vertex
        p5.vertex(x, y);
    }
    p5.endShape();
  },
);
