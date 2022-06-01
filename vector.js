function Vector(x, y)
{	
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(v2)
{
	return new Vector(this.x + v2.x, this.y + v2.y);
}

Vector.prototype.dist = function(v2)
{
	return Math.sqrt(Math.pow(v2.x - this.x,2) + Math.pow(v2.y - this.y,2));
}

Vector.prototype.scale = function(k)
{
	return new Vector(this.x*k, this.y*k);
}

Vector.prototype.vecTo = function(pos)
{
	return new Vector(this.x-pos.x, this.y-pos.y);
}

var eachDir = [];
eachDir[0] = new Vector(0,-1); //up
eachDir[1] = new Vector(1,-1); //up right
eachDir[2] = new Vector(1,0);  //right
eachDir[3] = new Vector(1,-1); //down right
eachDir[4] = new Vector(0,1);  //down
eachDir[5] = new Vector(-1,1); //down left
eachDir[6] = new Vector(-1,0); //left
eachDir[7] = new Vector(-1,-1);//up left

function reverseVec(ndx)
{
	return (ndx+4)%8
}