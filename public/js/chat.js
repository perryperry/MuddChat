$(document).ready(function(){
	var notifications=0;
	var socket = io.connect();
	var $imgForm = $('#imgForm');
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	var $chat = $('#chat');
	var $chatWrap = $('#chatWrap');
	var $imageURL = $("#imageURL");
	var username = '';
	var userNames = [];
	var curUserNameAutoFill = 0;



	$("#loginWrapper").css("background", "url('/pics/emojis/helmets.gif')");

		function getTime() {
			var dt = new Date();
			var hours = dt.getHours() % 12;
			var time = hours + ":" + dt.getMinutes();
			return time;
		}

		// updates the chat window down to the most recent message
		function shiftChatWindow() {
			var chatHeight = document.getElementById("chatWrap").scrollHeight;
			document.getElementById("chatWrap").scrollTop = chatHeight;
		}

		function addChatBubble(css, data, side) {
			var time = getTime();

			// var emojiMsg = $("#emojiButton").attr("src"); 
			$chat.append('<div class="username ' + side + '" >' + 
							data.nick  + 
						'</div><div class="' + css 
						+ '"> <img src="' + data.emoji + '" class="emoji emojiChat" /> <div class="time"  style="color:#c9c9c9;">' + 
						 time + '</div><p>&#09;' + data.msg + '</p></div>');
		}

		$('contentWrap').show();
			$nickForm.submit(function(e){
				console.log("Submitting user name");
				e.preventDefault();
				username = $nickBox.val().toLowerCase();
				console.log("username: " + username);
				socket.emit('new user', username, function(data){
					if(data) {
						$('#loginWrapper').hide();
						$('#contentWrap').show();
					} else {
						$nickError.html('That username is already taken');
					}
				});
				$nickBox.val('');
			});

			// Submit message to server
			$messageForm.submit(function(e){
				e.preventDefault();
				var emojiData = $("#emojiButton").attr("src");
				//if($messageBox.val()) {
				socket.emit('send-message', {emoji: emojiData, msg: $messageBox.val(), username: username}, function(data) {
					$chat.append('<span class="error"><b>' + data + "<span><hr>");
				});
				$messageBox.val('');
				//}
			});

			// Helper function
			// moves the cursor in the text field to a specific focus range
			$.fn.selectRange = function(start, end) {
			    return this.each(function() {
			        if (this.setSelectionRange) {
			            this.focus();
			            this.setSelectionRange(start, end);
			        } else if (this.createTextRange) {
			            var range = this.createTextRange();
			            range.collapse(true);
			            range.moveEnd('character', end);
			            range.moveStart('character', start);
			            range.select();
			        }
			    });
			};

			// Handle releasing a key on the message input
			// 1) Handles private message auto fill
			// TODO: 2) Handles displaying though bubbles when typing 
			$('#message').on('keyup', function(e){
				if(userNames.length > 0) {
	    			e.preventDefault();
					var cur = $('#message').prop("selectionStart");
					var msg = $messageBox.val();
					//console.log("KeyCode: " + e.keyCode);
					// private message auto-fill feature
					if(msg == "@") {
						$messageBox.val(msg.substring(0, " "));
						// auto fill the username
						$messageBox.val(msg.substring(0, 1) + userNames[curUserNameAutoFill] + " ");
						// move the cursor to the start of the username
						$('#message').selectRange(1,1);

					}
					if(cur == 2 && msg.charAt(cur - 2) == '@' && e.keyCode == 39) {
						$('#message').selectRange(msg.length, msg.length);
					}
					return false;
				}
			}); 

			$('#message').on('keydown', function(e){
				// console.log("KeyCode: " + e.keyCode);
				if(userNames.length > 0 && (e.keyCode == 38 || e.keyCode == 40)) {
	   				e.preventDefault();
					if($messageBox.val()) {
						var cur = $('#message').prop("selectionStart");
						var msg = $messageBox.val();
						// private message auto-fill feature
						if( cur == 1 && msg.charAt(cur - 1) =='@') {
							// Adjust the position of username auto fill for private message
							if( e.keyCode == 38 ) {// 38 is up 
								curUserNameAutoFill ++;
								curUserNameAutoFill %= userNames.length;
								// console.log("index: " + curUserNameAutoFill );
							}
							if( e.keyCode == 40) {// 40 is down
								curUserNameAutoFill --;
								if(curUserNameAutoFill < 0) {
									curUserNameAutoFill = userNames.length - 1;
								}
								// console.log("index: " + curUserNameAutoFill );
							}
							$messageBox.val(msg.substring(0, " "));
							// auto fill the username
							$messageBox.val(msg.substring(0, cur) + userNames[curUserNameAutoFill] + " ");
							// move the cursor to the start of the username
							$('#message').selectRange(1,1);
						}
					}
					return false;
				}
			}); 

			// send image url to the chatroom for image rendering
			$imgForm.submit(function(e){
			  e.preventDefault();
			  var url = $imageURL.val();
			  console.log("image form submitted: " + url);
			  socket.emit('paste-image-url', url, function(data) {
					$chat.append('<span class="error"><b>' + data + "<span><hr>");
			  });
			  $imageURL.val('');
			});

			$(window).focus(function() {
		        notifications=0;
				document.title = "MuddChat";
		    });

			// receive new public message
			socket.on('new-message', function(data) {
				if(data.nick != username) {
					addChatBubble("talk-bubble round talktext", data, "leftside");
					// Update the tab's notifications if this tab isn't focused on
					if(! window.onfocus) {
					    notifications++;
					    var title = document.title;
					    var newTitle = '(' + notifications + ') MuddChat';
					    document.title = newTitle;
					}

				} else {
					addChatBubble("talk-bubble round talktext selfMessage", data, "rightside");
				}
				shiftChatWindow();
			});

			socket.on('usernames', function(data){
				var html = '<div id="users">';
				userNames = [];
				var sortNames = [];
				for(i=0; i < data.length; i ++) {
					sortNames.push(data[i].toLowerCase());
				}
				sortNames = sortNames.sort();
				for(i=0; i < data.length; i ++) {
					html += '<span class="user" >' + sortNames[i] + ' </span></div>';
					if(sortNames[i] != username) {
						userNames.push(sortNames[i]);
					}
				}
				$users.html(html);
			});

			// TODO: privateMsg
			socket.on('private-message', function(data){
				if(data.nick != username) {
					addChatBubble("talk-bubble round talktext privateMsg", data, "leftside");
				} else {
					addChatBubble("talk-bubble round talktext selfMessage privateMsg", data, "rightside");
				}
				shiftChatWindow();
			});



			// receive a new image from server
			socket.on('new-image', function(data){
				if(data.nick != username) {
					$chat.append('<img class="chatImg" src="' + data.url + '" />');
				} else {
					$chat.append('<img class="selfImage" src="' + data.url + '" />');
				}
				shiftChatWindow();
			});

		});