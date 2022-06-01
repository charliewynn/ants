function AntHill(position)
{	
	//position of hole in ground //y should be ground zero
	this.position = position;
	//the tube that starts from this.position
	this.tube = new Tube(this.position, this, 0);
}

AntHill.prototype.draw = function()
{
	drawCircle(this.position, 4, blackFill);
	this.tube.draw();
};

function Tube(startPosition, parent, parentSliceNDX)
{
	this.id = nextTubeId++;
	//where this tube begins (point it was created from
	this.position = startPosition;
	this.endPos = startPosition;
	this.parent = parent;
	this.parentSliceNDX = parentSliceNDX;
	
	this.slices = [];
	var nextDir = 4;//down
	if(anthill != undefined)
	{
		if(Math.random() < .5)
			nextDir = (parent.slices[parentSliceNDX].direction-1)%8;
		else
			nextDir = (parent.slices[parentSliceNDX].direction+1)%8;
	}
	this.slices.push(new Slice(this.endPos, nextDir, 0));
	this.endPos = this.endPos.add(eachDir[4]);
	
	this.childTubes = [];
}

Tube.prototype.addSlice = function(lastDir)
{
	var rand = Math.random();
	var distFromLastTurn = this.slices[this.slices.length-1].distFromLastTurn + 1
	if(distFromLastTurn < 100)
		rand = 1;
	var newDir = lastDir;//default to continue in same dir
	
	if(rand < .1)
		newDir = (lastDir-1)%8;
	if(rand < .04)
		newDir = (lastDir+1)%8;
	
	if(newDir != lastDir)
		distFromLastTurn = 0;
	this.slices.push(new Slice(this.endPos, newDir, distFromLastTurn));
	this.endPos = this.endPos.add(eachDir[newDir]);
}

Tube.prototype.draw = function()
{
	for(s in this.slices)
		this.slices[s].draw();
	for(t in this.childTubes)
		this.childTubes[t].draw();
};

function Slice(position, direction, distFromLastTurn)
{
	this.position = position;
	this.direction = direction;
	this.distFromLastTurn = distFromLastTurn;
}

Slice.prototype.draw = function()
{
	drawCircle(this.position, 2, orangeFill);
};