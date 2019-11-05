
var player = document.getElementById("audioPlayer");

SC.initialize({
    client_id: '59935a11f9f900d300670793c7674d6d'
  });
function connect() {
  SC.stream("tracks/99231270", function(sound){
    $("audioPlayer").attr("src", sound.uri);
    player.play();
});
}