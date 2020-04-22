var currentColor = document.querySelectorAll("header .col")[1];
var newGame = document.querySelector("#new");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var boxes = document.querySelectorAll(".box");
var isHard = true;
var header = document.getElementsByTagName("header")[0];
var correct = document.querySelector("#correct");
hard.classList.add("bg-info","text-white");
var gameOver = false;
function colorGenerator () {
	var color = [0,0,0];
	for(var i=0;i<3;i++){
		color[i] = Math.floor(Math.random()*1000)%256;
	}
	return color;
}

var color;
var randomColor={};

function colorAssignment(num){
	for(var i=0;i<num;i++){
		randomColor[i] = colorGenerator();
		boxes[i].style.backgroundColor = "rgb(" + randomColor[i][0]+","+randomColor[i][1]+","+randomColor[i][2]+" )";
		boxes[i].classList.remove("invisible");
		if(i==num-1) color = randomColor[Math.floor(Math.random()*10)%num];
	}
	currentColor.textContent = "RGB( " + color[0]+" , "+color[1]+" , "+color[2]+" )";
	header.classList.add("bg-info");

}

colorAssignment(6);

function hovered(){
	if(this==easy || this ==newGame || this == hard)this.classList.add("bg-info","text-white");
	document.body.style.cursor = 'pointer';
}

function mouseout() {
	if(this==easy && isHard){
		this.classList.remove("bg-info","text-white");
	}
	else if(this==hard && !isHard){
		this.classList.remove("bg-info","text-white");
	}
	else if(this == newGame){
		this.classList.remove("bg-info","text-white");
	}
	document.body.style.cursor = 'initial';
}

function modeSelected(){
	this.classList.add("bg-info","text-white");
	if(this == easy && isHard && !gameOver){
		hard.classList.remove("bg-info","text-white");
		document.querySelector(".no-gutters:last-child").classList.add("invisible");
		colorAssignment(3);
		isHard = !isHard;
	}
	else if(this == hard && !isHard && !gameOver){
		easy.classList.remove("bg-info","text-white");
		document.querySelector(".no-gutters:last-child").classList.remove("invisible");
		colorAssignment(6);
		isHard = !isHard;
	}
}


easy.addEventListener("mouseover",hovered);
easy.addEventListener("mouseout",mouseout);
easy.addEventListener("click", modeSelected)

hard.addEventListener("mouseover",hovered);
hard.addEventListener("mouseout",mouseout);
hard.addEventListener("click", modeSelected)

newGame.addEventListener("mouseover",hovered);
newGame.addEventListener("mouseout",mouseout);
newGame.addEventListener("click",function(){
	if(isHard){
		colorAssignment(6);
	}
	else{
		colorAssignment(3);
	}
	newGame.textContent = "New Game";
	correct.classList.add("invisible");
	gameOver=false;
});

for(var i=0;i<6;i++){
	boxes[i].addEventListener('mouseover',hovered);
	boxes[i].addEventListener('mouseout',mouseout);
	boxes[i].addEventListener('click', function(){
		if(this.style.backgroundColor == "rgb(" + color[0]+", "+color[1]+", "+color[2]+")"){
			for(var i=0;i<isHard?6:3;i++){
				boxes[i].classList.remove("invisible");
				boxes[i].style.backgroundColor = "rgb(" + color[0]+", "+color[1]+", "+color[2]+")";
				header.style.backgroundColor = "rgb(" + color[0]+", "+color[1]+", "+color[2]+")";
				header.classList.remove("bg-info");
				correct.classList.remove("invisible");
				correct.style.color = "rgb(" + color[0]+", "+color[1]+", "+color[2]+")";
				newGame.textContent = "Play Again?"
				gameOver = true;
			}
		}
		else{
			this.classList.add("invisible");
		}
	})
}