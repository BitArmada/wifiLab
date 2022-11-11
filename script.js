var canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

canv.width = 500;
canv.height = 500;

var sheetWidth = 5;

var pedals = 8;
var focalPoint = 1;

function cutArea(x){
    return (Math.PI/pedals)*(Math.pow(x,3)/(24*Math.pow(focalPoint,2)));
}

function draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canv.width, canv.height)
    ctx.translate(canv.width/2, canv.height/2);

    const nangle = (Math.PI*2)/pedals;
    const unit = (sheetWidth/2)/(canv.width/2);
    for(var n = 0; n < pedals; n++){
        ctx.rotate(nangle);
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        // ctx.moveTo(0,0);
        // ctx.lineTo(canv.width/2,0)
        ctx.moveTo(0,0);
        for(var i = 0; i < canv.width/2; i++){
            var value = cutArea(i*unit);
            ctx.lineTo(i, (value/unit)/2);
        }
        ctx.moveTo(0,0);
        for(var i = 0; i < canv.width/2; i++){
            var value = cutArea(i*unit);
            ctx.lineTo(i, -(value/unit)/2);
        }
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0, 0, canv.width/2, 0, 2 * Math.PI);
    ctx.stroke();
}

draw();