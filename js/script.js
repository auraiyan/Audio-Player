var songs = ["", "Unlike Pluto - Revenge, And A Little More.mp3", "Vindu - Japanese Spring _Stories From Japan EP_ (japanese lo-fi).mp3", "Dirty Palm & Conor Ross - Flowers.mp3", "Haywyre - Never Count On Me.mp3"];
var songNo = 0;
var posters = ["image/poster0.jpg", "image/poster1.jpg", "image/poster2.jpg", "image/poster3.jpg", "image/poster4.jpg"];
var posterNo = 0;
var playlist = [];
var playlistNo = null;
var playlistNoMax = 0;


var muteImg = document.getElementById("volImg");
var posterImg = document.getElementById("imager");
posterImg.src = posters[posterNo];

var canvas = document.getElementById("thisCanvas");
var title = document.getElementById("songTitle");
var renderer = document.getElementById("renderer");
var ctx1 = renderer.getContext("2d");
var player = document.getElementById("audioPlayer");
player.crossOrigin = "";
player.src = songs[songNo];

var seek_Bar = document.getElementById("seek-bar");



var vol = 1;
var muted = false, disabled = false;

//visualizer Variables


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



function loadCanvas() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    
    //var grd = ctx.createRadialGradient(((canvas.width / 2) * Math.random()), ((canvas.height / 2) * Math.random()), 100, ((canvas.width) * Math.random()), ((canvas.height) * Math.random()), canvas.width);
    var grd = ctx.createLinearGradient(0,0,0,1024);
    grd.addColorStop(0, random1());
    grd.addColorStop(Math.random(), random1());
    grd.addColorStop(1, random1());
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = grd;
    ctx.fill();
    
    var grd1 = ctx.createRadialGradient(((canvas.width / 2) * Math.random()), ((canvas.height / 2) * Math.random()+40), 100, ((canvas.width) * Math.random()), ((canvas.height) * Math.random()+20), canvas.width);
    grd1.addColorStop(0, random1());
    grd1.addColorStop(Math.random()*.7, random1());
    grd1.addColorStop(1, random1());
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = grd1;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    //randomize the colors
    function random1() {
        switch (Math.round(Math.random() * (21 - 1) + 1)) {
        case 0:
            value = "#240b36";
            break;
        case 1:
            value = "#051937";
            break;
        case 2:
            value = "#642B73";
            break;
        case 3:
            value = "#FFF5FF";
            break;
        case 4:
            value = "#fffbd5";
            break;
        case 5:
            value = "#6C5B7B";
            break;
        case 6:
            value = "#355C7D";
            break;
        case 7:
            value = "#fffbd5";
            break;
        case 8:
            value = "#FC466B";
            break;
        case 9:
            value = "#fff";
            break;
        case 10:
            value = "#b20a2c";
            break;
        case 11:
            value = "#43655A";
            break;
        case 12:
            value = "#C06C84";
            break;
        case 13:
            value = "#005A34";
            break;
        case 14:
            value = "#c31432";
            break;
        case 15:
            value = "#000000";
            break;
        case 16:
            value = "#C6C6C6";
            break;
        case 17:
            value = "#3F5EFB";
            break;
        case 18:
            value = "#fffbd5";
            break;
        case 19:
            value = "#333333";
            break;
        case 20:
            value = "#fff";
            break;
        case 21:
            value = "#F2ECFF";
            break;
        }
        return value;
    }
        
    
    }

/*function play(){
    if(playlistNoMax > 0){
    playlistNo++;
    player.src = playlist[playlistNo];
    player.play();
    title.textContent = playlist[playlistNo];
    document.getElementById("imgBtn").src = "image/pause.png";
    }
}
*/
function next() {
    songNo += 1;
    posterNo += 1;
    if (songs[songNo] == null) {
        songNo = 0;
        player.src = songs[songNo];
        title.textContent = songs[songNo];
        player.play();
        
    

        if(posters[posterNo] == null){
            posterNo = 0;
            posterImg.src = posters[posterNo];
        }
        else {
            posterImg.src = posters[posterNo];
        } 
    }
    else
    {
        title.textContent = songs[songNo];
        player.src = songs[songNo];
        player.play();
        
    
        if(posters[posterNo]==null){
            posterNo = 0;
            posterImg.src = posters[posterNo];
        }
        else {
            posterImg.src = posters[posterNo];} 
    }
}

function pre(){
    songNo -= 1;
    posterNo -= 1;
    if (songs[songNo] == null){
        songNo = 4;
        player.src = songs[songNo];
        title.textContent = songs[songNo];
        player.play();
        
    
        //set the poster
        if(posters[posterNo]===null){
            posterNo = 4;
            posterImg.src = posters[posterNo];
        }
        else {
            posterImg.src = posters[posterNo];} 
    }
    else
    {
        player.src = songs[songNo];
        title.textContent = songs[songNo];
        player.play();
        
      
        if(posters[posterNo]==null){
            posterNo = 4;
            posterImg.src = posters[posterNo];
        }
        else {
            posterImg.src = posters[posterNo];} 
    }
}

function seekBar(){
    if(!disabled) {
    seek_Bar.max = player.duration;
    seek_Bar.value = player.currentTime;
    }

    var timelapsed = document.getElementById("timer");
    var timeLeft = document.getElementById("time_Left");
//Timelapse calculation
    var seconds = Math.round(player.currentTime);
    var mins = Math.floor(seconds /60);
    var secs = seconds - (mins * 60);

//Duration calculation
    var seconds1 = Math.round(player.duration); 
    var mins1 = Math.floor(seconds1 / 60);
    var secs1 = seconds1 - (mins1 * 60);


    timelapsed.innerHTML = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    timeLeft.innerHTML = (mins1 < 10 ? "0" : "") + mins1 + ":" + (secs1 < 10 ? "0" : "") + secs1;

}
function volume(value){
    if (value<5){
        player.volume = 0;
        
        muteImg.src = "image/mute.png";
        return;
    }
    else {
        muteImg.src = "image/vol.png";
        player.volume = (value/100);
    }
    


}
function Muter(){
    
    if (!muted){
        
        vol = player.volume;
        muted = true;
        muteImg.src = "image/mute.png";
        vol = player.volume;
        player.volume = 0;
    }
    else{
        muteImg.src = "image/vol.png";
        player.volume = vol;
        muted = false;
    }
     
}
function seek(value){

    player.currentTime = value;

}
function disable(){
    disabled = true;
}
function enable(){
    disabled = false;
}

/*/DROPLAYER
var dropZone = document.getElementById("dropLayer")

$(document).on('dragover', function(event) {
	event.stopPropagation();
	event.preventDefault();

	dropZone.removeClass('hidden');
});

dropZone.on('dragleave', function(event) {
	event.stopPropagation();
	event.preventDefault();

	dropZone.addClass('hidden');
});

dropZone.on('dragover', function(e) {
	e.stopPropagation();
	e.preventDefault();
	e.originalEvent.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
dropZone.on('drop', function(e) {
	e.stopPropagation();
	e.preventDefault();


	if(e.originalEvent.dataTransfer.items){
		// For chrome users folder upload is supported

		var items = e.originalEvent.dataTransfer.items;
		for(var j=0; j<items.length; j++){
			var item = items[j].webkitGetAsEntry();
			if(item){
				traverseFileTree(item);
			}
		}
	}
	else{
		// Other browser users have to upload files directly

		var files = e.originalEvent.dataTransfer.files;

		for(var j=0; j<files.length; j++){
			if(files[j].type.match(/audio\/(mp3|mpeg)/)){

				getID3Data(files[j], function (song) {
					songs.push(song);
					playlist.push(song);
					
				});
			}
		}
    }
});
 
function traverseFileTree(item,path) {
	path = path || "";
	if(item.isFile){
		item.file(function(file){
			if(file.type.match(/audio\/mp3/)){
				getID3Data(file, function (song) {
					songs.push(song);
                    playlist.push(song);
                    play();
				});
			}
		})
	}
	else if(item.isDirectory){
		var dirReader = item.createReader();
		dirReader.readEntries(function (entries) {
			for(var j=0; j<entries.length; j++){
				traverseFileTree(entries[j], path + item.name + "/");
			}
		})
	}
}
*/
//Visualizer data


function visualizer(){

    if(player.paused || player.ended){
        
       AnimationFramer();
}
else {
    player.pause();
    cancelAnimationFrame(renderFrame);
    document.getElementById("imgBtn").src = "image/play.png";
}
}

    //variable for the renderer to use for more framerates
var width = 5;
    var spacing = 10;
    var bars = window.innerWidth / (5 + spacing);
    
    renderer.width = window.innerWidth;
    renderer.height = window.innerHeight;
    var absoluteWidth = spacing + width;

    
function AnimationFramer() {
    var ctx1 = renderer.getContext("2d");
    
    connect();

    title.textContent = songs[songNo];
    document.getElementById("imgBtn").src = "image/pause.png";
    var actx = new AudioContext();
    var audioSrc = actx.createMediaElementSource(player);
    analyser = actx.createAnalyser();
    audioSrc.connect(analyser);

        
    analyser.fftSize  = 512;
    analyser.maxDecibels = 0; 
    analyser.smoothingTimeConstant  = 0.8;
    var frequencyArray = (analyser.frequencyBinCount);
        frequencyData = new Uint8Array(frequencyArray);
       audioSrc.connect(actx.destination);
    renderFrame();
    
}
function renderFrame(){
    try{
   ctx1.clearRect(0, 0, window.innerWidth, window.innerHeight);

   analyser.getByteFrequencyData(frequencyData);
   var y =  window.innerHeight;

        for(var i = 1; i< bars;i++){
        var x = absoluteWidth * i;
        var yy = window.innerHeight - ((frequencyData[i] ) + 5);
        var y1 = window.innerHeight - (frequencyData[i] * 1.2); 
        var y2 = window.innerHeight - (frequencyData[i] * 1.5);
        var y3 = window.innerHeight - (frequencyData[i] * 2);

        //linecolor = "rgb(" + 205 + ", " + 255 + ", " + 255 + ")";
        var grd1 = ctx1.createLinearGradient(0, 0, 0, window.innerHeight);
        //(x,y, x1, y1)
        grd1.addColorStop(0.8, '#fff');
        grd1.addColorStop(0.95, '#f12711');
        grd1.addColorStop(1 , 'black')


        ctx1.strokeStyle = grd1;
        ctx1.beginPath();
        ctx1.lineWidth = width;
        ctx1.globalAlpha = 0.95;
        ctx1.moveTo(x, y);
        ctx1.lineTo(x,yy);
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.lineWidth = width;
        ctx1.globalAlpha = 0.25;
        ctx1.moveTo(x, y);
        ctx1.lineTo(x,y1);
        ctx1.stroke();

        ctx1.beginPath();
        ctx1.lineWidth = width;
        ctx1.globalAlpha = 0.15;
        ctx1.moveTo(x, y);
        ctx1.lineTo(x,y2);
        ctx1.stroke();
        
        ctx1.beginPath();
        ctx1.lineWidth = width;
        ctx1.globalAlpha = 0.1;
        ctx1.moveTo(x, y);
        ctx1.lineTo(x, y3);
        ctx1.stroke();
        }

        
    
    
    
        requestAnimationFrame(renderFrame);
    }
    catch(err){
    console.warn('theres an error');
        console.log(err.message)
    }
    }
