// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const avannak_WaveformVisualizer = new Visualizer(
  "avannak's visualizer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const ellipseMinSize = 1;
    const ellipseMaxSize = 10;
    const ellipseMinAmount = 10;
    const ellipseMaxAmount = 100;

    let ellipseSizes = [];
    let ellipsePositions = [];

    let ellipseAmount = p5.random(ellipseMinAmount, ellipseMaxAmount);

    for (let i = 0; i < ellipseAmount; i ++) {
      let ellipseSize = p5.random(ellipseMinSize, ellipseMaxSize);
      let ellipsePosition = p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height));
      ellipseSizes.push(ellipseSize);
      ellipsePositions.push(ellipsePosition);
  }

    for (let i = 0; i < ellipseSizes.length; i ++) {
      let ellipseSize = ellipseSizes[i];
      let ellipsePosition = ellipsePositions[i];
      p5.ellipse(ellipsePosition.x, ellipsePosition.y, ellipseSize, ellipseSize);
      
  }

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(255,30);
    p5.noStroke();
    p5.fill(40, 200, 40);
    
    p5.strokeWeight(dim * 0.01);
    p5.noFill();

    const values = analyzer.getValue();
    p5.strokeWeight(10);
    p5.beginShape();
  
    let o = Math.round, r = Math.random, s = 255;
    for (let i = 0; i < values.length; i++) {
      p5.fill('rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')');
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      p5.vertex(x, y);
    }

    
    p5.endShape();
  },
);


