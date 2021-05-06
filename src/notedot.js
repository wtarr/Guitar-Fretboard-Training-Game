class NoteDot {
  constructor(note, x, y, radius) {
    this.note = note;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.show = true;
  }

  showNote(show) {
    this.show = show;
  }

  draw() {

    push();

    fill(65, 181, 109);

    circle(this.x, this.y, this.radius);

    pop();

    //console.log(show);
    if (show) {

      push();

      fill(255, 255, 255);

      textSize(20);

      textAlign(CENTER, CENTER);

      text(this.note, this.x, this.y);

      pop();
    }
  }
}
