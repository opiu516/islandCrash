objectInvetory = function(nos){
	
}
playerInventory = function(nos){
	var me = {};
	me.cSlot = 0;
	me.nos = nos;
	me.slots = {};
	me.lslots = {};
	me.iinS = [];
	for(var i = 0;i < me.nos;i++)
		me.slots[i] = 0;
	me.print = function(){
		ctx.save();
		var X = 10;
		var Y = 470;
		var IS = 20;
		for(var i = 0;i < me.nos;i++){
			ctx.fillStyle = "black";
			if(i == me.cSlot) ctx.fillStyle = "red";
			ctx.fillRect(X,Y,IS,IS);
			if(me.slots[i] != 0)me.slots[i].printInInventory(X,Y,IS);
			if(me.iinS[i] > 1){
				ctx.fillStyle = "white";
				ctx.font="10px Arial";
				ctx.fillText(me.iinS[i],X+IS/2,Y+IS)
			}
			X = X + IS + 3;
		}
		ctx.restore();
	}
	me.update = function(){
		if(me.cSlot > me.nos - 1) me.cSlot = 0;
		if(me.cSlot < 0) me.cSlot = me.nos - 1;
		me.print();
	}
	me.drop = function(){
		if(me.slots[me.cSlot] != 0)
		if(me.iinS[me.cSlot] > 1){
			me.lslots[me.cSlot][me.iinS[me.cSlot] - 2].dropp(me.iinS[me.cSlot],"logic");
		}
		else
			me.slots[me.cSlot].dropp(me.cSlot,"no")
		
	}
	
	
	return me;
}
item = function(name,id,stackSize,skin,ss){
	var me = {
		x : 0,
		y : 0,
		lenght : tileLenght/2,
		height : tileHeight/2,
		name : name,
		id : id,
		skin : skin,
		invetory : false,
		ss : ss
	}
	me.usable = false;
	me.mapId = Math.random(); 
	me.cooldown = 0;
	me.printInInventory = function(X,Y,size){
		ctx.save();
		ctx.drawImage(me.skin,
		0,0,me.skin.width,me.skin.height,
		X,Y,size,size);
		ctx.restore();
	}
	me.printOnMap = function(){
		ctx.save();	
		var X = me.x - me.lenght/2;
		X = Math.floor(X);
		X = X - player.x;
		X += Clenght/2;
		var Lenght = me.lenght;
		var Y = me.y - me.height/2;
		Y = Math.floor(Y);
		Y = Y - player.y;
		Y += Cheight/2;
		var Height = me.height;
		//console.log(" I am drawing X  - "+X+"    Y -"+Y+"        - "+Lenght+"/"+Height);
		ctx.drawImage(me.skin,
		0,0,me.skin.width,me.skin.height,
		X,Y,Lenght,Height);
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
	
	me.mtp = function(){
		while(me.Collision(player) == false)
		{
			if(me.x > player.x)
				me.x-=0.2;
			else
				me.x+=0.2;
			if(me.y > player.y)
				me.y -=0.2;
			else
				me.y +=0.2;
	}
	}
	me.GTI = function(){
		console.log("i work")
		var iin = true;
		for(var i = 0;i < player.inventory.nos;i++)
			if(player.inventory.slots[i] != 0 && player.inventory.slots[i].id == me.id && player.inventory.iinS[i] < me.ss ){
				iin = true;
				console.log(i);
				player.inventory.iinS[i] ++;
				//console.log(player.inventory.iinS[i]);
				player.inventory.lslots[i][player.inventory.iinS[i] - 2] = me;
				iin = false;
				delete itemList[me.mapId];
			}
		if(iin)
		for(var i = 0;i < player.inventory.nos;i++)
			if(player.inventory.slots[i] == 0){
				
		console.log("picking up ");
		player.inventory.slots[i] = me;
		player.inventory.iinS[i] = 1;
		player.inventory.lslots[i] = {};
		delete itemList[me.mapId];
		break;
		}
	}
	me.update = function(){
		me.printOnMap();
		//console.log(" printing ");
		/*if(me.distance( player ) < 30 && me.cooldown > 50)
			me.mtp(); */
		if(me.Collision(player) && me.cooldown > 25) me.GTI();
		me.cooldown++;
	}
	me.dropp = function(i,word){
		if(word == "no"){
		me.x = player.x;
		me.y = player.y;
		player.inventory.slots[i] = 0;
		itemList[me.mapId] = me;
		player.inventory.iinS[i] = 0;
		me.cooldown = 0;
		}
		else
		{
		//console.log("logic");
		me.x = player.x;
		me.y = player.y;
		itemList[me.mapId] = me;
		player.inventory.lslots[player.inventory.cSlot][i] = player.inventory.lslots[player.inventory.cSlot][i + 1];
		player.inventory.lslots[player.inventory.cSlot][i + 1] = 0;
		player.inventory.iinS[player.inventory.cSlot] --;
		//console.log(player.inventory.iinS[player.inventory.cSlot]);
		me.cooldown = 0;
		}
	}
	me.drop = function(obj){
		me.x = obj.x;
		me.y = obj.y;
		itemList[me.mapId] = me;
		me.cooldown = 0;
	}
	return me;
}
wood = function(){
	var me = item("wood",1,10,skins.wood,5);
	
	return me;
}

rocki = function(){
	var me = item("wood",0,10,skins.rocki,5);
	
	return me;
}