
var req =new XMLHttpRequest();
req.open("GET","./json/image_list.json");
req.onreadystatechange = function(){
	if( this.readyState == 4){
		//console.log(this.response);
	var date = JSON.parse(this.response);
		for(var i = 0; i< date.length ; i++){
		var div	= document.createElement("div");
			div.setAttribute("class","image");
			var img = document.createElement("img");
			img.src = date[i];
			div.appendChild(img);
			document.body.appendChild(div);
			
		}
	}
}
req.send();