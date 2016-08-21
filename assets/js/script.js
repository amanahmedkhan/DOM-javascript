(function(){
	'use strict';

	// Slider Start
		var i;
		var ul;
		var liItems;
		var imageNumber;
		var imageWidth;
		var prev, next;
		var currentPostion = 0;
		var currentImage = 0;

		function init(){
			ul = document.getElementById('slider');
			liItems = ul.children;
			imageNumber = liItems.length;
			imageWidth = liItems[0].children[0].clientWidth;
			ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
			prev = document.getElementById("prev");
			next = document.getElementById("next");
			slideThumb(imageNumber);
			prev.onclick = function(){ onClickPrev();};
			next.onclick = function(){ onClickNext();};
		}

		function animate(opts){
			var start = new Date;
			var id = setInterval(function(){
			var timePassed = new Date - start;
			var progress = timePassed / opts.duration;
			if (progress > 1){
				progress = 1;
			}
			var delta = opts.delta(progress);
			opts.step(delta);
			if (progress == 1){
				clearInterval(id);
				opts.callback();
			}
			}, opts.delay || 17);
		}

		function slideTo(imageToGo){
			var direction;
			var numOfImageToGo = Math.abs(imageToGo - currentImage);
			direction = currentImage > imageToGo ? 1 : -1;
			currentPostion = -1 * currentImage * imageWidth;
			var opts = {
				duration:1000,
				delta:function(p){return p;},
				step:function(delta){
					ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
				},
				callback:function(){currentImage = imageToGo;}	
			};
			animate(opts);
		}

		function onClickPrev(){
			if (currentImage == 0){
				slideTo(imageNumber - 1);
			} 		
			else{
				slideTo(currentImage - 1);
			}		
		}

		function onClickNext(){
			if (currentImage == imageNumber - 1){
				slideTo(0);
			}		
			else{
				slideTo(currentImage + 1);
			}		
		}

		function createThumb(src, alt) {
			var img = document.createElement('img');
			img.src = src
			if (alt!=null) img.alt= alt;
			return img;
		}

		function slideThumb(imageNumber){
			var thumbnails = document.getElementById('slide-thumbs');
			ul = document.getElementById('slider');
			liItems = ul.children;
			for (i = 0; i < imageNumber; i++){
				var li = document.createElement('li');
				var thumbImg = createThumb(liItems[i].children[0].src)
				li.appendChild(thumbImg);
				thumbnails.appendChild(li);
				li.onclick = function(i){
				return function(){
					slideTo(i);
				}
				}(i);
			}
		}
		window.onload = init;
	// Slider End

}());
// Form Validation Start
    function phonenumber(phoneNumber)
    {  
        var reg =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var OK = reg.exec(phoneNumber);  
        if (OK != null)  
          return true  
        else  
          return false  
    }  

	var error = document.getElementById("error");
	function validate(){
		if( document.contactForm.message.value == "" ){
	        error.innerHTML = "Please provide your message!";
	        document.contactForm.message.focus();
	        return false;
	    }
	    if( document.contactForm.fullname.value == "" ){
	        error.innerHTML = "Please provide your name!";
	        document.contactForm.fullname.focus();
	        return false;
	    }
	    if( document.contactForm.email.value == "" ){
	        error.innerHTML = "Please provide your email address!";
	        document.contactForm.email.focus();
	        return false;
	    }
	    if( document.contactForm.email.value != "" ){
	        var emailID = document.contactForm.email.value;
	        atpos = emailID.indexOf("@");
	        dotpos = emailID.lastIndexOf(".");
	         
	        if (atpos < 1 || ( dotpos - atpos < 2 )) 
	        {
	            error.innerHTML = "Please enter correct email ID";
	            document.contactForm.email.focus() ;
	            return false;
	        }
	    }

	    if( document.contactForm.phone.value == "" ){
	        error.innerHTML = "Please provide your valid Phone Number!";
	        document.contactForm.phone.focus() ;
	        return false;
	    }

	    if ( document.contactForm.phone.value != "" ){
	    	if(phonenumber(document.contactForm.phone.value)) {
            }else{
                error.innerHTML = "Please provide your valid Phone Number!";
                return false
            }
	    }
	    return true;
	}
// Form Validation End