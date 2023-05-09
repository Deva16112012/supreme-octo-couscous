object=[];
status1="";
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    v.hide()
}
function preload(){
    v=createVideo('video.mp4');
}
function draw(){
    image(v,0,0,480,380);
    if(status1 != ""){
        ml.detect(v,gotResult);
        for (let i = 0; i < object.length; i++) {
            document.getElementById("h").innerHTML="status : Object Detected";
            document.getElementById("g").innerHTML="No. Of Object Detected : "+object.length;
            fill("purple");
            noFill();
            stroke("purple");
            c=floor(object[i].confidence*100);
            text(object[i].label+" "+c+"%",object[i].x,object[i].y+15);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function start(){
    ml=ml5.objectDetector('CoCossd',loded);
    document.getElementById("h").innerHTML="status : Detecting Object";
}
function loded(){
    console.log("Model Is Loded");
    status1=true;
    v.loop();
    v.speed(1);
    v.volume(0);
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object=result;
    }
}