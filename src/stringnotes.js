class StringNotes {
  notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
  dots = [];

  constructor() {
    this.dots = [];
  }

  setup(startNote, startX, startY, offsetX) {
    
    var noteOffset = this.notes.indexOf(startNote);

    var numberOfNotesPerString = this.notes.length + 1;

    for (var i = 0; i < numberOfNotesPerString; i++) {
      var notePointer = (i + noteOffset) % this.notes.length;       
      var note = new NoteDot(this.notes[notePointer],  startX, startY, 30);
      this.dots.push(note);

      startX += offsetX;

    }
  }

  draw(){
    for (var x = 0; x < this.dots.length; x++)
    {      
      this.dots[x].draw();
    }
  }
}
