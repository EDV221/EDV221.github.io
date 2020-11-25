let width=window.innerWidth;
let height=window.innerHeight;
let ratio=window.devicePixelRatio;

let x=width/2;
let r=40;
let step=0;
let vx=r*0.2;

let sprite=new Image();
sprite.onload=animate;
sprite.src="imgs/shell.png";

let canvas=document.getElementById("canvas"),
    context=canvas.getContext("2d");

canvas.width=width*ratio;
canvas.height=height*ratio;
canvas.style.width=width+"px";
canvas.style.height=height+"px";
context.scale(ratio, ratio);
context.imageSmoothingEnabled=false;
context.fillStyle="rgba(255, 255, 255, 0.25)";

function animate()
{
    draw();
    update();
    requestAnimationFrame(animate);
}

function draw()
{
    context.fillRect(0, 0, width, height);
    drawShell(x, height, r, Math.floor(step));
}

function drawShell(x, y, r, step)
{
    let s = r/12;
    context.drawImage(sprite, 32*step, 0, 32, 32, x-16*s, y-26*s, 32*s, 32*s);
}

function update()
{
    x+=vx;
    if(x<r || x>width-r)
    {
      vx*=-1;
    }
    step += 0.3;
    if (step >= 12)
    {
      step -= 12;
    }
}
