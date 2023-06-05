
const model_url =
  'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let pitch;
let mic;

let width = 1300;
let height = 500;

let noteDots = [];
let show = true;
let gameReady = false;
let gameStarted = false;
let strings = [];

let status = 'No model loaded press start microphone';
let currentNote = { note: "B", octave: 7 };
let noteToFind = "-";

let scale = [];

function setup() {
  // put setup code here    
  let canvas = createCanvas(width, height);
  canvas.parent("sketch");

  let btnW = 250;
  let padding = 30; // this is a deal breaker, its set in css
  button = createButton('start microphone');
  button.position(width / 2 - btnW / 2 + padding, height - 60);
  button.style(`width:${btnW}px`);
  button.parent("sketch");
  button.mousePressed(startListening);

  button = createButton('Hide Notes / Start Game');
  button.position(width / 2 - btnW / 2 + padding, height - 30);
  button.style(`width:${btnW}px`);
  button.parent("sketch");
  button.mousePressed(startGame);


  //let c = new NoteDot('E', 30, 30, 30);
  //noteDots.push(c);


  scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  let stdTuning = ['E', 'B', 'G', 'D', 'A', 'E'];
  let offsetY = 37;
  let startY = 25;
  for (let s = 0; s < stdTuning.length; s++) {
    let n = stdTuning[s];

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

function startListening() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening, listeningError);
  status = "Loading ...";
}

function listening() {
  status = "Ready";
  gameReady = true; 

  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded)
}

function listeningError() {
  status = "Check if microphone is blocked";
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {

    
    
    if (frequency) {     
      const midiNum = freqToMidi(frequency);
      currentNote = MidiDictionary.midiToNote(midiNum);
    }
    getPitch();
  });
}

function startGame() {
  show = !show;

  noteToFind = random(scale);
  gameStarted = true;
}

function draw() {
  // put drawing code here  

  if (mic)
  {
    let volume = mic.getLevel();
    console.log(volume); 
  }

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

  // Model
  push();
  fill(0, 0, 0);

  textSize(40);

  textAlign(CENTER, CENTER);

  text(status, width / 2, height - 170);
  pop();

  // draw current note
  var sqW = 60;
  var sqX = width / 2 - sqW / 2;
  var sqY = height - 150;

  square(sqX, sqY, sqW, 20);
  push();
  fill(0, 0, 0);

  textSize(40);

  textAlign(CENTER, CENTER);

  text(currentNote.note, sqX += 25, sqY + sqW / 2);

  pop();

  if (gameStarted) {
    updateGame();
  } 

}

function updateGame() {

  status = `Find the note ${noteToFind}`;

  if (currentNote.note === noteToFind) {
    noteToFind = random(scale);

  }
}


