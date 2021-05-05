class StringNotes {
  notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
  dots = [];
  show = false;
  startX;
  startY;
  offsetX;

  constructor() {
    this.dots = [];
  }

  setup(startNote, startX, startY, offsetX) {

    this.startX = startX;
    this.startY = startY;
    this.offsetX = offsetX;
    
    var noteOffset = this.notes.indexOf(startNote);

    var numberOfNotesPerString = this.notes.length + 1;

    for (var i = 0; i < numberOfNotesPerString; i++) {
      var notePointer = (i + noteOffset) % this.notes.length;       
      var note = new NoteDot(this.notes[notePointer],  startX, startY, 30);
      this.dots.push(note);

      startX += offsetX;

    }
  }

  showNotes(bool){
    show = bool;
  }

  draw(){
    for (var x = 0; x < this.dots.length; x++)
    {      
     
       this.dots[x].showNote(show);
       this.dots[x].draw();
    }

    
    
  }
}
