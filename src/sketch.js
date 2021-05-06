
const model_url =
  'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let pitch;
let mic;

let width = 1300;
let height = 400;

let noteDots = [];
let show = true;
let strings = [];

let currentNote = '';

function setup() {
  // put setup code here    
  let canvas = createCanvas(width, height); 
  canvas.parent("sketch");

  button = createButton('start microphone');
  button.position(width/2, height - 60);
  button.parent("sketch");
  button.mousePressed(startListening); 

  button = createButton('Hide Notes / Start Game');
  button.position(width/2, height - 30);
  button.parent("sketch");
  button.mousePressed(startGame);  


  //let c = new NoteDot('E', 30, 30, 30);
  //noteDots.push(c);


  let scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  let notes = ['E', 'B', 'G', 'D', 'A', 'E'];
  let offsetY = 37;
  let startY = 25;
  for (let s = 0; s < notes.length; s++) {
    let n = notes[s];

    let string = new StringNotes();
    string.setup(n, 30, startY, width * 0.074);
    noteDots.push(string);

    startY += offsetY;
  }

  // setup the strings
  let stringY = 210;
  let stringWeight = 10;
  for (let i = 0; i < 6; i++) {
    let s = new GuitarString(20, stringY, width * 0.9, stringWeight);
    strings.push(s);
    stringY -= 37;
    stringWeight -= 1;
  }  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startListening(){
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening, listeningError);    
}

function listening() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded)
}

function listeningError() {
  let p = createP("Check if microphone is blocked");
  p.position(width/2 -30, height - 40);
  p.parent("sketch");
}

function modelLoaded() {
  //console.log('model loaded');
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      const midiNum = freqToMidi(frequency);

      //console.log(midiNum);

      currentNote = MidiDictionary.midiToNote(midiNum); //scale[midiNum % 12];

      //console.log(currentNote);

      select('#currentNote').html(currentNote.note);
      select('#currentOctave').html(currentNote.octave);
    }
    getPitch();
  });
}

function startGame() {
  show = !show;
}

function draw() {
  // put drawing code here  
  background(200);

  translate(30, 20);

  // fret board
  fill(107, 68, 35);
  rect(20, 20, width * 0.9, 200);

  // nut
  fill(255, 247, 230);
  rect(20, 20, 30, 200);

  // frets
  fill(201, 192, 187);
  let fretX = 120;
  for (let i = 0; i < 12; i++) {
    rect(fretX, 20, 20, 200);
    fretX += width * 0.0735;
  }

  // draw the strings
  for (let i = 0; i < strings.length; i++) {
    strings[i].draw();
  }

  // draw the notes
  for (let i = 0; i < noteDots.length; i++) {
    noteDots[i].showNotes(show);
    noteDots[i].draw();
  }



}


