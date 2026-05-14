let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, () => {
    console.log("PoseNet Ready");
  });

  poseNet.on("pose", (results) => {
    poses = results;
  });

  stroke(255,0,190);
  strokeWeight(10);
}

function draw() {
  background(0);

  translate(width, 0);
  scale(-1, 1);

  if (poses.length > 0) {
    let pose = poses[0].pose;

    let nose = pose.nose;
    let leftShoulder = pose.leftShoulder;
    let rightShoulder = pose.rightShoulder;
    let leftElbow = pose.leftElbow;
    let rightElbow = pose.rightElbow;
    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;
    let leftHip = pose.leftHip;
    let rightHip = pose.rightHip;
    let leftKnee = pose.leftKnee;
    let rightKnee = pose.rightKnee;
    let leftAnkle = pose.leftAnkle;
    let rightAnkle = pose.rightAnkle;

    noFill();

    ellipse(nose.x, nose.y - 40, 50, 50);

    line(leftShoulder.x, leftShoulder.y, rightShoulder.x, rightShoulder.y);

    let midShoulderX = (leftShoulder.x + rightShoulder.x) / 2;
    let midShoulderY = (leftShoulder.y + rightShoulder.y) / 2;

    let midHipX = (leftHip.x + rightHip.x) / 2;
    let midHipY = (leftHip.y + rightHip.y) / 2;

    line(midShoulderX, midShoulderY, midHipX, midHipY);

    line(leftShoulder.x, leftShoulder.y, leftElbow.x, leftElbow.y);
    line(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y);

    line(rightShoulder.x, rightShoulder.y, rightElbow.x, rightElbow.y);
    line(rightElbow.x, rightElbow.y, rightWrist.x, rightWrist.y);

    line(leftHip.x, leftHip.y, leftKnee.x, leftKnee.y);
    line(leftKnee.x, leftKnee.y, leftAnkle.x, leftAnkle.y);

    line(rightHip.x, rightHip.y, rightKnee.x, rightKnee.y);
    line(rightKnee.x, rightKnee.y, rightAnkle.x, rightAnkle.y);

    line(leftHip.x, leftHip.y, rightHip.x, rightHip.y);
  }
}