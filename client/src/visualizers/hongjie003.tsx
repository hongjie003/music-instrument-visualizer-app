// hongjie003
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

let particles: Particle[] = [];

export const Hongjie003Visualizer = new Visualizer(
  'hongjie003',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth - 200;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    const circleSize = 1.5;
    const values = analyzer.getValue(); // 256 waves

    let ampMax: number = -Infinity;
    values.forEach(val => ampMax = Math.max(val as number, ampMax));

    const scaleAmpMax = p5.map(ampMax, -1, 1, 0, 1000);
    

    p5.background([130,130,200]);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255);
    p5.noFill();

    p5.translate(width / 2, height / 2); // Move to center


    // The t is to make a left half circle and right half circle
    for (let t = -1; t <= 1; t +=2){
      p5.beginShape();
      for (let i = 0; i <= 180; i += 0.5) {
        const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
        const amplitude = values[index] as number;
  
        var r = p5.map(amplitude, -1, 1, 150, 350); // Half right circle
  
        // divide by 2 to sale down
        // TODO: make dynamic
        const x = r * p5.sin(i) * t / circleSize;
        const y = r * p5.cos(i) / circleSize;
        p5.vertex(x, y);
      }
      p5.endShape();
    }

    if(scaleAmpMax > 600) {
      for(let i = 0; i < 7; i++) {
        const p = new Particle(circleSize, p5);
        particles.push(p);
      }
    }

    for (let i = particles.length - 1; i >=0; i--) {
      if(!particles[i].edges(window.innerWidth, window.innerHeight)) {
        particles[i].update(scaleAmpMax > 600);
        particles[i].show();
      } else {
        particles.splice(i, 1);
      }
    }
  }
)

class Particle {
  private circleSize: number;
  private pos: P5.Vector;
  private acc: P5.Vector;
  private w: number;
  private p5: P5;
  private color: number[];

  constructor(circleSize: number, p5: P5) {
    this.circleSize = circleSize;
    this.p5 = p5;
    this.pos = P5.Vector.random2D().mult(250);
    this.acc = this.pos.copy().mult(p5.random(0.006, 0.002));
    this.color = [p5.random(150, 255), p5.random(150, 255), p5.random(150, 255)];

    this.w = p5.random(2, 8);
  }

  update(cond: boolean) {
    this.pos.add(this.acc);
    if (cond) {
      this.pos.add(this.acc);
      this.pos.add(this.acc);
      this.pos.add(this.acc);
      this.pos.add(this.acc);
      this.pos.add(this.acc);
      this.pos.add(this.acc);
    }
  }

  edges(width: number, height: number) {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 ||
      this.pos.y < -height / 2 || this.pos.y > height / 2) {
        return true;
    } else {
      return false;
    }
  }

  show() {
    this.p5.noStroke();
    this.p5.fill(this.color);
    this.p5.square(this.pos.x / this.circleSize, this.pos.y / this.circleSize, this.w);
  }
}