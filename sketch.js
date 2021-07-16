// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Zm74MkiN9/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "Loading...";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(500,150);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320,240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the label

  fill(255);
  textSize(10);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  let emoji='Welcome';
  if (label == 'Background'){
    emoji = 'Welcome';
    textSize(50);
    text(emoji, width/2, height/2);
  }
  else if (label =='Face Masks'){
    emoji = '🟥Access Denied🟥\n Thanks for adhering to the COVID-19 Guidliness \n Please remove your Face Mask to get access';
    textSize(20);
    text(emoji, width/2, height/3);
  }
  else if (label =='Naked Faces'){
    emoji  = '🟩Access Granted🟩' ;
    textSize(35);
    text(emoji, width/2, height/2);

  }
  else if (label =='Caps'){
    emoji = '🟥Access Denied🟥 \n Please Remove Your Cap' ;
    textSize(25);
    text(emoji, width/2, height/2);
  }
  else if (label =='Face Covers'){
    emoji = '🟥Access Denied🟥 \n Please Remove Your Face Cover' ;
    textSize(25);
    text(emoji, width/2, height/2);
  }
  else if (label =='Helmet'){
    emoji = '🟥Access Denied🟥 \n Please Remove Your Helmet' ;
    textSize(25);
    text(emoji, width/2, height/2);
  }
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  console.log(results[0].label);

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}