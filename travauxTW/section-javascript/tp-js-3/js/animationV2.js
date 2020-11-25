let canvas=document.getElementById("canvas");
let rect;
let remapPosYToDepthFactor;
let ctx=canvas.getContext('2d');
ctx.imageSmoothingEnabled=false;

class Sprites
{
    constructor(width, height, originOffsetX, originOffsetY, spriteRowNumber, spriteNumber, scale, animationSpeed, srcPath, ctx)
    {
        this.ctx=ctx;
        this.width=width;
        this.height=height;
        this.originOffsetX=originOffsetX;
        this.originOffsetY=originOffsetY;
        this.spriteRowNumber=spriteRowNumber;
        this.scale=scale;
        this.spriteNumber=spriteNumber;
        this.animationSpeed=animationSpeed;
        this.sprites=new Image();
        this.sprites.src=srcPath;
    }

    draw(animationStep, x, y, scale=this.scale)
    {
        ctx.drawImage(
            this.sprites,
            this.width*animationStep, this.height*this.spriteRowNumber, this.width, this.height,
            x-this.originOffsetX*scale, y-this.originOffsetY*scale, this.width*scale, this.height*scale);
    }
}

let state = {
    idle:   new Sprites(128, 128, 64, 128, 0, 1, 1, 0, "https://edv221.github.io/travauxTW/section-javascript/tp-js-3/imgs/heroWalk.png", ctx),
    up:     new Sprites(128, 128, 64, 128, 3, 4, 1, .1, "https://edv221.github.io/travauxTW/section-javascript/tp-js-3/imgs/heroWalk.png", ctx),
    down:   new Sprites(128, 128, 64, 128, 2, 4, 1, .1, "https://edv221.github.io/travauxTW/section-javascript/tp-js-3/imgs/heroWalk.png", ctx),
    left:   new Sprites(128, 128, 64, 128, 0, 4, 1, .1, "https://edv221.github.io/travauxTW/section-javascript/tp-js-3/imgs/heroWalk.png", ctx),
    right:  new Sprites(128, 128, 64, 128, 1, 4, 1, .1, "https://edv221.github.io/travauxTW/section-javascript/tp-js-3/imgs/heroWalk.png", ctx)
};

let game;
let gameOver = false;
let posX=canvas.width / 2;
let posY=canvas.height / 2;
let currentState=state.idle;
let animationStep=0;
let speedHorizontal=3;
let speedVertical=1.5;
let depthFactor=1;
let isStopped=true;
let toPosX= -1;
let toPosY= -1;

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentState.draw(Math.floor(animationStep), posX, posY, depthFactor);
}

function update()
{
    if (toPosX != -1)
    {
        if (Math.abs(toPosX-posX)>2)
        {
            currentState=(Math.floor(posX) < toPosX) ? state.right : state.left;
        }
        else
        {
            toPosX = -1;
            if (toPosY == -1)
            {
              isStopped = true;
            }
        }
    }
    if (toPosY != -1)
    {
        if (Math.abs(toPosY - posY) > 2)
        {
            currentState = (Math.floor(posY) < toPosY) ? state.down : state.up;
        }
        else
        {
            toPosY = -1;
            if (toPosX == -1) isStopped = true;
        }
    }
    animationStep += currentState.animationSpeed;
    if (animationStep > currentState.spriteNumber)
    {
        if (currentState == state.idle)
        {
          animationStep = 0;
        }
        animationStep -= currentState.spriteNumber;
    }

    switch (currentState)
    {
        case state.down:
            if (posY <= canvas.height && !isStopped)
            {
                posY += speedVertical * depthFactor;
                depthFactor = remapPosYToDepthFactor(posY);
            }
            else
            {
                animationStep = 1;
            }
            break;

        case state.up:
            if (posY - state.up.height * depthFactor > 0 && !isStopped)
            {
                posY -= speedVertical * depthFactor;
                depthFactor = remapPosYToDepthFactor(posY);
            }
            else
            {
                animationStep = 1;
            }
            break;

        case state.left:
            if (posX - 32 > 0 && !isStopped)
            {
                posX -= speedHorizontal * depthFactor;
            }
            else
            {
                animationStep = 0;
            }
            break;

        case state.right:
            if (posX + 32 < canvas.width && !isStopped)
            {
                posX += speedHorizontal * depthFactor;
            }
            else
            {
                animationStep = 0;
            }
            break;
        default:
            return;
    }
}

function animate()
{
    draw();
    update();
    if (gameOver)
    {
      return cancelAnimationFrame(game);
    }
    game=requestAnimationFrame(animate);
}

function clearMouseMovement()
{
    toPosX = -1;
    toPosY = -1;
    console.log("clear");
}

function clampMouseClick(mouseX, mouseY)
{
    isStopped = false;
    toPosX = mouseX;
    toPosY = mouseY;
    if (mouseX - 32 < 0)
    {
        toPosX = 33;
    }
    else if (mouseX + 32 > canvas.width)
    {
        toPosX = canvas.width - 33;
    }
    if (mouseY - state.up.height * depthFactor < 0)
    {
        toPosY = state.up.height + 1;
    }
}

function setCurrentState(currState)
{
    clearMouseMovement();
    currentState = currState;
    isStopped = false;
}

function reset()
{
    currentState = state.idle;
    animationStep = 0;
    posX = canvas.width / 2;
    posY = canvas.height / 2;
    isStopped = true;
    depthFactor = 1;
}

function createRemap(inMin, inMax, outMin, outMax)
{
    return function remaper(x)
    {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
}

window.addEventListener('load', () => {
    rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    remapPosYToDepthFactor = createRemap(0, canvas.height, .5, 1.5);

    reset();

    animate();
});

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;

    clearMouseMovement();

    switch (event.key)
    {
        case "ArrowDown":
            setCurrentState(state.down);
            break;

        case "ArrowUp":
            setCurrentState(state.up);
            break;

        case "ArrowLeft":
            setCurrentState(state.left);
            break;

        case "ArrowRight":
            setCurrentState(state.right);
            break;

        case " ":
            isStopped = true;
            break;

        case "Escape":
            reset();
            break;

        default:
            return;
    }
    event.preventDefault();
}, true);

window.addEventListener("keyup", (event) => {
    if (event.defaultPrevented) return;

    isStopped = true;

    event.preventDefault();
}, true);

canvas.addEventListener('mouseup', (event) => {
    if (event.defaultPrevented) return;

    clampMouseClick(Math.floor(event.clientX - rect.left), Math.floor(event.clientY - rect.top));

    event.preventDefault();
}, true);
