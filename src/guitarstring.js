class GuitarString {

  x;
  y;
  length;
  thickness;

  constructor(x, y, length, thickness) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.thickness = thickness;
  }

  draw() {

    push();

    strokeWeight(this.thickness);

    stroke(218, 145, 0);

    line(this.x, this.y, this.length, this.y);

    pop();
  }
}
