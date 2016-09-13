function Component(){
	this.init = function(sSelector){
		/* Свойство elem - общее для вех объектов, которые будут наследоваться от component. идентификатор роль */
		this.elem = $(sSelector);
	//Ошибка доступа к главному селектору
	if(!this.elem.length){  //!this - not this
		alert("Can't caccess element by selector: " + sSelector);
		}	
	}
	this.find = function(sSelector){ //роль класса
		var findResult = this.elem.find(sSelector);
		if(findResult.length){
			return findResult;
		}
		else{
			alert("Could not find element by selector " + sSelector);
		}
	}
	
}
	
	
	
