var game = {};
	game.prototypes = {
		y: function(n){if(n > -1){this.style.top = n + 'px'}return Number(String(this.style.top).replace(/[^0-9\-\.]/gmsi,''))},
		x: function(n){if(n > -1){this.style.left = n + 'px'}return Number(String(this.style.left).replace(/[^0-9\-\.]/gmsi,''))},
		w: function(n){if(n > -1){this.offsetWidth = n}return this.offsetWidth},
		h: function(n){if(n > -1){this.offsetHeight = n}return this.offsetHeight},
		v: function(n){if(n > -1){this.innerHTML = n}return Number(this.innerHTML)}
	};
	game.init = function(){
		this.game = document.querySelector('#game');
		var gridItemSize = 20; // 20x20
		var gridRows = this.game.offsetHeight / gridItemSize;
		var gridColumns = this.game.offsetWidth / gridItemSize;
		this.grid = Array(gridRows).fill(0).map((v,i)=>{
			return Array(gridColumns).fill(0).map((vv,ii)=>{
				var gridItem = document.createElement('div');
					gridItem.append(document.createElement('div'));
					gridItem.classList.add('gridItem');
					gridItem.setAttribute('gridRow',i);
					gridItem.setAttribute('gridCol',ii);
					gridItem.addEventListener('click',(event)=>{
						var e = event.target.parentElement;
						var row = Number(e.getAttribute('gridRow'));
						var col = Number(e.getAttribute('gridCol'));
						var option = e.classList.contains('active');
						if(game.busy === false){
							if(option){
								game.shimmerOff(row, col);	
							}else{
								game.shimmerOn(row, col);
							}
						}
					});
				this.game.append(gridItem);
				return gridItem;
			});
		});
		this.gridItems = this.grid.length * this.grid[0].length;
	};
	game.busy = false;
	game.shimmerOn = function(row, col){
		game.busy = true;
		setTimeout((row,col)=>{
			if(game.grid[row]){
				if(game.grid[row][col]){
					if(game.grid[row][col].classList.contains('active') === false){
						game.grid[row][col].classList.add('active');
						game.shimmerOn(row - 1, col);	// top: -1,0
						game.shimmerOn(row, col - 1);	// left: 0,-1
						game.shimmerOn(row + 1, col);	// bottom: +1, 0
						game.shimmerOn(row, col + 1);	// right: 0,+1
						if(document.querySelectorAll('#game > div.active').length ==  game.gridItems){
							game.busy = false;
						}
						return true
					}
				}
			}
		},50,row,col);		
		return false
	};
	game.shimmerOff = function(row, col){
		game.busy = true;
		setTimeout((row,col)=>{
			if(game.grid[row]){
				if(game.grid[row][col]){
					if(game.grid[row][col].classList.contains('active') === true){
						//console.log(row,col);
						game.grid[row][col].classList.remove('active');
						game.shimmerOff(row - 1, col);	// top: -1,0
						game.shimmerOff(row, col - 1);	// left: 0,-1
						game.shimmerOff(row + 1, col);	// bottom: +1, 0
						game.shimmerOff(row, col + 1);	// right: 0,+1
						if(document.querySelectorAll('#game > div.active').length == 0){
							game.busy = false;
						}
						return true
					}
				}
			}		
		},50,row,col);		
		return false
	}

