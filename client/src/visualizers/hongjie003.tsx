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
    
    const bgColor = [150, 140, 200];
    p5.background(bgColor);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255);
    p5.noFill();

    p5.translate(width / 2, height / 2); // Move to center

    // Create circle with different size
    for (let s = 1; s < 13; s += 0.08) {

      if(s > 2) s += 0.1; // Make inner circles closer

      if (s < 2) { // Outer circles black
        p5.stroke(50);
      } else { // Inner circles red
        p5.stroke([190, 100, 160]);
      }

      // The t is to make a left half circle and right half circle
      for (let t = -1; t <= 1; t +=2){
        p5.beginShape();
        for (let i = 0; i <= 180; i += 0.5) {
          const index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
          const amplitude = values[index] as number;
    
          var r = p5.map(amplitude, -1, 1, 150, 350); // Half right circle
    
          // divide by s to change scale
          const x = r * p5.sin(i) * t / circleSize / s;
          const y = r * p5.cos(i) / circleSize / s;
          p5.vertex(x, y);
        }
        p5.endShape();
      }
    }

    // Particles
    if(scaleAmpMax > 600) {
      const shapeAmount = p5.random(0, 2);
      for(let i = 0; i < shapeAmount; i++) {
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
  private shapeSize: number;
  private p5: P5;
  private pos: P5.Vector;
  private acc: P5.Vector;
  private w: number;
  private color: number[];
  
  private shapeVariant: number;

  constructor(shapeSize: number, p5: P5) {
    this.shapeSize = shapeSize;
    this.p5 = p5;
    this.pos = P5.Vector.random2D().mult(250);
    this.acc = this.pos.copy().mult(p5.random(0.006, 0.002));
    this.w = p5.random(8, 18);
    this.color = [p5.random(150, 255), p5.random(150, 255), p5.random(150, 255)];
    this.shapeVariant = Math.floor(p5.random(1, 4)); // 1, 2, 3
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
    // this.p5.square(this.pos.x / this.shapeSize, this.pos.y / this.shapeSize, this.w);
    // Music note shape
    this.p5.rect(this.pos.x / this.shapeSize, this.pos.y / this.shapeSize, this.w / 8, this.w); // Left Mid
    this.p5.ellipse((this.pos.x / this.shapeSize) - (this.w / 6), (this.pos.y / this.shapeSize) + (this.w), this.w / 2, this.w / 4); // Left Dot
    
    if(this.shapeVariant == 2){
      this.p5.rect(this.pos.x / this.shapeSize, this.pos.y / this.shapeSize, this.w / 2 , this.w / 4); // Top
    }
    
    if(this.shapeVariant == 3){
      this.p5.rect(this.pos.x / this.shapeSize, this.pos.y / this.shapeSize, this.w, this.w / 4); // Top
      this.p5.rect((this.pos.x / this.shapeSize) + (this.w * 7 / 8), this.pos.y / this.shapeSize, this.w / 8, this.w); // Right Mid
      this.p5.ellipse((this.pos.x / this.shapeSize) - (this.w / 4) + (this.w), (this.pos.y / this.shapeSize) + (this.w), this.w / 2, this.w / 4); // Right Dot
    }
  }
}