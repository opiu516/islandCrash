object = function(x,y,lenght,height,mapId,objId,hp,skin){
	var me = {
		x : x,
		y : y,
		lenght : lenght,
		height : height,
		mapId : mapId,
		objId : objId,
		hp : hp,
		skin : skin,
}
me.print = function(){
	ctx.save();			
	var x = me.x - player.x;
	var y = me.y - player.y;
		
	x += Clenght/2;
	y += Cheight/2;
		
	x -= me.lenght/2;
	y -= me.height/2;
	
	ctx.drawImage(me.skin,
	0,0,me.skin.width,me.skin.height,
	x,y,me.lenght,me.height);
	ctx.restore();
}

//maths
	me.distance = function( pt ){
		var diffX = me.x - pt.x;
		var diffY = me.y - pt.y;
		return Math.sqrt(diffX*diffX+diffY*diffY);
		
	}
	me.Collision = function(E2){
		var rect1 = {
		x:me.x-me.lenght/2,
		y:me.y-me.height/2,
		lenght:me.lenght,
		height:me.height,
		}
		var rect2 = {
		x:E2.x-E2.lenght/2,
		y:E2.y-E2.height/2,
		lenght:E2.lenght,
		height:E2.height,
		}
		return Rcollision(rect1,rect2)
	}
	Rcollision = function(E1,E2){
	  return E1.x <= E2.x + E2.lenght
		  && E2.x <= E1.x + E1.lenght
		  && E1.y <= E2.y + E2.height
		  && E2.y <= E1.y + E1.height;
	}
me.deleteme = function(){
	POMO(me,0);
	me.item.drop(me);
	delete objList[me.objId];
	
}
me.update = function(){
	me.print();
	if(me.Collision(player.fist)&&player.fist.onmap) me.hp -= player.fist.dmg;
	if(me.hp <= 0) me.deleteme();
}
return me;
}

makerock = function(){
	objId = Math.random();
	var size = Math.floor(2 + Math.random())*tileHeight;	
	var xCord = 0;
	var yCord = 0;
	var counter = 0;
	var valid = true;
	var maxX = map.maxX - 4;
	var minX = map.minX + 4;
	var maxY = map.maxY - 4;
	var minY = map.minY + 4;
	do{
		xCord = Math.floor(Math.random()*(maxX - minX) + minX);
		yCord = Math.floor(Math.random()*(maxY - minY) + minY);
		counter++;
		if(counter > 100){
		//console.log(" error ");
		valid = false;
		break;
		}
	}
	while( IPVO(xCord,yCord,size / tileHeight,size / tileHeight) == false );
	if(valid){
	var x = xCord * tileLenght;
	var y = yCord * tileHeight;
	rock = object(x,y,size,size,3,objId,50,skins.rock);
	rock.item = rocki();
	objList[objId] = rock;
	POMO(rock,rock.mapId);
	//console.log(rock);
	}
}
maketree = function(){
	objId = Math.random();
	var size = Math.floor(1 + Math.random())*tileHeight;	
	var xCord = 0;
	var yCord = 0;
	var counter = 0;
	var valid = true;
	var maxX = map.maxX - 4;
	var minX = map.minX + 4;
	var maxY = map.maxY - 4;
	var minY = map.minY + 4;
	do{
		xCord = Math.floor(Math.random()*(maxX - minX) + minX);
		yCord = Math.floor(Math.random()*(maxY - minY) + minY);
		counter++;
		if(counter > 100){
		//console.log(" error ");
		valid = false;
		break;
		}
	}
	while( IPVO(xCord,yCord,size / tileHeight,size / tileHeight) == false );
	if(valid){
	var x = xCord * tileLenght - size/2;
	var y = yCord * tileHeight - size/2;
	tree = object(x,y,size,size,4,objId,10,skins.tree);
	tree.item = wood();
	objList[objId] = tree;
	POMO(tree,tree.mapId);
	//console.log(tree);
	}
}