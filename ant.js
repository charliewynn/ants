function Ant(positionVec)
{	
	this.id = nextAntId++;
	this.position = positionVec;
	this.direction = Math.random() < .5 ? 2 : 6;
	this.currentLoc = undefined; //undefined represents outside;
	this.currentLocNDX = -1;
	this.tubeDir = 1;
}

Ant.prototype.move = function()
{
	var rand = Math.random();
	
	if(this.position.x < 0 || this.position.x > width)
	{
		addMessage(this.id + ": Off Map, change Dir");
		this.direction = reverseVec(this.direction);
	}
	
	//if the ant's within 2 of the anthill start 1/4 of the time
	if(Math.abs(this.position.x - anthill.position.x) < 2 && rand < .25 && this.currentLoc == undefined)
	{
		this.position = anthill.tube.slices[0].position;
		this.direction = anthill.tube.slices[0].direction;
		this.currentLoc = anthill.tube;
		this.currentLocNDX = 0;
		//addMessage(this.id + ": Into Anthill");
		return;
	}
	
	//in a tube or room
	if(this.currentLoc != undefined)
	{
		if(this.currentLocNDX == this.currentLoc.slices.length-1)
		{
			if(this.position.y < antOnGroundHeight + 20 && this.currentLoc.id != 0)
			{	
				this.tubeDir *= -1;
				this.position = this.currentLoc.slices[this.currentLocNDX].position;
				this.direction = this.currentLoc.slices[this.currentLocNDX].direction;
				if(this.tubeDir == -1)
					this.direction = reverseVec(this.direction);
				return;
			}
			this.currentLoc.addSlice(this.currentLoc.slices[this.currentLocNDX].direction);
			//addMessage(this.id + ": Dig in tube:" + this.currentLoc.id);
		}
		else if(this.currentLocNDX == 0 && this.tubeDir == -1)
		{
			if(this.currentLoc.parent == anthill)
			{
				this.position = new Vector(anthill.position.x, antOnGroundHeight);
				this.currentLoc = undefined;
				this.tubeDir = 1;
				this.direction = (rand < .05) ? 2 : 6;
				//addMessage(this.id + ": Out of Anthill");
			}
			else
			{
				this.currentLocNDX = this.currentLoc.parentSliceNDX;
				this.currentLoc = this.currentLoc.parent;
				this.position = this.currentLoc.slices[this.currentLocNDX].position;
				this.direction = rand < .5 ? this.currentLoc.slices[this.currentLocNDX].direction : reverseVec(this.currentLoc.slices[this.currentLocNDX].direction);
			}
		}
		else
		{
			if(rand < .5)
			{
				for(t in this.currentLoc.childTubes)
				{
					var ct = this.currentLoc.childTubes[t];
					if(ct.position.dist(this.position) < 4)
					{
						this.currentLoc = ct;
						this.currentLocNDX = 0;
						//addMessage(this.id + ": Into tube:" + this.currentLoc.id);
						return;
					}
				}
			}
			if(rand < .1 && this.currentLoc.slices[this.currentLocNDX].distFromLastTurn > 50)
			{
			
				if(this.position.y < antOnGroundHeight + 20)
				{	
					this.tubeDir *= -1;
					this.position = this.currentLoc.slices[this.currentLocNDX].position;
					this.direction = this.currentLoc.slices[this.currentLocNDX].direction;
					if(this.tubeDir == -1)
						this.direction = reverseVec(this.direction);
					return;
				}
				
				this.currentLoc.childTubes.push(new Tube(this.position, this.currentLoc, this.currentLocNDX));
				addMessage(this.id + ": Add Tube at:" + this.currentLoc.id+ '  :  ' + this.currentLocNDX);
				for(t in this.currentLoc.childTubes)
				{
					var ct = this.currentLoc.childTubes[t];
					if(ct.position.dist(this.position) < 4)
					{
						this.currentLoc = ct;
						this.currentLocNDX = 0;
						//addMessage(this.id + ": Into tube:" + this.currentLoc.id);
						return;
					}
				}
			}
			else if(rand < .9)
			{
				this.currentLocNDX += this.tubeDir;
				this.position = this.currentLoc.slices[this.currentLocNDX].position;
				this.direction = this.currentLoc.slices[this.currentLocNDX].direction;
				if(this.tubeDir == -1)
					this.direction = reverseVec(this.direction);
				//addMessage(this.id + ": Walk in tube:" + this.currentLoc.id + '  :  ' + this.currentLocNDX);
			}
			else
			{
				this.tubeDir *= -1;
				//addMessage(this.id + ": Turn in tube:" + this.currentLoc.id + '  :  ' + this.currentLocNDX);
			}
		}
	}
	
	if(this.currentLoc == undefined)
	{
		if(rand < .9)
			this.position = this.position.add(eachDir[this.direction]);
		else
			this.direction = reverseVec(this.direction);
		return;
	}
}
	
Ant.prototype.draw = function()
{
	drawCircle(this.position, 4, redFill);
	drawCircle(this.position.add(eachDir[this.direction].scale(-6)), 4, redFill);
	drawCircle(this.position.add(eachDir[this.direction].add(new Vector(1,-1))), 1, blackFill);
};