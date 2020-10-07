makemap = function(){
	var me = {};
	me.arr = [];
	me.createArr = function(){
	for(var q = 0;q < mapHeight;q++)
	me.arr [q] = [];
	}
	me.populateArr = function(){
	for(var q = 0;q < mapHeight;q++)
		for(var z = 0;z < mapLenght;z++)
			me.arr[q][z] = 1;
	}
	me.generateMap = function(){
		var minsize = (mapHeight/2)*(mapLenght/2);
		var maxsize = (mapHeight-6)*(mapLenght - 6);
		var size = Math.floor(Math.random()*(maxsize - minsize)) +minsize;
		var rectlist = {};
		var i = 0;
		while ( size > 2) {
			rectlist[i] = mrfs(4)
			size -=4;
			i++;
		}
		//console.log(rectlist);
		rectlist[i] = mrfs(size);
		rectlist[0].x = mapLenght/2;
		rectlist[0].y = mapHeight/2;
		POM(rectlist[0],0);
		for(var z = 1;z <= i;z++){
			var counter = 0;
			//console.log(z);
			var top = true;
			do
			{
			var dir = Math.floor((Math.random()*8)/2);
			var nexto = Math.floor(Math.random()*(z-1));
			//console.log(" dir   - " + dir + "  nexto   -  " + nexto);
			if( dir == 0 ){
			var ydf = rectlist[z].height/2 + rectlist[nexto].height/2;
			ydf = Math.floor(ydf);
			ydf = Math.abs(ydf);
			rectlist[z].x = rectlist[nexto].x;
			rectlist[z].y = rectlist[nexto].y - ydf;
			}
			if( dir == 1 ){
			var xdf = rectlist[nexto].lenght/2 + rectlist[nexto].lenght/2;
			xdf = Math.floor(xdf);
			xdf = Math.abs(xdf);
			rectlist[z].x = rectlist[nexto].x + xdf;
			rectlist[z].y = rectlist[nexto].y;
			}
			if( dir == 2 ){
			var ydf = rectlist[z].height/2 + rectlist[nexto].height/2;
			ydf = Math.floor(ydf);
			ydf = Math.abs(ydf);
			rectlist[z].x = rectlist[nexto].x;
			rectlist[z].y = rectlist[nexto].y + ydf;
			}
			if( dir == 3 ){
			var xdf = rectlist[nexto].lenght/2 + rectlist[nexto].lenght/2;
			xdf = Math.floor(xdf);
			xdf = Math.abs(xdf);
			rectlist[z].x =  rectlist[nexto].x - xdf;
			rectlist[z].y = rectlist[nexto].y;
			}
			counter ++;
			//console.log(" new pos " + IPV(rectlist[z]));
			if(counter > 10){
			//console.log(" falil" );
			top = false;
			break;
			}
			}
			while(IPVM(rectlist[z]) == false);
			if(top)POM(rectlist[z],0);
		}
	}
	
	me.grass = new Image();
	me.grass.src = "Img/Grass.png";
	me.water = new Image();
	me.water.src = "Img/Water.png";
	me.print = function()
	{
		//console.log(" printing ");
		var x = Clenght/2 - player.x;
		var y = Cheight/2 - player.y;
		x = x/tileLenght;
		y = y/tileLenght;
		//console.log(x+"      -xy-    "+y);
		for(var i = 0;i < mapHeight;i++)
			for(var z = 0 ; z < mapLenght;z++)
			  if(me.arr[i][z] != 1 ){
				//console.log(" print at " + z + "  -   "+  i);
				ctx.drawImage(me.grass,
				0,0,me.grass.width,me.grass.height,
				(x+z)*tileLenght,(y+i)*tileHeight,tileLenght,tileHeight
			);
			}
			else
			ctx.drawImage(me.water,
				0,0,me.water.width,me.water.height,
				(x+z)*tileLenght,(y+i)*tileHeight,tileLenght,tileHeight
			);
	}
	
	me.getMNcords = function(){
	me.maxX = 0;
	me.minX = mapLenght;
	me.maxY = 0;
	me.minY = mapHeight;
	for(var i = 0; i < mapHeight;i++)
		for(var q = 0;q < mapLenght;q++)
			if(map.arr[i][q] == 0){
				if(q > me.maxX ) me.maxX = q;
				if(q < me.minX ) me.minX = q;
				if(i > me.maxY ) me.maxY = i;
				if(i < me.minY ) me.minY = i;
			}
		console.log("minX  - " + map.minX);
		console.log("maxX  - " + map.maxX);
		console.log("minY  - " + map.minY);
		console.log("maxY  - " + map.maxY);
	}
	
	
	me.create = function(){
		me.createArr();
		me.populateArr();
		me.generateMap();
		me.getMNcords();
	    objList ={};
	}
	return me;
	}