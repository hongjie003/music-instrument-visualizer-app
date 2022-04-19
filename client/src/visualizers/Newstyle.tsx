import * as Tone from 'tone';
import P5 from 'p5';


import { Visualizer } from '../Visualizers';

export const newWaveformVisualizer = new Visualizer(
    'Ireland Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
  
    p5.background(0,128,128);
    

    p5.angleMode(p5.DEGREES)
    

    p5.translate(width/2, height/2)

    const values = analyzer.getValue();
    for(let i = 0; i < values.length; i++ ){
        const amplitude = values[i] as number;
        const x = p5.map(i, 30, values.length - 1, 20, width);
        const y = height / 1.8 + amplitude * height;

        p5.push()
        p5.rotate(Math.sin(p5.frameCount + i) * 90)
        
        p5.noFill();

        p5.strokeJoin(p5.MITER);

        let black_one = p5.map(Math.sin(p5.frameCount), 0,0,0,0)
        let black_two = p5.map(Math.sin(p5.frameCount), 0,0,0,0)
        let black_three = p5.map(Math.sin(p5.frameCount), 0,0,0,0)

        p5.stroke (black_one, black_two, black_three)
        p5.strokeWeight(1.5)
        p5.rect(x, y, width - i * 2, height -i, i )
        // p5.rect(x,y,width - i * 3, height - i * 3, 200 - i);

        p5.pop()
    }
    
   
    
    
    // p5.beginShape();
    // for (let i = 0; i <= values.length; i++) {
        
    //     const amplitude = values[i] as number;
    //     const x = p5.map(i, 30, values.length - 1, 20, width);
    //     const y = height / 2 + amplitude * height;
    //     // Place vertex

    //     p5.line(y, x, y, x);
    //     p5.square(x, y, 40);
        
        
    // }
    // p5.endShape();
    
    },
  );

