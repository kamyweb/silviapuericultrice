(function($) {

	"use strict";


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50 );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'swing', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// TYPEWRITE
	var TxtType = function(el, toRotate, period) {
	  this.toRotate = toRotate;
	  this.el = el;
	  this.loopNum = 0;
	  this.period = parseInt(period, 10) || 2000;
	  this.txt = '';
	  this.tick();
	  this.isDeleting = false;
	};

	TxtType.prototype.tick = function() {
	  var i = this.loopNum % this.toRotate.length;
	  var fullTxt = this.toRotate[i];

	  if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	  } else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	  }

	  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	  var that = this;
	  var delta = 200 - Math.random() * 100;

	  if (this.isDeleting) { delta /= 2; }

	  if (!this.isDeleting && this.txt === fullTxt) {
	  delta = this.period;
	  this.isDeleting = true;
	  } else if (this.isDeleting && this.txt === '') {
	  this.isDeleting = false;
	  this.loopNum++;
	  delta = 500;
	  }

	  setTimeout(function() {
	  that.tick();
	  }, delta);
	};

	window.onload = function() {
	  var elements = document.getElementsByClassName('typewrite');
	  for (var i=0; i<elements.length; i++) {
	      var toRotate = elements[i].getAttribute('data-type');
	      var period = elements[i].getAttribute('data-period');
	      if (toRotate) {
	        new TxtType(elements[i], JSON.parse(toRotate), period);
	      }
	  }
	  // INJECT CSS
	  var css = document.createElement("style");
	  css.type = "text/css";
	  css.innerHTML = ".typewrite > .wrap { border-right: 2px solid #000;";
	  document.body.appendChild(css);
	};




})(jQuery);

