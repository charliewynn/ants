function didload()
{	
	document.getElementById("canvas").innerHTML = '<canvas id="theCanvas" width="'+width+'" height="'+height+'" >You need to use Firefox, Google Chrome or IE 9 to Play"</canvas>';
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext("2d");
		
	//earth = new Earth();
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2+4, antOnGroundHeight)));
	ants.push(new Ant(new Vector(width/2-4, antOnGroundHeight)));
	
	anthill = new AntHill(new Vector(width/2, height/4));
	
	updateGame();
}

//this is called for every frame to update the location of the objects in the game
function updateGame()
{
	var time = new Date().getTime();
	
	for(a in ants)
		ants[a].move();
	
	redraw();
	setTimeout( function(){	 updateGame(); }, 20-(new Date().getTime()-time));
};

function addMessage(text)
{
	messages.push(text);
	if(messages.length > 20)
		messages.splice(0,1);
}