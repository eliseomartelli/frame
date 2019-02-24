var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var color = "red";
function setcolor(c) {
    color = c;
}

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0,0,8,8);

var getLocalPos = function(pX,pY)
{
  var x = Math.round((pX - canvas.offsetLeft) / canvas.clientWidth*canvas.width) - 1;
  var y = Math.round((pY - canvas.offsetTop) / canvas.clientHeight*canvas.height) - 1;
  
  return {x: x, y: y};
}

var paint = false;
canvas.onmousedown = (e) => {
    var pos = getLocalPos(e.clientX, e.clientY);
    paint = true;
    addClick(pos.x,pos.y);
    redraw();
}

canvas.onmousemove = (e) => {
    if (paint) {
        var pos = getLocalPos(e.clientX, e.clientY);
        addClick(pos.x,pos.y);
        redraw();
    }
}

canvas.onclick = (e) => {
    if (paint) {
        var pos = getLocalPos(e.clientX, e.clientY);
        addClick(pos.x,pos.y);
        redraw();
    }
}

canvas.onmouseup = () => {
    paint = false;
}

canvas.onmouseleave = () => {
    paint = false;
}

var data = new Array();

function addClick(x, y, dragging) {
  data.push({x: x, y:y, color: color});
  console.log(data);
  //clickDrag.push(dragging);
}

function redraw() {
    
    data.forEach(function(dPos)
    {
      ctx.fillStyle = dPos.color;
      ctx.fillRect(dPos.x,dPos.y,1,1);
    });

    post();
}

firebase.database().ref('/frames/' + mac + '/display').set("");

function post() {
    var out = []; 
    for (i = 0; i<8; i++) {
        for (j=0; j<8; j++) {
        var imgd = (ctx.getImageData(j, i, 1, 1)).data;
        out.push([imgd[0], imgd[1], imgd[2]]);
        }
    }
    firebase.database().ref('/frames/' + mac + '/display').set(JSON.stringify(out));
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
}, false);

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

    // Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}