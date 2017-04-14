$(document).ready(function(){
	// Smooth scroll
	//-----------------------------------------------------------------
	$("a[href*=#]:not([href=#])").click(function(){
		var target = $(this.hash);
		if($(window).width() > 767){
			$('html, body').animate({
				scrollTop: target.offset().top-99
			}, 1000);
		}
		if($(window).width() < 768){
			$('html, body').animate({
				scrollTop: target.offset().top-74
			}, 1000);
		}
	});

	// Scroll Spy (bootstrap for higligtning navbar by length)
	if($(".scrollspy").length>0) {
			$('body').scrollspy({ 
				target: '.scrollspy',
				offset: 100
			});
		}

	// Slider
	//-------------------------------------------------------------
	var currentWidth = 0;

	// slider content fade In
	$(".b-slider__content").fadeIn(2000); 

	// show slide
	function showSlide(iShift){ 
		// 1400*2 = 2800 - next image
		currentWidth += $(".b-slider__slide").width()*iShift; 
		if(currentWidth >= $(".b-slider__slide").length*$(".b-slider__slide").width()){
			$(".b-slider__slide").eq(0).clone().appendTo($(".b-slider__slides"));
			$(".b-slider__slide").eq(1).clone().appendTo($(".b-slider__slides"));
		}
		/* stop - prevent bug of animation */
		$(".b-slider__slides").stop().animate({scrollLeft: currentWidth}, "slow"); 
	}

	// pause
	var pause = false; 
	$("[class^='b-slider']").click(function(){
		pause = !pause;
	});

	// set interval for showing slide
	setInterval(function(){
		if(!pause){
			showSlide(1);
		};
	}, 2000);

	// Scroll & Animation
	//----------------------------------------------------------------
	$(window).scroll(function(){
		var documentScrollTop = $(document).scrollTop();
		// relax block
		if(documentScrollTop+$(window).innerHeight() > $(".b-relax").offset().top){
			$(".b-content-rx").animate({left: "40%"}, 2000); 
		}
		 // project block
		if(documentScrollTop+$(window).innerHeight() > $(".b-project__colomns").offset().top){
			if($(window).width() > 767){
				$(".b-project__first-col").animate({left: "5%"}, 2000); 
				$(".b-project__second-col").animate({left: "52%"}, 2000); 
			}
		}
		// contact us block
		if(documentScrollTop+$(window).innerHeight() > $(".b-ready").offset().top){ 
			$(".b-ready__block").fadeTo(2000, 1); 
		}
		//Button to top
		if(documentScrollTop + $(window).height() > $(document).height() - 50){
			$(".b-footer__btn").stop().fadeTo(1500, 1); 
		}
		else{
				$(".b-footer__btn").hide();
			}
	});

	// Button to top
	//----------------------------------------------------------------
	$(".b-footer__btn").click(function(){ 
		event.preventDefault();
		$("html,body").stop().animate({scrollTop:0},"slow");
	});

	// Check form
	//----------------------------
	regexps = {
				 "name"			: "^[А-ЯЁа-яёA-Za-z\\-\\.]{2,50}$"
				,"age"			: "^[1-9][0-9]$"
				,"email"		: "^[a-z0-9\\-_\\.]{1,255}@[a-z0-9\\-]{1,64}\\.[a-z]{2,20}$"
				,"review"		: "^.*$"
			};

	$(this).submit(function(){
		// check textfield
		var form_error = false;
		$(".b-textfield").each(function(){
			textField = $(this);
			re = new RegExp(regexps[textField.attr("name")]);
			textfield_error = !textField.val().match(re);
			textField.toggleClass("c-textfield_error", textfield_error); 
			if(textfield_error){
				form_error = true;
			}
		});
		
		// show and hide error message
		var slideToggle = form_error ?"slideDown" :"slideUp";
		// replacement method
		$(".b-form__message_error").stop()[slideToggle](); 
		// prevent sending data to the server
		event.preventDefault();  	
	}); 

	// Check form with img
	//----------------------------------------------------------------
	$(".b-textfield").blur(function(){
		var textField = $(this),
		re = new RegExp(regexps[textField.attr("name")]),
		textfield_error = !textField.val().match(re);
		if(!textfield_error){
			textField.addClass("ok");
			textField.removeClass("error");
		}
		else{
			textField.addClass("error");
			textField.removeClass("ok");
		}
	}); 

	// Clock
	// ------------------------------------------------------------
	setInterval(function(){ 
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
