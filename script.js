var canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

canv.width = 500;
canv.height = 500;

var diameter = 15;
const circumference = Math.PI*diameter;

var pedals = 8;
var focalPoint = 5;
const parabola = (x)=>(Math.pow(x,2)/(4*focalPoint));
const depth = parabola(diameter/2);

function cutArea(x){
    return (Math.PI/pedals)*(Math.pow(x,3)/(24*Math.pow(focalPoint,2)));
}

function inverseCutArea(x){
    return Math.cbrt((x*pedals*24*Math.pow(focalPoint,2))/Math.PI)
}

function draw(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canv.width, canv.height)
    ctx.save();
    ctx.translate(canv.width/2, canv.height/2);
    
    const nangle = (Math.PI*2)/pedals;
    const trad = inverseCutArea((circumference)/pedals);
    const unit = trad/(canv.width/2);

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

    ctx.restore();
    ctx.fillStyle = 'black';
    ctx.font = "20px Verdana";
    ctx.fillText(`${round(trad, 1000)} x ${round(trad, 1000)}`, 0,20);
    ctx.fillText(`d: ${diameter} h: ${round(depth, 1000)} c: ${round(circumference, 1000)}`, 0, 40 );
    ctx.fillText(`f: ${round(focalPoint, 1000)} p: ${pedals}`, 0, 60 );
}

function round(v, n){
    return Math.round(v*n)/n;
}

draw();