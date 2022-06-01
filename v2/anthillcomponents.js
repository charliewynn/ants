function AntHill(pos)
{
  this.allNodes = [];
  this.allTunnels = [];
}

AntHill.prototype.create = function(pos)
{
  this.startNode = new AntHillNode(pos, true);
  this.startNode.addTunnel(new Vector(0,1));
};

AntHill.prototype.draw = function()
{
  for(i in this.allTunnels)
    this.allTunnels[i].draw();
  for(i in this.allNodes)
    this.allNodes[i].draw();
};

function AntHillNode(position, entrance)
{	
  this.pos = position;
  this.isEnterance = entrance;
  this.tunnels = [];
  anthill.allNodes.push(this);
}

AntHillNode.prototype.addTunnel = function(dir)
{
  this.tunnels.push(new AntHillTunnel(this, dir));
};

AntHillNode.prototype.draw = function()
{
  var fill = this.isEnterance ? blackFill : orangeFill;
  drawRect(this.pos.add(new Vector(-2.5, -2.5)), new Vector(5,5), fill);
};

function AntHillTunnel(startNode, startDir)
{
  this.id = nextTunnelId++;
  addMessage("Created Tunnel:" + this.id);
  this.startNode = startNode;
  this.endNode = undefined;
  this.startDir = startDir;
  this.sections = [];
  
  addMessage("About to add first section");
  this.addSectionOrNode();
  addMessage("Added 1st section");
    
  anthill.allTunnels.push(this);
}

AntHillTunnel.prototype.addSectionOrNode = function()
{
  var newPos = this.startNode.pos.add(this.startDir);
  var newDir = new Vector(this.startDir.x + this.startDir.x*Math.random()-this.startDir.x/2, this.startDir.y + this.startDir.y*Math.random()-this.startDir.y/2);
  if(this.sections.length > 0)
  {
    var lastSection = this.sections[this.sections.length-1]
    newPos = lastSection.pos.add(lastSection.dir);
    newDir = new Vector(lastSection.dir.x + Math.random()-.5, lastSection.dir.y + Math.random()-.5);
  }
  newDir = newDir.scale(3/newDir.dist(new Vector(0,0)));
  
  
  if(this.endNode == undefined)
  {
    if(this.sections.length > 10)
    {
      if(Math.random() > .1)
      {
        addMessage("About to add Section");
        this.addSection(newPos, newDir);
        addMessage("About to add section");
      }
      else
      {
        addMessage("About to add EndNode");
        this.endNode = new AntHillNode(newPos, newPos.y <= height/4);
        this.endNode.tunnels.push(this);
        addMessage("EndNode Added");
      }
    }
    else
    {
      this.addSection(newPos, newDir);
    }
  }
};

AntHillTunnel.prototype.addSection = function(newPos, newDir)
{
  if(newPos.y <= height/4)//new section is above ground level
  {
    this.endNode = new AntHillNode(newPos, true);
    this.endNode.tunnels.push(this);
  }
  else
  {
    this.sections.push(new AntHillTunnelSection(newPos, newDir));
  
    for(var i in anthill.allNodes)
    {
      var n = anthill.allNodes[i];
      if(this.sections[this.sections.length-1].pos.add(n.pos).dist(new Vector(0,0)) < 5)
      {
        this.endNode = n;
        this.endNode.tunnels.push(this);
        return;
      }
    }
  
    if(this.sections.length > 10)
    {
      for(var i in anthill.allTunnels)
      {
        var t = anthill.allTunnels[i];
        for(var j in t.sections)
        {
          var s = t.sections[j];
          if(this.sections[this.sections.length-1].pos.add(s.pos.scale(-1)).dist(new Vector(0,0)) < 1 && t != this && s.distToStartNode > 10 && t.sections.length - s.distToStartNode > 10)
          {
            this.endNode = new AntHillNode(newPos, false);
            var nt = new AntHillTunnel(this.endNode, s.dir);
            var ot = new AntHillTunnel(t.startNode, t.sections[0].dir);
            for(var k in t.sections)
            {
              if(k < s)
                ot.sections.push(t.sections[k])
              else
                nt.sections.push(t.sections[k])
                
              ot.endNode = this.endNode;
              nt.endNode = t.endNode;
              t = ot;
              anthill.allTunnels.push(nt);
              return;
            }
          }
        }
      }
    }
    
  }
  
  for(i in this.sections)
  {
    var s = this.sections[i];
      s.distToStartNode = i + 1;
  }
};

AntHillTunnel.prototype.draw = function()
{
  for(i in this.sections)
    this.sections[i].draw();
};

function AntHillTunnelSection(position, dir)
{
  this.pos = position;
  this.dir = dir;
  this.distToStartNode = 1;
}

AntHillTunnelSection.prototype.draw = function()
{
  drawRect(this.pos.add(this.dir).add(new Vector(-2.5, -2.5)), new Vector(5,5), lightbrownFill);
};