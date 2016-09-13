function Container(sSelector){
	var c = this;

	c.init(sSelector);
	c.ulMenu 		= c.find(".b-header__menu");
	c.liMenu 		= c.ulMenu.find(".b-header__menu-item");
	c.slider		= c.find(".b-slider__slides");
	c.sliderItem	= c.find(".b-slider__slide");
	c.scrollWidth	= c.sliderItem.width(); /* scroll width */
	c.sliderWidth	= c.sliderItem.length*c.scrollWidth; /* the width of the entire slider area, all the pictures */		
	c.currentWidth 	= 0;
	c.slide 		= null;
	c.paused 		= false;
	c.btnUp			= c.find(".b-footer__btn");
	c.textFields 	= c.find(".b-textfield");
	c.errorMessage 	= c.find(".b-form__message_error");


	
	//methods
	c.subMenu = function(){ //menu
		$(this).children(".b-submenu").stop().slideToggle(200);
	}

	c.showSlide = function(iShift){ //start of slider
		c.currentWidth += c.scrollWidth*iShift; /* 1400*2 = 2800 - next image */
		if(c.currentWidth >= c.sliderWidth){
			c.sliderItem.eq(0).clone().appendTo(c.slider);
			c.sliderItem.eq(1).clone().appendTo(c.slider); //prependTo
			//c.currentWidth = 0;
			//c.slider.stop().animate({scrollLeft: c.currentWidth}, 0.000001);
		}
		c.slider.stop().animate({scrollLeft: c.currentWidth}, "slow"); /* stop - prevent bug of animation */
	}
	c.slider.click(function(){
		c.paused = !c.paused;
	});
	setInterval(function(){
		if(!c.paused){
			c.showSlide(1);
		};
	}, 2000); //end of slider

	c.scrollUp = function(event){ //go up
		event.preventDefault();
		$("html,body").stop().animate({scrollTop:0},"slow");
	}

	c.check = function(event){ //form
		var form_error = false
			,regexps = {
					 "name"			: "^[А-ЯЁа-яёA-Za-z\\-\\.]{2,50}$"
					,"age"			: "^[1-9][0-9]$"
					,"email"		: "^[a-z0-9\\-_\\.]{1,255}@[a-z0-9\\-]{1,64}\\.[a-z]{2,20}$"
					,"review"		: "^.*$"
				}
			;

			c.textFields.each(function(){
				var textField = $(this);
				var re = new RegExp(regexps[textField.attr("name")]);
				var textfield_error = !textField.val().match(re);
				textField.toggleClass("c-textfield_error",textfield_error); 
				if(textfield_error){
					form_error = true;
				}
			})
			
			var slideToggle = form_error ?"slideDown" :"slideUp";
			c.errorMessage.stop()[slideToggle](); //- replacement method
			event.preventDefault();  //- prevent sending data to the server	
	}
	c.checkTextfield = function(event){ //check with img
			var regexps = {
						 "name"			: "^[А-ЯЁа-яёA-Za-z\\-\\.]{2,50}$"
						,"age"			: "^[1-9][0-9]$"
						,"email"		: "^[a-z0-9\\-_\\.]{1,255}@[a-z0-9\\-]{1,64}\\.[a-z]{2,20}$"
						,"review"		: "^.*$"
					}
				;
			var textField = $(this);
			var re = new RegExp(regexps[textField.attr("name")]);
			var textfield_error = !textField.val().match(re);
				if(!textfield_error){
					textField.addClass("ok");
					textField.removeClass("error");
				}
				else{
					textField.addClass("error");
					textField.removeClass("ok");
				}
	} 
	
	//events
	c.liMenu.click(c.subMenu); //menu
	c.btnUp.bind("click", c.scrollUp); //go up
	c.elem.submit(c.check); //check form
	c.textFields.blur(c.checkTextfield); //check with img

	$(window).scroll(function(event){ //scroll
		if($(window).scrollTop() + $(window).height() > 1300){ //relax content 600
			$(".b-content-rx").animate({left: "37.86%"}, 2000); //530px
		}
		if($(window).scrollTop() + $(window).height() > 2000){ //project content
			$(".b-project__first-col").animate({left: "16.43%"}, 2000); //230px
			$(".b-project__second-col").animate({left: "54.29%"}, 2000); //760px
		}
		if($(window).scrollTop() + $(window).height() > 4000){ //contact us
			$(".b-ready__block").fadeIn(2000); 
		}
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100){ //btn 
				c.btnUp.fadeIn(2000); 
		}
		else{
				c.btnUp.hide();
			}
	});

	$(document).ready(function(){
		$(".b-slider__content").fadeIn(2000); //slider content

		setInterval(function(){ //clock
			var d1 = new Date("May 31, 2017 23:59:59");
			var d2 = new Date();
			// var alldays = parseInt((d1-d2)/(1000*60*60*24));
			// var months 	= d1.getMonth()-d2.getMonth(); if in this year
			var months 	= parseInt((d1-d2)/(1000*60*60*24*30));
			var days 	= d1.getDate()-d2.getDate();
			var hours	= d1.getHours()-d2.getHours();
			var minutes = d1.getMinutes()-d2.getMinutes();
			var seconds = d1.getSeconds()-d2.getSeconds();
			
			$(".b-clock__month").html(months);
			$(".b-clock__day").html(days);
			$(".b-clock__hours").html(hours);
			$(".b-clock__min").html(minutes);
			$(".b-clock__sec").html(seconds);
		}, 1000);

	});
}

Container.prototype = new Component();