
const model_url =
  'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let pitch;
let mic;

let width = 1600;
let height = 400;

let noteDots = [];
let show = true;
let strings = [];

let currentNote = '';

function setup() {
  // put setup code here    
  var canvas = createCanvas(width, height);
  canvas.parent("sketch");

  button = createButton('start microphone');
  button.position(width/2, height - 60);
  button.parent("sketch");
  button.mousePressed(startListening); 

  button = createButton('Hide Notes / Start Game');
  button.position(width/2, height - 30);
  button.parent("sketch");
  button.mousePressed(startGame);  


  //var c = new NoteDot('E', 30, 30, 30);
  //noteDots.push(c);


  var scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  var notes = ['E', 'B', 'G', 'D', 'A', 'E'];
  var offsetY = 37;
  var startY = 25;
  for (var s = 0; s < notes.length; s++) {
    var n = notes[s];

    var string = new StringNotes();
    string.setup(n, 30, startY, 100);
    noteDots.push(string);

    startY += offsetY;
  }

  // setup the strings
  var stringY = 210;
  var stringWeight = 10;
  for (var i = 0; i < 6; i++) {
    let s = new GuitarString(20, stringY, 1350, stringWeight);
    strings.push(s);
    stringY -= 37;
    stringWeight -= 1;
  }  
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
  var p = createP("Check if microphone is blocked");
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
  rect(20, 20, 1320, 200);

  // nut
  fill(255, 247, 230);
  rect(20, 20, 30, 200);

  // frets
  fill(201, 192, 187);
  var fretX = 120;
  for (var i = 0; i < 12; i++) {
    rect(fretX, 20, 20, 200);
    fretX += 100;
  }

  // draw the strings
  for (var i = 0; i < strings.length; i++) {
    strings[i].draw();
  }

  // draw the notes
  for (var i = 0; i < noteDots.length; i++) {
    noteDots[i].showNotes(show);
    noteDots[i].draw();
  }



}


