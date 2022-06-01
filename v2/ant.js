function Ant(positionVec)
{	
	this.id = nextAntId++;
	this.position = positionVec;
	this.direction = new Vector(Math.random() > .5 ? -1 : 1, 0);
	this.currentLoc = undefined; //undefined represents outside;
	this.currentLocNDX = -1;
	this.tubeDir = 1;
  this.carrying = false;
}

Ant.prototype.move = function()
{
	var rand = Math.random();
	
  if(this.currentLoc == undefined)
  {
    if(rand > .01)
    {
      this.position = this.position.add(this.direction.scale(2));
    }
    else
    {
      this.direction.x *= -1;
    }
    if(this.position.x < 8 || this.position.x > width - 8)
    //if(this.position.x < width/2-50 || this.position.x > width/2 + 50)
    {
      addMessage(this.id + ": Off Map, change Dir");
      this.direction.x *= -1;
    }
    
    if(rand > .3)
    {
      for(var i in anthill.allNodes)
      {
        var n = anthill.allNodes[i];
        if(n.isEnterance)
        {
          if(Math.abs(n.pos.dist(this.position)) < 3)
          {
            addMessage(this.id + ": Entered AntHill");
            this.currentLoc = n.tunnels[0];
            if(n == n.tunnels[0].startNode)
            {
              this.tubeDir = 1;
              this.currentLocNDX = 0;
            }
            else
            {
              this.tubeDir = -1;
              this.currentLocNDX = n.tunnels[0].sections.length-1;
            }
            this.direction = this.currentLoc.sections[this.currentLocNDX].dir;
            this.direction = this.direction.scale(1/this.direction.dist(new Vector(0,0)));
            this.position = this.currentLoc.sections[this.currentLocNDX].pos;
          }
        }
      }
    }
  }
  else//not above ground
  {
    if(this.tubeDir == -1 && this.currentLocNDX == 0)//end of tunnel going towards start
    {
      if(this.currentLoc.startNode.isEnterance)
      {
        this.position = this.currentLoc.startNode.pos;
        this.direction = new Vector(Math.random() > .5 ? -1 : 1, 0);
        this.currentLoc = undefined; //undefined represents outside;
        addMessage(this.id + ": Left AntHill");
        return;
      }
      else
      {
        this.position = this.currentLoc.startNode.pos;
        addMessage(this.id + ": Left Tunnel:" + this.currentLoc.id);
        this.currentLoc = this.currentLoc.startNode.tunnels[0]; //undefined represents outside;
        this.currentLocNDX = this.currentLoc.sections.length-1;
        addMessage(this.id + ": Entered Tunnel:" + this.currentLoc.id);
        return;
      }
    }
    
    //addMessage(this.id + ":" + this.currentLoc.id + ":" + this.currentLocNDX + ":" + this.currentLoc.sections.length);
    if(this.tubeDir == 1 && this.currentLocNDX >= this.currentLoc.sections.length-1)//end of tunnel going towards start
    {
      addMessage(this.id + ": End Of Tunnel");
      if(this.currentLoc.endNode == undefined)
      {
        addMessage(this.id + ": About to Dig");
        this.currentLoc.addSectionOrNode();
        this.carrying = true;
        addMessage(this.id + ": Dug");
        return;
      }
      else if(this.currentLoc.endNode.isEnterance)
      {
        this.position = this.currentLoc.startNode.pos;
        this.direction = new Vector(Math.random() > .5 ? -1 : 1, 0);
        this.currentLoc = undefined; //undefined represents outside;
        addMessage(this.id + ": Left AntHill");
        return;
      }
      else//at endnode
      {
        var r = Math.random();
        if(this.currentLoc.endNode.tunnels.length == 1 || r < .1)
        {
          addMessage(this.id + ": Leaving Tunnel:" + this.currentLoc.id);
          addMessage(this.id + ":" + this.currentLocNDX + ":" + this.currentLoc.sections.length);
          this.currentLoc.endNode.addTunnel(new Vector(2*Math.random()-1, 2*Math.random()-1));
          addMessage("Created Tunnel");
          this.currentLoc = this.currentLoc.endNode.tunnels[this.currentLoc.endNode.tunnels.length-1];
          this.currentLocNDX = 0;
          addMessage(this.id + ": Entered Tunnel:" + this.currentLoc.id);
          addMessage(this.id + ": About to Dig");
          this.currentLoc.addSectionOrNode();
          this.carrying = true;
          addMessage(this.id + ": Dug");
        }
        else
        {
          var r = Math.floor(Math.random()*this.currentLoc.endNode.tunnels.length);
          if(this.currentLoc == this.currentLoc.endNode.tunnels[r])
          {
            this.currentLoc = this.currentLoc.endNode.tunnels[r];
            this.currentLocNDX = this.currentLoc.sections.length-1;
            this.tubeDir = -1;
          }
          else
          {
            this.currentLoc = this.currentLoc.endNode.tunnels[r];
            this.currentLocNDX = 0;
            this.tubeDir = 1;
          }
          addMessage(this.id + ": Took Tunnel:" + this.currentLoc.id);
        }
        return;
      }
    }
    //addMessage(this.id + "-:" + this.currentLoc.id + ":" + this.currentLocNDX + ":" + this.currentLoc.sections.length);
    if(rand > .1)//continue down path
    {
      this.currentLocNDX += this.tubeDir;
      if(this.currentLoc.sections[this.currentLocNDX] == undefined)
      {
        var i = 4;
      }
      this.direction = this.currentLoc.sections[this.currentLocNDX].dir;
      this.direction = this.direction.scale(this.tubeDir/this.direction.dist(new Vector(0,0)));
      this.position = this.currentLoc.sections[this.currentLocNDX].pos;
      //addMessage(this.id + ": Walked");
    }
    else
    {
      this.tubeDir *= -1;
      this.direction = this.currentLoc.sections[this.currentLocNDX].dir;
      this.direction = this.direction.scale(this.tubeDir/this.direction.dist(new Vector(0,0)));
      this.position = this.currentLoc.sections[this.currentLocNDX].pos;
      addMessage(this.id + ": Turn Around");
    }
  }
  
	
}
	
Ant.prototype.draw = function()
{
	drawCircle(this.position, 4, redFill);
	drawCircle(this.position.add(this.direction.scale(-6)), 4, redFill);
	drawCircle(this.position.add(this.direction.add(new Vector(1,-1))), 1, blackFill);
};