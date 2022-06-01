//Colors
var redFill = "rgba(255,0,0,1)"
var greenFill = "rgba(34,139,34,1)"
var orangeFill = "rgba(255,140,0,1)"
var blueFill = "rgba(0,0,255,1)"
var blackFill = "rgba(0,0,0,1)"
var whiteFill = "rgba(255,255,255,1)"
var lightblueFill = "rgba(100,100,255,1)"
var greyFill = "rgba(255,255,255,.5)"
var lightgreyFill = "rgba(200,200,200,1)"
var darkgreyFill = "rgba(169,169,169,1)"
var brownFill = "rgba(139,69,19,1)"
var purpleFill = "rgba(170,0,255,1)"

function redraw()
{		
	canvas.width = canvas.width;
	context.fillStyle = lightblueFill;
	context.fillRect(0,0,width,height);
	context.fill();
	
	context.fillStyle = brownFill;
	context.fillRect(0,height/4,width,3*height/4);
	context.fill();
	
	//earth.draw();
	
	anthill.draw();
	
	for(a in ants)
		ants[a].draw();
		
		
	//for(m in messages)
		//drawText(5, height-(-10+(messages.length-m)*15), messages[m], whiteFill, '15px sans-serif');
	
};

function drawText(x, y, text, color, font)
{
	context.fillStyle = color;
	context.font = typeof font == 'undefined' ? 'italic bold 15px sans-serif' : font;
	context.textBaseline = 'bottom';
	context.fillText(text, x, y);
};

//generic draw rectangle function
function drawRect(pos, size, color)
{
	context.beginPath();
	context.fillStyle = color;
	context.fillRect(pos.x, pos.y, size.x, size.y);
	context.closePath();
	context.fill();
};

//only used for boss health outline
function drawBox(pos, size, color)
{
	context.beginPath();
	context.fillStyle = color;
	context.strokeRect(pos.x, pos.y, size.x, size.y);
	context.closePath();
	context.fill();
};

//only used for drawing the weapon type
function drawCircle(pos, radius, color)
{
	context.beginPath();
	context.fillStyle = color;
	context.arc(pos.x, pos.y, radius, 0, Math.PI*2,false);
	context.closePath();	
	context.fill();
};