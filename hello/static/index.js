(function() {
	
	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimaitonFrame ||
					function (callback) {
					 	window.setTimeout(callback, 1000/60);
					};
	})();

	window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
let isMobile = window.mobilecheck();

	let bot_pre = '<div class="d-flex justify-content-start mb-4">	<div class="img_cont_msg">	<img src="/static/MS.png" class="rounded-circle user_img_msg"> </div> <div class="msg_cotainer">'
	let bot_post = '<span class="msg_time"></span></div></div>'
	// Set up the canvas
	let user_pre = '<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send">'
	let user_post = '<span class="msg_time_send"></span></div></div>'
	function submitUserQuestion(){
		
		let userChat = document.getElementById("user-msg").value ;
		if (userChat.trim() == ''){
			return;
		}
		showUserQuestion(userChat)
		document.getElementById("user-msg").value = '';
		getBotResponse(userChat)
	}
		
	var submitBtn = document.getElementById("submitBtn");
	
	submitBtn.addEventListener("click", function (e) {
		submitUserQuestion();
	
	}, false);
	let volumeOn = false;
	var volume = document.getElementById("volume");
	var btn_volume_on = document.getElementById("btn_volume_on");
	var btn_volume_off = document.getElementById("btn_volume_off");
	
	volume.addEventListener("click", (e) => {
		volumeOn = !volumeOn;
		if (volumeOn){
			 btn_volume_on.style.display = "block";
			 btn_volume_off.style.display = "none";
		}else {
			 btn_volume_on.style.display = "none";
			 btn_volume_off.style.display = "block";
		}
	
	}, false);
	
	var input = document.getElementById("user-msg");
	input.addEventListener("keyup", function(event) {
	  // Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
		  var x = document.getElementsByClassName("autocomplete-items");
		  
		  if (!isMobile){//Remove auto complete
			  for (var i = 0; i < x.length; i++) {
			  if (event.target != x[i] ) {
				x[i].parentNode.removeChild(x[i]);
			  }
			}
		  }
			
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		submitUserQuestion();
	  }
	});
	
	function showUserQuestion(userChat){
		let userQuestion = bot_pre+userChat+bot_post
		document.getElementById("chat-window").innerHTML = document.getElementById("chat-window").innerHTML + userQuestion;
		
	}
	function getBotResponse(userChat){
		if (userChat.trim() == ''){
			return;
		}
		var xhttp =  new XMLHttpRequest();;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
		 } else {
			// code for old IE browsers
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if (volumeOn){
					readOutLoud(this.responseText)
				}
			
			let botAnswer = user_pre+this.responseText+user_post
			chartDiv = document.getElementById("chat-window")
			chartDiv.innerHTML +=   botAnswer;
			 chartDiv.scrollTop = chartDiv.scrollHeight;
			}
		  };
		xhttp.open("GET", "chatresponse?user_text="+userChat, true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();  
	}
	let faq_pre = '<ui class="contacts">'
	let faq_post = '</ui>'
	let faq_pre_li = '<li><div class="d-flex bd-highlight"><div class="user_info"><p>'
	let faq_post_li = '</p></div></div></li>'
	function getQuestionsList(){
		var xhttp =  new XMLHttpRequest();;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
		 } else {
			// code for old IE browsers
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			
			var faqArray = JSON.parse(this.responseText);
			let faqHtml = faq_pre
			for (let i=0;i<faqArray.length;i++){
				faqHtml +=faq_pre_li+faqArray[i]+faq_post_li
			}
			faqHtml +=faq_post;
			document.getElementById("faqList").innerHTML = faqHtml;
			 
			}
		  };
		xhttp.open("GET", "/static/Questions.json", true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();  
	}
	var faq_display = document.getElementById("faq_display");
  var chat_display = document.getElementById("chat_display");
	/*if (!isMobile){
		 faq_display.style.display = "block";
		 chat_display.style.display.width = "70%"
		getQuestionsList();
	}else {*/
		faq_display.style.display = "none";
		chat_display.style.display.width = "100%"
	//}
	
	
	function readOutLoud (message) {
		  var speech = new SpeechSynthesisUtterance();

		  // Set the text and voice attributes.
		  speech.text = message;
		  speech.volume = 1;
		  speech.rate = 1;
		  speech.pitch = 1;

		  window.speechSynthesis.speak(speech);
	}
	
	
	var recognition = null;
	function listenToVoice() {
		
		recognition.start();
	}
	
	var micBtn = document.getElementById("floatingBtnMic");
	
	micBtn.addEventListener("click", function (e) {
		listenToVoice()
		
	}, false);

	function voiceInit() {
		try {
			  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			  recognition = new SpeechRecognition();
			  recognition.continuous = true;
			  recognition.onstart = function() { 
				  //alert('Voice recognition activated. Try speaking into the microphone.');
				}

			  recognition.onspeechend = function() {
				  //alert('You were quiet for a while so voice recognition turned itself off.');
				}

			  recognition.onerror = function(event) {
				  /*if(event.error == 'no-speech') {
				    alert('No speech was detected. Try again.');  
				  };*/
				}
			  recognition.onresult = function(event) {

				  // event is a SpeechRecognitionEvent object.
				  // It holds all the lines we have captured so far. 
				  // We only need the current one.
				  var current = event.resultIndex;

				  // Get a transcript of what was said.
				  var transcript = event.results[current][0].transcript;

				  // Add the current transcript to the contents of our Note.
				  // There is a weird bug on mobile, where everything is repeated twice.
				  // There is no official solution so far so we have to handle an edge case.
				  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

				  if(!mobileRepeatBug) {
				    //noteContent += transcript;
					// Add the current transcript to the contents of our Note.
					let userUtter = transcript;
					showUserQuestion(userUtter)
					document.getElementById("user-msg").value = '';
					getBotResponse(userUtter)
					  
					  
				  }

				  
				  
				}
			}
			catch(e) {
			  
			}
	}
voiceInit()


if (!isMobile){
	
	/** Auto complete code start **/
function wordsMatchFound(questionStatement, words){
	for (i = 0; i < words.length; i++) {
		if(questionStatement.toUpperCase().indexOf(words[i].toUpperCase()) <0){
			return false;
		}
	}
	return true;
}
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
		let wordsInUserQuery = val.split(" ");
		if (wordsMatchFound (arr[i], wordsInUserQuery) ){
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
		  let wordsInQuestion =  arr[i].split(" ");
		  for (j = 0; j < wordsInQuestion.length; j++) {
			  let userQuesryLastWord = wordsInUserQuery[wordsInUserQuery.length -1];
			  if ( val.toUpperCase().indexOf(wordsInQuestion[j].toUpperCase()) >=0 ){
				  b.innerHTML += "<strong>" + wordsInQuestion[j] + "</strong> ";
			  }else if (userQuesryLastWord != '' && wordsInQuestion[j].toUpperCase().startsWith(userQuesryLastWord.toUpperCase()) ){
				  b.innerHTML += "<strong>" + wordsInQuestion[j].substr(0, userQuesryLastWord.length) + "</strong>"+wordsInQuestion[j].substr(userQuesryLastWord.length)+ ' ';
			  }
			  else {
				  b.innerHTML += wordsInQuestion[j]+ ' ';
			  }
		  }
          //b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          //b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function getAllPossibleQuestions(){
		
		var xhttp =  new XMLHttpRequest();;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
		 } else {
			// code for old IE browsers
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let userQuestions = [];
				let questionAns = JSON.parse(this.responseText);
				for (let i=0;i<questionAns.faqs.length;i++){
					let question = questionAns.faqs[i].questions[0].replace(/[^0-9a-zA-Z ]+/g, '');
					userQuestions.push(question)
				}
				/*An array containing all the country names in the world:*/
				

				/*initiate the autocomplete function on the "user-msg" element, and pass along the countries array as possible autocomplete values:*/
				autocomplete(document.getElementById("user-msg"), userQuestions);
			}
		  };
		xhttp.open("GET", "/static/faq.json", true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();  
	}


getAllPossibleQuestions()
/** Auto complete code ends **/
}

})();