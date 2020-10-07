makeplayer = function(x,y,lenght,height,spdX,spdY,skin){
	var me = {
	x : x,
	y : y,
	lenght : lenght,
	height : height,
	spdX : spdX,
	spdY : spdY,
	skin : skin,
	}
	me.inventory = playerInventory(7);
	me.fist = makefist(me.x,me.y,me.height/2,me.height/4);
	
	me.Left = false;
	me.Right = false;
	me.Up = false;
	me.Down = false;
	me.direction = 0;
	me.using = false;
	me.move = function(){
	
	var Tb = {x:me.x , y:me.y - me.height/2 - 1};
	var Bb = {x:me.x , y:me.y + me.height/2 + 1};
	var Lb = {x:me.x - me.lenght/2 - 1,y:me.y};
	var Rb = {x:me.x + me.lenght/2 + 1,y:me.y};
	var RUb = {x:me.x + me.height/4,y:me.y - me.height/4};
	var RDb = {x:me.x + me.height/4,y:me.y + me.height/4};
	var LUb = {x:me.x - me.height/4,y:me.y - me.height/4};
	var LDb = {x:me.x - me.height/4,y:me.y + me.height/4};
		
	 if(me.Left == true && IPPV(Lb) && IPPV(LUb) && IPPV(LDb))
		me.x -= me.spdX;
	  if(me.Right == true && IPPV(Rb) && IPPV(RUb) && IPPV(RDb))
		me.x += me.spdX;
	  if(me.Up == true && IPPV(Tb) && IPPV(LUb) && IPPV(RUb))
		me.y -= me.spdY;
	  if(me.Down == true && IPPV(Bb) && IPPV(RDb) && IPPV(LDb))
		me.y += me.spdY;
		
	  if(me.x + me.lenght/2 > mapLenght*tileLenght )me.x = mapLenght*tileLenght - me.lenght/2;
      if(me.x - me.lenght/2 < 0) me.x = 0 + me.lenght/2;
	  if(me.y + me.height/2 > mapHeight*tileHeight )me.y = mapHeight*tileHeight - me.height/2;
	  if(me.y - me.height/2 < 0) me.y = 0 + me.height/2;
	
	}
	
	me.print = function(){
		ctx.save();
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		
		lenght = me.skin.width/4;
		
		ctx.drawImage(me.skin,
			lenght*me.direction,0,lenght,me.skin.height,
			x,y,me.lenght,me.height
		);
		
		ctx.restore();
	}
	me.useItem = function(){
		if((me.inventory.slots[me.inventory.cSlot] == 0 || me.inventory.slots[me.inventory.cSlot].usable == false)&& me.using == true) me.fist.hitin = true;
	}
	me.update = function()
	{
	me.move();
	me.inventory.update();
	me.useItem();
	me.print();
	me.fist.update();
	}
	
	
	
	
	me.release = function(){
		var axis;
		var obj = {
			x : 0,
			y : 0,
			lenght : 1,
			height : 1,
		}
		do
		{
		do
			axis = Math.floor(Math.random()*2);
		while (axis == 2);
		if(axis == 0) {
			obj.x = Math.floor(Math.random()*(map.maxX - map.minX) + map.minX + 1);
			obj.y = map.minY;
			while(map.arr[obj.y][obj.x] == 1){
				obj.y++;
			}
		}
		if(axis == 1) {
			obj.x = map.minX;
			obj.y = Math.floor(Math.random()*(map.maxY - map.minY) + map.minY + 1);
			while(map.arr[obj.y][obj.x] == 1){
				obj.x++;
			}
		}
		obj.y++
		obj.x++;
		}
		while(IPVO(obj) == false);
		me.x = obj.x*tileLenght;
		me.y = obj.y*tileHeight;
	}
	
	return me;
	}
	
	makefist = function(x,y,lenght,height){
	var me = {
	x:x,
	y:y,
	lenght:lenght,
	height:height,
	}
	me.dmg = 0.2;
	me.hitin = false;
	me.hitt = 0;
	me.hcooldown = 0;
	me.skinvert = new Image();
	me.skinvert.src = "Img/FistVert.png";
	me.skinhorz = new Image();
	me.skinhorz.src = "Img/FistHorz.png";
	me.onmap = false;
	me.move = function(){
		
		if(player.direction == 0)
		{
		me.height = player.height/2;
		me.lenght = player.lenght/4;
		me.x = player.x - player.lenght/4;
		me.y = player.y - player.height/2;
		//console.log(me.direction + "I work ");
		}
		if(player.direction == 2)
		{
		me.height = player.height/2;
		me.lenght = player.lenght/4;
		me.x = player.x + player.lenght/4;
		me.y = player.y + player.height/2;
		//console.log(me.direction + "I work ");
		}
		if(player.direction == 1)
		{
		me.height = player.height/4;
		me.lenght = player.lenght/2;
		me.x = player.x + player.lenght/2;
		me.y = player.y + player.height/4;
		//console.log(me.direction + "I work ");
		}
		if(player.direction == 3)
		{
		me.height = player.height/4;
		me.lenght = player.lenght/2;
		me.x = player.x - player.lenght/2;
		me.y = player.y - player.height/4;
		//console.log(me.direction + "I work ");
		}
	} 
	me.print = function(){
		
		ctx.save();
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		
		lenght = me.skinhorz.width/2;
		
		if(player.direction == 0 )
		ctx.drawImage(me.skinvert,
			0,0,lenght,me.skinvert.height,
			x,y ,me.lenght,me.height,me.lenght
		);
		if(player.direction == 2)
			ctx.drawImage(me.skinvert,
			lenght,0,lenght,me.skinvert.height,
			x ,y,me.lenght,me.height
		);
		if(player.direction == 1)
		ctx.drawImage(me.skinhorz,
			0,0,me.skinhorz.width,lenght,
			x ,y ,me.lenght,me.height
		);	
		if(player.direction == 3)
		ctx.drawImage(me.skinhorz,
			0,lenght,me.skinhorz.width,lenght,
			x ,y,me.lenght,me.height
		);
		if( player.inventory.slots[player.inventory.cSlot].usable == false)
			player.inventory.slots[player.inventory.cSlot].printInInventory(x,y,player.height/2);
	 }
	me.update = function(){
		if(me.hcooldown > 5)
		{
		if(me.hitin == true)
			if(me.hitt < 10){
				me.move();
				me.print();
				me.hitt++;
				me.onmap = true;
			}
			else{
				me.hitin = false;
				me.hitt = 0;
				me.hcooldown = 0;
				me.onmap = false;
			}
		}
		else me.hcooldown++;
	}
	return me;
	}