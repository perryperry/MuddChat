// ###################################################
// ###################	EMOJI ########################
// ###################################################

// emoji pics names
var EMOJI_COUNT = 83;
// nfl teams
var TEAMS = 32;
var isEmojiMenu = false;

// Build the emoji choices menu
var folder = "/pics/emojis/emoji";
var i = 1;
for(i = 1; i < EMOJI_COUNT + 1; i ++) {
	if(i == 77) {
		$("#emojiStart").append("<img src='" + folder + ".gif' class='emoji emojiChoice' />");
	}
	var next = i + "";
	$("#emojiStart").append("<img src='" + folder + next + ".png' class='emoji emojiChoice' />");
}

for(i = 1; i < TEAMS + 1; i ++) {

	var next = i + "";
	$("#emojiStart").append("<img src='/pics/football/helmet" + next + ".png' class='emoji emojiChoice' />");
}
$("#emojiStart").append("<img src='/pics/emojis/helmets.gif' class='emoji emojiChoice' />");