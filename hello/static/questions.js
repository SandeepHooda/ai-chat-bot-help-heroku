(function() {
	
	
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
			for (let i=0;i<faqArray.faqs.length;i++){
				for (let j=0;j<faqArray.faqs[i].questions.length;j++){
					let question = faqArray.faqs[i].questions[j]
					faqHtml +=faq_pre_li+question+faq_post_li
				}
				
			}
			faqHtml +=faq_post;
			document.getElementById("faqList").innerHTML = faqHtml;
			 
			}
		  };
		xhttp.open("GET", "/static/faq.json", true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();  
	}
	var faq_display = document.getElementById("faq_display");
  var chat_display = document.getElementById("chat_display");

	getQuestionsList();
	
	

})();