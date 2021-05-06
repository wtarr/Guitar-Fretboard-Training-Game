class StringNotes {
  constructor() {
    this.notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
    this.dots = [];
    this.show = false;
    this.startX;
    this.startY;
    this.offsetX;
  }

  setup(startNote, startX, startY, offsetX) {

    this.startX = startX;
    this.startY = startY;
    this.offsetX = offsetX;
    
    let noteOffset = this.notes.indexOf(startNote);

    let numberOfNotesPerString = this.notes.length + 1;

    for (let i = 0; i < numberOfNotesPerString; i++) {
      let notePointer = (i + noteOffset) % this.notes.length;       
      let note = new NoteDot(this.notes[notePointer],  startX, startY, 30);
      this.dots.push(note);

      startX += offsetX;
    }
  }

  showNotes(bool){
    show = bool;
  }

  draw(){
    for (let x = 0; x < this.dots.length; x++)
    {           
       this.dots[x].showNote(show);
       this.dots[x].draw();
    }   
    
  }
}
