/**
*
*A unique and incremental id generator.
*/
var config = require('./config').config;
var bitChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('')

function genId(len,ch){
	var rt = '';
	for(var i= 0;i < len ;i++){
		rt += ch;
	}
	return rt;
}

function Id(init){
	this.bits = config.linkBits;
	this.value = init || genId(this.bits,bitChars[0]);
}

Id.prototype.nextId = function(){
	var chars = this.value.split("");
	var lowest = this.bits - 1;
	while(lowest >= 0){
		//The lowest char in bit chars array's index.
		var index  = bitChars.indexOf(chars[lowest]);
		
		var step = false;
		//Increase one.
		var next = index + 1;
		//If it's overflow,we must increase the higher bit.
		if(next >= bitChars.length){
			next = 0;
			step =true;
		}
		chars[lowest] = bitChars[next];

		if(step){
			lowest--;
		}else{
			break;
		}
	}

	if(lowest < 0)
		throw new Error("Id out of bounds.");
	var newValue = chars.join('');
	this.value = newValue;
	return newValue;
}

exports.createId = function(init){
	return new Id(init);
}
