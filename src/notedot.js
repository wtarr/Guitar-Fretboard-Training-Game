class NoteDot {

  note;
  x;
  y;
  radius;
  show;

  constructor(note, x, y, radius) {
    this.note = note;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.show = true;
  }

  toggle() {
    this.show = !this.show;
  }

  draw() {

    if (this.show) {


      push();

      fill(65, 181, 109);

      circle(this.x, this.y, this.radius);

      pop();


      push();

      fill(255, 255, 255);

      textSize(20);

      textAlign(CENTER, CENTER);

      text(this.note, this.x, this.y);

      pop();
    }
  }
}
