ImageS = "";
Status = "";

objects = [];

function preload()
{
    ImageS = loadImage("backyard_room.jpg");
}

function setup()
{
    canvas = createCanvas(700,500);
    canvas.position(400,130);

    object_detection = ml5.objectDetector('cocossd', modelReady);

    document.getElementById("status").innerHTML = "Status: Decting Objects";
}

function modelReady()
{
    console.log("model ready");
    Status = true;
    object_detection.detect(ImageS, gotResults);
}

function gotResults(err, results)
{
    if(err){ return; }

    console.log(results);
    objects = results;
}

function draw()
{
    image(ImageS, 0, 0, 700, 500);
    
    for(var i = 1; i<=objects.length; i++) // first object, i = 1. second object, i = 2. length = 2
    {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        fill("#FF0000");
        var percentage = floor(objects[i - 1].confidence * 100);
        noFill();
        stroke("#FF0000");
        text(objects[i - 1].label + " " + percentage + "%", objects[i - 1].x + 255, objects[i - 1].y + 115);
        rect(objects[i - 1].x + 255, objects[i - 1].y + 5, objects[i - 1].width + 20, objects[i - 1].height);
    }
}

function redirect()
{
    window.location = "index.html"
}