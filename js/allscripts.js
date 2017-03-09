/////////////////////////////// PLUGINS

/* Mobile Detect */
var mobile=function(){return{detect:function(){var uagent=navigator.userAgent.toLowerCase();var list=this.mobiles;var ismobile=false;for(var d=0;d<list.length;d+=1)if(uagent.indexOf(list[d])!=-1)ismobile=true;return ismobile},mobiles:["midp","240x320","blackberry","netfront","nokia","panasonic","portalmmm","sharp","sie-","sonyericsson","symbian","windows ce","benq","mda","mot-","opera mini","philips","pocket pc","sagem","samsung","sda","sgh-","vodafone","xda","palm","iphone","ipod","android","ipad"]}}();

/* translate3d */
;(function($) {
	var delay = 0;
	$.fn.translate3d = function(translations, speed, easing, complete) {
		var opt = $.speed(speed, easing, complete);
		opt.easing = opt.easing || 'ease';
		translations = $.extend({x: 0, y: 0, z: 0}, translations);

		return this.each(function() {
			var $this = $(this);

			$this.css({ 
				transitionDuration: opt.duration + 'ms',
				transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
				transform: 'translate3d(' + translations.x + 'px, ' + translations.y + 'px, ' + translations.z + 'px)'
			});

			setTimeout(function() { 
				$this.css({ 
					transitionDuration: '0s', 
					transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)'
				});

				opt.complete();
			}, opt.duration + (delay || 0));
		});
	};
})(jQuery);

(function ($) {
    $.fn.extend({
        minusSimplePopup: function (options) {

            var defaults = {
				customClass: 'custom-popup'
            };

            var options = $.extend(defaults, options);

            return this.each(function(){
                var opt = options,
					ID = $( this ),
					bdy = $('body'),
					uty = { 
						detectEl: function( ID ){ return ID.length > 0 ? true : false; } 
					},
					main = {
						clicklable: true,
						prop: {},
						cls: { ready: 'simple-popup-ready' },
						el: { wrp: '.simple-minus-popup', content: '.popup-default-body', header: '.popup-default-header > span', btn: '[rel="minusPopup"]', closeBtn: '.simple-minus-popup, .simple-minus-popup-vail' },
						template: {
							pp: '<div class="popup-default simple-minus-popup"> <div class="popup-default-wrapper"> <div class="popup-default-inner"><div class="popup-default-header"><span></span> <a href="javascript:void(0);" class="btn-popup-close"><i class="icon-ico_close"></i></a></div><div class="popup-default-body"></div></div></div></div><div class="vail simple-minus-popup-vail"></div>'
						
						},
						getTemplate: function(){
							
						},
						add: function( o ){
								ID.append( this.template.pp );
						},
						pp: function( o ){
							var _t = this, k = o['typ'] || '';
							if( k == 'open' ){ 
								bdy.addClass( _t.cls['ready'] );
								_t.clicklable = false;
							}
							else{	
								bdy.removeClass( _t.cls['ready'] );
								_t.clicklable = true;
								setTimeout(function(){ _t.destroy(); }, 10);
							}
						},
						set: function( e ){
							var  _t 
						},
						destroy: function(){
							var _t = this, wrp = $( _t.el.wrp );
							e = 	wrp.removeClass( _t.prop['cls'] || '' ).find( _t.el.content );
							if( uty.detectEl( $('iframe', e) ) )
								$('iframe', e).removeAttr('src');
							e.html('');
							wrp.find( _t.el.header ).html('');	
							_t.prop = {};
						},
						getObj: function( e ){
							var _t = this;
								_t.prop = { cls: e.attr('data-cls') || opt.customClass };
							return _t.prop;
						},
						addEvent: function(){
							var _t = this;
							
							$( _t.el.btn )
							.bind('click', function( e ){
								e.preventDefault();
								if( _t.clicklable )
									_t.pp({ prop: _t.getObj( $( this ) ), typ: 'open' })
							});
							
							$( _t.el.closeBtn )
							.bind('click', function(){
								_t.pp({ typ: 'close' })
							});
						},
						init: function(){
							var _t = this;
								_t.add({ typ: 'pp' });
								_t.addEvent();
						}					
					};
					
				main.init();
				
            });
        }
    });

})(jQuery);

$('body').minusSimplePopup();

/* gallery */
(function($) {
    $.fn.extend({
        minusGallery: function(options, callback) {
            var defaults = {
				ratioTyp: 1,
				triggerBtn: '[rel="minusGallery"]',
				customClass: ''
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options,
					bdy = $('body'),
					win = $( window ),
					el = $( this ),
					btn = el.find( o.triggerBtn ),
					cls = { loadImg: 'gallery-load-image', ready: 'gallery-ready', animate: 'gallery-animate', closed: 'gallery-closed' },
					items = '',
					currentItems = 0,
					uty = {
						detectEl: function( ID ){ return ID.length > 0 ? true : false; },
						cssClass: function( o, callback ){
							var _t = this, ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
							if( _t.detectEl( ID ) ){
								if( type == 'add' ){
									cls = o['cls'] || ['ready', 'animate'];
									ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
								}else{
									cls = o['cls'] || ['animate', 'ready'];
									ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
								}
							}
						},
						loadImg: function( k, callback ){
							var  _t = this, img = new Image();
							el.addClass( cls['loadImg'] );
							img.onload = function(){
								if( typeof callback !== 'undefined' )
									callback({ typ: 'success', val: this });
								el.removeClass( cls['loadImg'] );	
							};
							img.onerror = function(){  
								if( typeof callback !== 'undefined' )
									callback({ typ: 'error' });
								el.removeClass( cls['loadImg'] );	
							};
							img.src = k;
						}
					},
                    main = {
						scroller: null,
						current: { w: 0, h: 0, r: 0, elem: null },
						maxs: { wt: 0, ht: 0 },
						destroy: function(){ 
							var _t = this;
								_t.current['w'] = 0;
								_t.current['h'] = 0;
								_t.current['r'] = 0;
								_t.current['elem'] = null;
								items = '';
								currentItems = 0;
								
							if( _t.scroller !== null ){ 
								_t.scroller.destroy();
								_t.scroller = null;
							}
						},
						template: {
							gallery: '<div class="minus-gallery '+ o.customClass +'"><div class="minus-gallery-inner"><div class="minus-gallery-header"><a class="gallery-close-btn" href="javascript:void(0);"></a><a rel="next" class="gallery-next-btn gallery-nav-btn" href="javascript:void(0);"><i></i></a><a rel="prev" class="gallery-prev-btn gallery-nav-btn" href="javascript:void(0);"><i></i></a></div><div class="minus-gallery-body"><div class="minus-gallery-body-inner"></div></div><div class="minus-gallery-footer"></div></div></div>'
						},
						adjust: function(){
							var _t = this, ths = _t.current['elem'] || null;
							if( ths !== null ){
								var con = el.find('.minus-gallery'), wt = con.width(), ht = con.height(), ratio = _t.current['r'], wR = 0, hR = 0, k = '';
								
								if( o.ratioTyp == 0 ){
									if( wt / ht >= ratio ){
										wR = ht * ratio;
										hR = ht;
									}else{
										wR = wt;
										hR = wt / ratio;
									}
								}else{
									if ( wt / ht >= ratio ){
										wR = wt;
										hR = wt / ratio;
									}else{
										wR = ht * ratio;
										hR = ht;
									}
								}
								
								k = Math.round( ( wt - wR ) * .5 ) + 'px,' + Math.round( ( ht - hR ) * .5 ) + 'px';
	
								$( ths )
								.parent()
								.width( Math.round( wR ) )
								.height( Math.round( hR ) )
								.css({ '-webkit-transform': 'translate('+ k +')', '-ms-transform': 'translate('+ k +')', 'transform': 'translate('+ k +')' });	
								
								_t.maxs = { wt: Math.abs( wt - wR ), ht: Math.abs( ht - hR ) };
								
								if( _t.scroller !== null ) 
									setTimeout(function(){ _t.scroller.refresh(); }, 0);				
							}
						},
						animate: function( k ){
							var _t = this;
							if( k == 'opened' )
								uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':[cls['ready'], cls['animate']] });
							else
								uty.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':[cls['animate'], cls['ready']] });		
						},
						set: function( k ){						
							var _t = this;
							if( k !== '' )
								uty.loadImg(k, function( d ){
									if( d['typ'] == 'success' ){
										var con = el.find('.minus-gallery-body-inner'), ths = d['val'];
										con.html( ths );
										_t.current['elem'] = ths;
										_t.current['w'] = ths.width;
										_t.current['h'] = ths.height;
										_t.current['r'] = ( _t.current['w'] / _t.current['h'] ).toFixed( 2 );
										_t.adjust();
										_t.animate('opened');
										setTimeout(function(){ _t.initPlugins(); }, 10);
									}
								});
						},
						addEvent: function(){
							var _t = this;
							
							if( uty.detectEl( btn ) )
								btn.bind('click', function( e ){
									e.preventDefault();
									var ths = $( this ), uri = ths.attr('rel') || ths.attr('href') || '';
									if( uri !== '' )
										_t.set( uri );	
								});
							
							el.find('.gallery-close-btn').bind('click', function(){
								bdy.addClass( cls['closed'] );
								setTimeout(function(){
									bdy.removeClass( cls['closed'] ).removeClass( cls['ready'] ).removeClass( cls['animate'] );
									_t.destroy();
								}, 333);								
							});
							
							el.find('.gallery-nav-btn').bind('click', function(){
								var ths = $( this ), rel = ths.attr('rel') || '', le = items.length - 1;
								if( rel !== '' ){
									if( rel == 'next' ) currentItems++;
									if( rel == 'prev' ) currentItems--;
									if( currentItems < 0 ) currentItems = le;
									if( currentItems > le ) currentItems = 0;
									_t.set( items[ currentItems ] );
								}
							});
							
							if( !isMobile )
								el
								.find('.minus-gallery')
								.bind('mousemove', function( e ){
									var ths = $( this ), x = e.pageX - ths.offset().left, y = e.pageY - ths.offset().top;
									
									if( _t.maxs.wt > 0 ) 
										x = x / ths.width() * _t.maxs.wt;
									else 
										x = 0;
									
									if( _t.maxs.ht > 0 ) 
										y = y / ths.height() * _t.maxs.ht;
									else 
										y = 0;
		
									el
									.find('.minus-gallery-body-inner')
									.translate3d({ x: -x, y: -y }, 0);
								});
							
							win.bind('resize', function(){ _t.adjust(); });	
						},
						add: function(){
							el.append( this.template.gallery );
						},
						initPlugins: function(){
							var _t = this;
							if( isMobile ){
								if( _t.scroller !== null ) 
									_t.scroller.refresh();
								else		
									_t.scroller = new IScroll(el.find('.minus-gallery-body').get( 0 ), {
										disablePointer: true,
										zoom: true,
										scrollX: true,
										scrollY: true,
										mouseWheel: true,
										wheelAction: isMobile ? 'zoom' : ''
									});
							}
						},
						init: function(){
							var _t = this;
								_t.add();
								_t.addEvent();
						}
					};
				main.init();    
				
				///////// PUBLIC FUNC
				this.loadImg = function( o ){
					items = o['items'] || '';
					var m = $('.minus-gallery');
						m.removeClass('no-navigation');
					if( items != '' )
						if( items.length <= 1 )
							m.addClass('no-navigation'); 
						
					if( items != '' )
						main.set( items[ 0 ] );
					else	
						main.set( o['uri'] );  
				};            
            })
        }
    })
})(jQuery, window);

/* slider */
;(function($){
	$.fn.extend({
		minusSlider : function(options){
			var defaults = {	};
			
			var option = $.extend( defaults, options );
			
			return this.each(function( e ){
				var o = option,
					ID = $( this ),
					main = {
						start: 0,
						current: null,
						auto: false,
						totalItems: 0,
						cls: { activeVideo: 'video-active', isPause: 'isPause', isPlay: 'isPlay', noControls: 'no-controls', active: 'active', selected: 'selected', noSwiper: 'no-swiper' },
						typ: {
							main: {
								prop: {
									slidesPerView: 1, 
									preloadImages: false, 
									lazyLoading: true, 
									loop: true, 
									paginationClickable: true, 
									nextButton: '.swiper-button-next', 
									prevButton: '.swiper-button-prev', 
									pagination: '.swiper-pagination', 
                                    onTouchStart: function(){
										main.autoControl.clear();
									},
									onTouchEnd: function(){
										main.autoControl.init();
									},
									onSlideChangeStart: function( s ){
										main.disabledVideo();
										main.autoControl.clear();
									},	
									onSlideChangeEnd: function( s ){
										main.autoControl.init();	
										main.detectPosition.init();
										main.activeIndex();
									},
									onInit: function(){
										main.detectPosition.init();
										main.activeIndex();
									}			
								}
							},
							widgetQuad: {
								prop: {
									slidesPerView: 4,
									slidesPerGroup: 4,
									preloadImages: false, 
									lazyLoading: true, 
									loop: true, 
									paginationClickable: true, 
									nextButton: '.swiper-button-next', 
									prevButton: '.swiper-button-prev', 
									pagination: '.swiper-pagination', 
                                    breakpoints: {
										960: {
										  slidesPerView: 2,
										  slidesPerGroup: 2 
										}
									}, 
									onTouchStart: function(){
										main.autoControl.clear();
									},
									onTouchEnd: function(){
										main.autoControl.init();
									},
									onSlideChangeStart: function( s ){
										main.disabledVideo();
										main.autoControl.clear();
									},	
									onSlideChangeEnd: function( s ){
										main.autoControl.init();	
										main.detectPosition.init();
										main.activeIndex();
									},
									onInit: function(){
										main.detectPosition.init();
										main.activeIndex();
									}			
								}
							},
							widgetTrio: {
								prop: {
										slidesPerView: 3,
										slidesPerGroup: 3,
										preloadImages: false, 
										lazyLoading: true, 
										loop: true, 
										paginationClickable: true, 
										nextButton: '.swiper-button-next', 
										prevButton: '.swiper-button-prev', 
										pagination: '.swiper-pagination',
										breakpoints: {
											960: {
											  slidesPerView: 2,
											  slidesPerGroup: 2 
											}
								 		}, 
										onTouchStart: function(){
											main.autoControl.clear();
										},
										onTouchEnd: function(){
											main.autoControl.init();
										},
										onSlideChangeStart: function( s ){
											main.disabledVideo();
											main.autoControl.clear();
										},	
										onSlideChangeEnd: function( s ){
											main.autoControl.init();	
											main.detectPosition.init();
											main.activeIndex();
										},
										onInit: function(){
											main.detectPosition.init();
											main.activeIndex();
										}	
									}
							},
							quickReview: {
								prop: {
									
									slidesPerView: 1, 
									preloadImages: false, 
									lazyLoading: true, 
									//loop: true, 
									paginationClickable: true, 
									nextButton: '.swiper-button-next', 
									prevButton: '.swiper-button-prev', 
									pagination: '.swiper-pagination', 
                                    onTouchStart: function(){
										main.autoControl.clear();
									},
									onTouchEnd: function(){
										main.autoControl.init();
									},
									onSlideChangeStart: function( s ){
										main.disabledVideo();
										main.autoControl.clear();
									},	
									onSlideChangeEnd: function( s ){
										main.autoControl.init();	
										main.detectPosition.init();
										main.activeIndex();
									},
									onInit: function(){
										main.detectPosition.init();
										main.activeIndex();
									}	
									
								}
							}
						},
						addOrder: function( e ){ e.each(function( i, k ){ $( this ).attr('data-order', i); }); },
						lazyImg: function( k ){
							 
							 if( k.hasClass('lazy-load') )
								 k
								 .css({'opacity': 0})
								 .attr('src', k.attr('data-original') || '')
								 .one('load', function(){ 																			 					
									$( this )
									.addClass('load-image')
									.removeClass('lazy-load')
									.stop()
									.animate({ 'opacity': 1 }, 111);
								 });	
							else
								k
								.removeClass('lazy-back-load')
								.addClass('load-image')
								.css('background-image', 'url("' + ( k.attr('data-original') || '' ) + '")');		
						},
						lazy: function( k ){
							var _t = this, img = $('.lazy-load, .lazy-back-load', k);	
							
							if( uty.detectEl( img ) )
								img
								.each(function(){ _t.lazyImg( $( this ) ); });
						},
						disabledVideo: function(){
							var _t = this, e = $('.swiper-video', ID);
							
							if( uty.detectEl( e ) )
								e
								.each(function(){
									var ths = $( this );
									if( uty.detectEl( $('.youtubePlayer', ths) ) && ths.parents('li').eq( 0 ).hasClass( _t.cls['activeVideo'] ) ){
										ths.off('playerState');
										ths.get( 0 ).stopVideo();
										ths.parents('li').eq( 0 ).removeClass( _t.cls['isPlay'] ).removeClass( _t.cls['isPause'] ).removeClass( _t.cls['activeVideo'] );
									}
								});
						},
						activeVideo: function(){
							var _t = this, el = ID.find('.swiper-slide-active'), s = $('.youtubePlayer', el);
							if( uty.detectEl( s ) ){
								$('.swiper-video', el)
								.off('playerState')
								.on('playerState', function( events, k ){
									if( k == 'ended' && _t.current !== null )
										_t.current.slideNext();
									else if( k == 'playing' || k == 'buffering' ){ 
										_t.autoControl.clear();
										el.addClass( _t.cls['isPlay'] ).removeClass( _t.cls['isPause'] );
									}else if( k == 'paused' )
										el.removeClass( _t.cls['isPlay'] ).addClass( _t.cls['isPause'] );
								});
							}
						},
						autoControl: {
							stm: null,
							delay: ID.attr('data-duration') || 2500,
							clear: function(){
								var _t = this;
								if( _t.stm != null )
									clearTimeout( _t.stm );
							},
							start: function(){
								var _t = this;
								
								if( main.auto ){
									_t.clear();
									_t.stm = setTimeout(function(){
										if( main.current !== null )
											main.current.slideNext();
									}, _t.delay);	
								}
							},
							init: function(){
								this.start();
							}
						},
						addEvents: function(){
							var _t = this, videoBtn = $('.btn-video-play', ID);
							
							if( uty.detectEl( videoBtn ) ){
								videoBtn.bind('click', function(){
									var ths = $( this ), prt = ths.parents('li'), s = ths.siblings('.swiper-video'), vid = ths.attr('data-video') || '';
									if( vid != '' ){
										prt.addClass( _t.cls['activeVideo'] );
										if( !uty.detectEl( $('.youtubePlayer', s) ) ){
											s.minusPlayer({ videoId: vid, controls: 0, autoplay: isMobile ? 0 : 1, customClass: 'yt-video-player', orientation: 'vertical' });
											prt.addClass( _t.cls['isPlay'] ).removeClass( _t.cls['isPause'] );
										}else{
											var k = s.get( 0 ); 
											if( k.state() ){
												k.pauseVideo();
												prt.removeClass( _t.cls['isPlay'] ).addClass( _t.cls['isPause'] );
											}
											else{
												k.playVideo();
												prt.addClass( _t.cls['isPlay'] ).removeClass( _t.cls['isPause'] );
											}
										}
										_t.activeVideo();
										_t.autoControl.clear();
									}
									
								});
							}
						},
						activeIndex: function(){
							var _t = this, act = ID.find('.swiper-slide-active'), ind = parseFloat( act.attr('data-order') || 0 ), e = ID.find('.headline-holder');
							
							/* lazy */
							setTimeout(function(){ _t.lazy( ID.find('.swiper-wrapper [data-order="'+ ind +'"], .swiper-slide.active') );	}, 225);
							
							/* thumb */
							_t.thumbFocused();
							
							/* headline */
							if( uty.detectEl( e ) )
								$('[data-order="'+ ind +'"]', e).addClass( _t.cls['active'] ).siblings('li').removeClass( _t.cls['active'] );
							
							/* pager */
							e = ID.find('.sld-pager');	
							if( uty.detectEl( e ) ){
								e.find('strong').text( ind + 1 );
								e.find('span').text( '/ ' + _t.totalItems );
							}
							
							/* custom dropdown */
							e = ID.find('.ems-custom-dropdown .dropdown-value'); 
							if( uty.detectEl( e ) ){
								e.html( act.attr('data-title') || '' );
								e = ID.find('.ems-custom-dropdown li[data-order="'+ ind +'"]');
								if( uty.detectEl( e ) )
									e.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
							}
						},
						thumbFocused: function(){
							var _t = this, drp = $('.thumb-pager', ID), k = $('.slide-wrp li.swiper-slide-active', ID).attr('data-order') || 0, cls = { opened: 'open', selected: 'selected' };
							
							if( uty.detectEl( drp ) ){						
								drp.find('[data-order="'+ k +'"]').addClass( cls['selected'] ).siblings().removeClass( cls['selected'] );
								if( _t.thumbPager != null ){								
									k = k - 1;
									if( k <= 0 ) k = 0;
									_t.thumbPager.slideTo( k, 333 );
								}
							}
						},
						thumbPager: null,
						customThumb: function(){
							if( !uty.detectEl( $('.thumb-pager', ID) ) ) 	return false;
							var _t = this, drp = $('.thumb-pager', ID), s = $('ul.slide-wrp > li', ID), htm = '', cls = { opened: 'open', selected: 'selected' };
							s.each(function( i, k ){
								var ths = $( this ), tt = ths.attr('data-thumb') || '', k = i == 0 ? cls['selected'] : '', sty = '', ico = '';
								if( ths.hasClass('prd-video') ){
									k += ' prd-video';
									sty = 'style="background-image:url('+ tt +');"'; 
								}
								if( tt != '' )
									htm += '<li '+ sty +' class="swiper-slide '+ k +'" data-order="'+ i +'"><a href="javascript:void(0);"><img src="'+ tt +'" border="0"/></a></li>';
							});
							drp.find('ul').html( htm );
							
							var le = $('li', drp).length;
							
							drp.addClass('item-' + le);
							
							if( le > 4 ){ 
								drp.addClass('pager-active');
								_t.thumbPager = new Swiper(drp.find('.swiper-inner'), {
									direction: 'vertical',
									slidesPerView: 'auto',
									slidesPerGroup: 1,
									paginationClickable: false,
									spaceBetween: 5,
									mousewheelControl: true,
									wrapperClass: 'thumb-wrp', 
									breakpoints: {
										960: {
										  direction: 'horizontal',
										  slidesPerView: 3, 
										}
								 	}	
								});
							}
															
							$('ul li', drp).bind('click', function(){
								var ths = $( this ), k = ths.attr('data-order') || 0;
								_t.current.slideTo( k, 333 );
								ths.addClass( cls['selected'] ).siblings().removeClass( cls['selected'] );
							});			
							
						},
						detectPosition: {
							get: function( k ){
								var b = false,
									padding = 50,
									con = ID.find('.swiper-inner'),
									o1 = { x: con.offset().left, y: con.offset().top, width: con.width() - padding, height: con.height() },
									o2 = { x: k.offset().left, y: k.offset().top, width: k.width(), height: k.height() };  
								if( o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y )
									b = true;       
								
								return b;
							},
							init: function(){
								var _t = this, e = $('.swiper-inner .swiper-wrapper > li', ID);
								if( uty.detectEl( e ) )
									setTimeout(function(){
										e
										.removeClass( main.cls['active'] )
										.each(function(){
											var ths = $( this );
											if( _t.get( ths ) )
												ths.addClass( main.cls['active'] );
										});
									}, 222);
							}
						},
						customLargeBtn: function(){
							var _t = this;
							
							ID
							.find('.swiper-slide a')
							.bind('click', function( e ){ 
								e.preventDefault(); 
								var ths = $( this ), k = ths.attr('data-large') || '';
								if( k != '' ){
									var arr = [];
										arr.push( k );	
									ths.parent().siblings().each(function(index, element) {
										var ths = $( this ), hrf = ths.find('a').attr('data-large') || ''
                                        if( hrf !== '' )
											arr.push( hrf )
                                    });	
									bdy.get( 0 ).loadImg( { uri: k, items: arr } );
								}
							});
						},
						customDropDown: function(){
							if( !uty.detectEl( $('.ems-custom-dropdown', ID) ) ) 	return false;
							var _t = this, drp = $('.ems-custom-dropdown', ID), s = $('.swiper-inner > ul > li', ID), htm = '', cls = { opened: 'open', selected: 'selected' };
							s.each(function( i, k ){
								var ths = $( this ), tt = ths.attr('data-title') || '';
								if( tt != '' )
									htm += '<li class="'+ ( i == 0 ? cls['selected'] : '' ) +'" data-order="'+ i +'"><a href="javascript:void(0);">'+ tt +'</a></li>';
							});
							drp.find('.ems-sub').html( htm );
							
							$('.ems-custom-dropdown-header a', drp).bind('click', function(){
								var ths = $( this );
								if( drp.hasClass( cls['opened'] ) ) 
									$('.ems-custom-dropdown').removeClass( cls['opened'] );
								else{
									$('.ems-custom-dropdown').removeClass( cls['opened'] );
									drp.addClass( cls['opened'] );
								}	
							});
							
							$('.ems-sub li', drp).bind('click', function(){
								var ths = $( this ), k = parseFloat( ths.attr('data-order') || 0 );
								$('.ems-custom-dropdown').removeClass( cls['opened'] );
								if( main.current != null )
									main.current.slideTo( k + 1 );
								
							});
							
						},
						addControls: function(){
							if( !uty.detectEl( ID.find('.swiper-button-next') ) )
								ID.append('<div class="swiper-direction"><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>'); 	
							
							if( !uty.detectEl( ID.find('.swiper-pagination') ) )
								ID.append('<div class="swiper-pagination"></div>');	
						},
						set: function(){
							var _t = this, typ = 'main', duration = ID.attr('data-duration') || '', s = $('.swiper-wrapper', ID), items = $('> li', s);
								_t.totalItems = items.length;
							
							ID.addClass('total-item-' + _t.totalItems);
							
							if( ID.hasClass('widgetQuad-swiper') ) typ = 'widgetQuad';
							else if( ID.hasClass('widgetTrio-swiper') ) typ = 'widgetTrio';
							else if( ID.hasClass('quickReview-swiper') ) typ = 'quickReview';
							
							if( _t.totalItems > 1 ){
								_t.addOrder( items );
								_t.customDropDown();
								_t.addControls( ID.find('.swiper-inner') || ID );
								_t.current = new Swiper(ID, _t.typ[ typ ]['prop'] || {});	
								_t.customThumb();
							
								if( duration !== '' ){
									_t.auto = true;
									_t.autoControl.init();
								}
							}else{
								ID.addClass( _t.cls['noSwiper'] );
								_t.lazy( ID );
							}
						},						
						init: function(){
							var _t = this;
								_t.set(); 
								_t.addEvents();
								
						}
					};
					main.init();
					
					this.adjust = function(){
						main.detectPosition.init(); 
						if( main.current != null )
							main.current.onResize();
						
						main.activeIndex();	
					};
					
			});
		}
	});
})(jQuery);


/*
			
	Input Styler v2.2.7 www.minus99.com - 2013
			
*/

(function($){
	$.fn.extend({
		iStyler : function(options){
			var defaults = {
					wrapper: false,
					customClass: ''
				};
			
			var option = $.extend(defaults, options);
			
			return this.each(function(e){
				var opt = option,
					obj = $(this),
					tag = obj.prop("tagName").toLowerCase(),
					sClass = '',
					name, check;
				
				if(tag == "select"){
					var selText = $("option:selected", obj).text();
					
					if(!obj.hasClass("sSelect")) 
						if(!opt.wrapper)
							obj.css({opacity:0, "-webkit-appearance":"none"}).addClass("sSelect").before('<div class="sStylerWrp"><span class="sStyleHolder"><span class="sStyler">'+selText+'</span></span></div>');
						else
							obj.css({opacity:0, "-webkit-appearance":"none"}).addClass("sSelect").wrap('<span class="sStylerMainWrp '+ opt.customClass +' sStylerWrp_select"></span>').before('<div class="sStylerWrp"><span class="sStyleHolder"><span class="sStyler">'+selText+'</span></span></div>');
					
					obj.change(function(){
						selText = $('option:selected', obj).text();
						obj.prev(".sStylerWrp").children(".sStyleHolder").children(".sStyler").text(selText);
					});
					
				}else if(tag == "input" && obj.attr("type") == "checkbox"){
					
					if(!obj.hasClass("sCheckbox")){
						
						sClass = (obj.is(":checked")) ? sClass+' checked' : '';
						
						if(!opt.wrapper)
							obj.addClass("sCheckbox").before('<span class="cStyler'+sClass+'"></span>');
						else
							obj.addClass("sCheckbox").wrap('<span class="sStylerMainWrp '+ opt.customClass +' sStylerWrp_checkbox"></span>').before('<span class="cStyler'+sClass+'"></span>');

					}
					
					obj.prev("span.cStyler").unbind('click').click(function(){

						check = !obj.is(":checked");

						if(obj.onclick != undefined){
							obj.attr("checked", check).click();
							obj.attr("checked", check);
						}else{
							obj.click();
						}
						
						if(check){
							$(this).addClass("checked");
						}else{
							$(this).removeClass("checked");
						}
					});
					
					obj.change(function(){
						if(obj.is(":checked"))
							obj.prev("span.cStyler").addClass("checked");
						else
							obj.prev("span.cStyler").removeClass("checked");
					});
										
				}else if(tag == "input" && obj.attr("type") == "radio"){		
					
					if(!obj.hasClass("sRadio")){
						name = obj.attr("name");
						var nameStr;
						
						nameStr = (name == undefined) ? '' : ' name="'+name+'"';
						
						if(obj.is(":checked")) sClass = sClass+' checked'; else sClass = '';
						
						if(!opt.wrapper)
							obj.addClass("sRadio").before('<span'+nameStr+' class="rStyler'+sClass+'"></span>');
						else
							obj.addClass("sRadio").wrap('<span class="sStylerMainWrp '+ opt.customClass +' sStylerWrp_radio"></span>').before('<span'+nameStr+' class="rStyler'+sClass+'"></span>');
							
					}
					
					obj.prev("span.rStyler").unbind('click').click(function(){
						if(!obj.is(":checked")){
							check = !obj.is(":checked");

							if(obj.onclick != undefined){
								obj.attr("checked", check).click();
								obj.attr("checked", check);
							}else{
								obj.click();
							}
						
							if(name != undefined)
								$('span.rStyler[name="'+name+'"]').removeClass("checked");
								
							$(this).addClass("checked");
						}
					});
					
					obj.change(function(){
						if(obj.is(":checked")){
							if(name != undefined) $('span.rStyler[name="'+name+'"]').removeClass("checked");
							obj.prev("span.rStyler").addClass("checked");
						}
					});
	
				}
				
			});
		}
	});
})(jQuery);

;(function($) {
    $.fn.extend({
        minusCustomDropDown: function(options, callback) {
            var defaults = {};
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options,
					el = $( this ),
					clickedElem = el.find('> span'),
					items = el.find('> ul li'),
					uty = {
						detectEl: function( ID ){ return ID.length > 0 ? true : false; }
					},
                    main = {
						drp: '.dropdown',
						cls: { opened: 'opened', selected: 'selected' },
						addEvent: function(){
							var _t = this, drp = $( _t.drp ), opCls = _t['cls']['opened'], sCls = _t['cls']['selected'];
							
							clickedElem
							.unbind('click')
							.bind('click', function(){
								var ths = $( this ).parent();
								if( ths.hasClass( opCls ) ) 
									drp.removeClass( opCls );
								else{
									drp.removeClass( opCls );
									ths.addClass( opCls );
								}
							});
							
							items
							.unbind('click')
							.bind('click', function(){
								var ths = $( this );
									ths.addClass( sCls ).siblings('li').removeClass( sCls ).parents('.dropdown').find('> span').html( ths.text() + '<i class="icon-ico_arrow1"></i>' );
								drp.removeClass( opCls );
							});
							
							var e = el.find('> ul li.selected');
							if( uty.detectEl( e ) )
								e.click();
							else
								items.eq( 0 ).click();
						},
						init: function(){
							var _t = this;
							if( uty.detectEl( clickedElem ) && uty.detectEl( items ) )
								_t.addEvent();
						}
					};
				main.init();                
            })
        }
    })
})(jQuery, window);

;(function($) {
    $.fn.extend({
        minusDropDown: function(options, callback) {
            var defaults = {
				closeElem: '',
                type: "hover",
                customClass: "hover",
				bdyCls: "",
				bdyCls2: "",
                delay: 555,
                openedDelay: 0,
                className: "",
                clicked: "",
                openedControl: "",
                hideDropDown: [],
                attachmentDiv: null,
                isVisible: null,
				overlay: null,
				parents: null,
				toggle: true,
				bdyClicked: true 
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                
				var holder = $(this),
                    o = options,
                    attachmentDiv = o.attachmentDiv != null ? $(o.attachmentDiv) : null,
                    stm = null,
                    bdy = $('body');
				
				if( holder.hasClass('activePlug') ) return false;
									
                function init() {
                    if (o.type == "hover") {
                        holder.mouseenter(events.mouseenter).mouseleave(events.mouseleave);
                        if (attachmentDiv != null) attachmentDiv.mouseenter(events.mouseenter).mouseleave(events.mouseleave)
						
						$("body, html").bind('click touchstart', events.bodyClicked);
                    } 
					else if (o.type == "click"){ 
						$(o.clicked, holder).bind('click', events.clicked);
						if( o.bdyClicked )
							$("body, html").bind('click touchstart', events.bodyClicked);
					}else if (o.type == "hoverClick"){ 
						holder.mouseenter(events.onMouseenter).mouseleave(events.onMouseleave);
						$(o.clicked, holder).bind('click', events.onClicked);
						if( o.bdyClicked )
							$("body, html").bind('click touchstart', events.bodyClicked);
					}
                 }
                var animate = {
                    opened: function() {
                        controls();
                        if (attachmentDiv != null) attachmentDiv.addClass(o.customClass);
                        holder.addClass(o.customClass);
						if( o.parents != null ) holder.parents( o.parents ).addClass(o.customClass);
						overlayControls('opened');
						if (callback != undefined) callback("opened")
                    },
                    closed: function() {
                        if (attachmentDiv != null) attachmentDiv.removeClass(o.customClass);
                        holder.removeClass(o.customClass);
						if( o.parents != null ) holder.parents( o.parents ).removeClass(o.customClass);
						overlayControls('closed');
						if (callback != undefined) callback("closed");
						bdy.removeClass(o.bdyCls2);
                    }
                };
				
				function closeElem(){
					if( o.closeElem != '' )
						$( o.closeElem ).each(function(){
							var ths = $( this ).get( 0 );
							if( typeof ths.closed !== 'undefined' )	
                            	ths.closed();
                        });
				}
                var events = {
					
					onMouseenter: function() {
                        if (visibleControls()) return false;
                        if (stm != null) clearTimeout(stm);
                        if (o.openedControl != "") {
                            var ID = o.openedControl;
                            if (ID.html() == "") return false
                        }
                        stm = setTimeout(function() {
							closeElem();
                            overlayControls('opened');
                        }, o.openedDelay)
                    },
                    onMouseleave: function() {
                        if (visibleControls()) return false;
                        if (stm != null) clearTimeout(stm);
                        stm = setTimeout(function() {
							if (!holder.hasClass(o.customClass))
								overlayControls('closed');
							
                        }, o.delay)
                    },
					onClicked: function() {
						animate.opened();
						bdy.addClass( o.bdyCls2 );
                    },
                    mouseenter: function() {
                        if (visibleControls()) return false;
                        if (stm != null) clearTimeout(stm);
                        if (o.openedControl != "") {
                            var ID = o.openedControl;
                            if (ID.html() == "") return false
                        }
                        stm = setTimeout(function() {
                            animate.opened()
                        }, o.openedDelay)
                    },
                    mouseleave: function() {
                        if (visibleControls()) return false;
                        if (stm != null) clearTimeout(stm);
                        stm = setTimeout(function() {
                            animate.closed()
                        }, o.delay)
                    },
                    clicked: function() {
                        if( o.toggle ){
							if (holder.hasClass(o.customClass)) animate.closed();
                     	   	else animate.opened()
						}else
							animate.opened()
                    },
                    bodyClicked: function( e ){
						if( !holder.is( e.target ) && holder.has( e.target ).length === 0 )
							animate.closed();
                    }
                };
				
				function overlayControls( k ){
					if( o.overlay != null ){
						if( k == 'opened' ) bdy.addClass( o.bdyCls );
						else bdy.removeClass( o.bdyCls );
					}
				}
				
                function visibleControls() {
                    if (o.isVisible != null)
                        if ($(o.isVisible).is(":visible")) return true
                }

                function controls() {
                    if (o.hideDropDown.length > 0)

                        for (var i = 0; i < o.hideDropDown.length; ++i)
                            if (o.hideDropDown[i].length > 0) o.hideDropDown[i][0].closed()
                }
							
                this.opened =
                    function() {
                        animate.opened()
                    };
                this.closed = function() {
                    if (stm != null) clearTimeout(stm);
                    animate.closed()
                };
                this.dispose = function() {
                    if (o.type == "hover") holder.unbind("mouseenter").unbind("mouseleave");
                    else $(o.clicked, holder).unbind("click")
                };
                this.live = function() {
                    if (o.type == "hover") holder.mouseenter(events.mouseenter).mouseleave(events.mouseleave);
                    else $(o.clicked, holder).click(events.clicked)
                };
				
                init();
            })
        }
    })
})(jQuery, window);

;(function($) {
    $.fn.extend({
        minusTabMenu: function( options, callback ){
            var defaults = {
				speed: 222,
				easing: 'easeInOutExpo',
				begin: 0,
				dropdown: false,
				offset: -60,
				ajx: { target: '.emosInfinite', typ: 'append' }
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
				
                var opt = options, 
					el = $( this ),
					wrp = el.find('> .ems-tab-inner'),
					main = {
						nav: wrp.find('> .navigation-js'),
						con: wrp.find('> .content-js'),
						cls: { selected: 'selected', ajx: 'ajx-loading', loaded: 'ajx-loaded' },
						detectEl: function( ID ){ return ID.length > 0 ? true : false; },
						clicklable: true,
						pageScroll: function( k, callback ){
							var _t = this;
							$('html, body').stop().animate({ scrollTop: k }, opt['speed'] , opt['easing'], function(){ 
								if( typeof callback !== 'undefined' )
									callback();  
							});
						},
						getNavigationTemplate: function(){
							var _t = this, htm = '';
							$('> li', _t.con).each(function(){
								var ths = $( this ), rel = ths.attr('rel') || '', e = ths.find('> a');
								htm += '<li rel="'+ rel +'"><a href="javascript:void(0);">'+ e.html() +'</a></li>';
							});
							return htm;	
						},
						setNavigation: function(){
							var _t = this;
							if( _t.detectEl( _t.nav ) )
								if( !_t.detectEl( $('li', _t.nav) ) )
									_t.nav.html( _t.getNavigationTemplate() );
						},
						getUri: function( o ){
							var _t = this, ID = o['ID'], uri = uty.cleanText( o['uri'] || '' ), code = uty.cleanText( o['code'] || '' ), cat = uty.cleanText( o['cat'] || '' );
							return uri.replace(/{{lang}}/g, lang).replace(/{{code}}/g, code).replace(/{{kat}}/g, cat);
						},
						loading: function( k ){
							var _t = this;
							if( k == 'add' ) el.addClass( _t.cls['ajx'] );
							else el.removeClass( _t.cls['ajx'] );
						},
						initPlugins: function( ID ){
							setTimeout(function(){
								uty.unVeil( ID );
								management.searchCartButton.init();
							}, 100);
						},
						ajx: function( o ){
							var _t = this, ID = o['ID'], uri = _t.getUri({ uri: o['uri'], code: o['code'] || '', cat: o['cat'] || '' });
							if( uty.detectEl( ID ) && !ID.hasClass( _t.cls['loaded'] ) )	{
								_t.clicklable = false;
								_t.loading('add');
								uty.ajx({ uri: uri }, function( d ){
									if( d['type'] == 'success' ){
										ID.addClass( _t.cls['loaded'] );
										d = uty.clearScriptTag( d['val'] || '' );
										d = $( d ).find( opt.ajx.target ).html() || '';
										if( opt.ajx.target !== '' ) ID = ID.find( opt.ajx.target );
										if( uty.detectEl( ID ) ){
											var typ = opt.ajx['typ'] || '';
											if( typ == 'append' ) ID.append( d );
											else if( typ == 'prepend' ) ID.append( d );
											else if( typ == 'before' ) ID.before( d );
											else if( typ == 'after' ) ID.after( d );
											else ID.html( d );
											
											_t.initPlugins( ID );
										}
									}
									_t.loading('remove');	
									_t.clicklable = true;	
								});
							}	
						},
						addEvent: function(){
							var _t = this;
							$('> li', _t.nav).bind('click', function(){
								var ths = $( this ), rel = ths.attr('rel') || '', ajx = ths.attr('data-ajx') || '', code = ths.attr('data-code') || '', cat = ths.attr('data-cat') || '';
								if( rel != '' && _t.clicklable ){
									$('> li[rel="'+ rel +'"]', _t.con).add( ths ).addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
									setTimeout(function(){ win.resize(); }, 100);
									if( ajx != '' )
										_t.ajx({ ID: $('> li[rel="'+ rel +'"]', _t.con), uri: ajx, code: code, cat: cat });
								}
							})
							.eq( opt.begin )
                            .click();
							
							$('> li > a', _t.con).bind('click', function(){
								var ths = $( this ).parent('li'), rel = ths.attr('rel') || '';
								if( rel != '' ){
									if( ths.hasClass( _t.cls['selected'] ) )
										$('> li[rel="'+ rel +'"]', _t.nav).add( ths ).removeClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
									else{
										$('> li[rel="'+ rel +'"]', _t.nav).add( ths ).addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
										_t.pageScroll( ths.offset().top + opt.offset );	
									}
								}
							});
						},
						add: function(){
							var _t = this;
							if( wrp.find('> .dropdown').length == 0 && _t.nav.length > 0 && opt.dropdown ){
								wrp.prepend('<div class="dropdown mobi-ver"><span></span><ul class="navigation-js">'+ _t.nav.html() +'</ul></div>');
								_t.nav = wrp.find('.navigation-js');
								wrp.find('> .dropdown').minusCustomDropDown();
							}
							
							$('> li', _t.con).each(function(){
                                var ths = $( this );
								if( ths.find('> a').length == 0 ){
									var e = $('> li[rel="'+ ( ths.attr('rel') || '' ) +'"]', _t.nav);
									if( e.length > 0 )
										ths.prepend( e.find('a').clone() );
								}
                            });
						},
						init: function(){
							var _t = this;
							if( _t.detectEl( _t.con ) ){
								_t.add();
								_t.setNavigation();
								_t.addEvent();
							}
						}
					};
				main.init();
				
            })
        }
    })
})(jQuery, window);


;(function($) {
    $.fn.extend({
        minusMenu: function(options, callback) {
            var defaults = {
				closeElem: '',
				items: '> ul > li',
				siblings: 'li',
				controls: '> ul, > div',
				customClass: 'selected',
				openedDelay: 200,
				closedDelay: 555,
				eventType: 'hover',
				clickedElem: '> a',
				bdyClicked: false,
				isVisible: '',
				setPos: '',
				overlay: false,
				bdyCls: ''
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options,
					el = $( this ),
					items = el.find( o.items ),
                    main = {
						stm: null,
						clearTm: function(){
							var _t = this;
							if( _t.stm != null )
								clearTimeout( _t.stm );
						},
						detectEl: function( ID ){ return ID.length > 0 ? true : false; },
						isVisible: function(){
							var _t = this, b = false;
							if( o.isVisible !== '' ){
								var e = $( o.isVisible );
								if( _t.detectEl( e ) )
									if( e.is(':visible') )
										b = true;	
							}
							return b;
						},
						overlayControls: function( k ){
							var _t = this;
							if( o.overlay ){
								if( k == 'opened' ) bdy.addClass( o.bdyCls );
								else{ 
									var e = el.find( o.items + '.' + o.customClass );
									if( !_t.detectEl( e ) ) 
										bdy.removeClass( o.bdyCls );
								}
							}
						},
						setPos: function( ID ){
							if( o.setPos !== '' ){
								var _t = this, k = $(o.controls, ID), e = $( o.setPos );
								if( _t.detectEl( k ) && _t.detectEl( e ) ){
									var x1 = ID.offset().left + 800, x2 = e.width() + e.offset().left;
									if( x1 >= x2 ) k.css({ 'left': x2 - x1 });
								}
							}
						},
						closeElem: function(){
							if( o.closeElem != '' )
								$( o.closeElem ).each(function(){
									var ths = $( this ).get( 0 );
									if( typeof ths.closed !== 'undefined' )	
										ths.closed();
								});
						},
						lazyImg: function( k ){						 
							k
							.removeClass('lazy-load lazy-back-load')
							.addClass('load-image')
							.css('background-image', 'url("' + ( k.attr('data-original') || '' ) + '")');		
						},
						lazy: function( k ){
							var _t = this, img = $('.lazy-load, .lazy-back-load', k);	
							
							if( uty.detectEl( img ) )
								img
								.each(function(){ _t.lazyImg( $( this ) ); });
						},
						events: {
							onMouseEnter: function(){
								var _t = main, ths = $( this );
								
								if( _t.isVisible() ) return false;
								
								if( _t.detectEl( $(o.controls, ths) ) ){
									_t.clearTm();
									_t.stm = setTimeout(function(){
										_t.closeElem();
										ths.addClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.setPos( ths );
										_t.lazy( ths );
										_t.overlayControls('opened');
									}, o.openedDelay);
								}
							},
							onMouseLeave: function(){
								var _t = main, ths = $( this );
									if( _t.isVisible() ) return false;
									_t.clearTm();
									_t.stm = setTimeout(function(){
										ths.add( ths.siblings( o.siblings ) ).removeClass( o.customClass );
										_t.overlayControls('closed');
									}, o.closedDelay);
							},
							onClick: function( e ){
								var _t = main, ths = $( this ).parent( o.siblings );
								if( _t.detectEl( $(o.controls, ths) ) && !_t.isVisible() ){
									e.preventDefault();
									if( ths.hasClass( o.customClass ) ){
										ths.removeClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.overlayControls('closed');
									}else{
										ths.addClass( o.customClass ).siblings( o.siblings ).removeClass( o.customClass );
										_t.setPos( ths );
										_t.overlayControls('opened');
									}
								}
							},
							bdyClicked: function( e ){
								var _t = main;
								if( !el.is( e.target ) && el.has( e.target ).length === 0 && !_t.isVisible() ){
									$('.' + o.customClass, el).removeClass( o.customClass );
									_t.overlayControls('closed');
								}
							}
						},
						addEvent: function(){
							var _t = this;
							
							if( o.eventType == 'hover' )
								items.bind('mouseenter', _t.events.onMouseEnter).bind('mouseleave', _t.events.onMouseLeave);
							else if( o.eventType == 'click' )
								$(o.clickedElem, items).bind('click', _t.events.onClick);		
							
							if( o.bdyClicked )
								$('body, html').bind('click touchstart', _t.events.bdyClicked);
						},
						destroy: function(){
							var _t = this;
							$('.' + o.customClass, el).removeClass( o.customClass );
							_t.overlayControls('closed');
						},
						init: function(){
							var _t = this;
								_t.addEvent();
						}
					};  
				
				
				this.closed = function() {
                    if( main.stm != null ) clearTimeout( main.stm );
                    main.destroy()
                };
				
				main.init();              
            })
        }
    })
})(jQuery, window);

/////////////////////////////// JS MULTILANGUAGES
var translation = {
	
};

///////////////////////////////
var bdy = $('body'),
	win = $( window ),
	doc = $( document ),
	wt = parseFloat( win.width() ),
	ht = parseFloat( win.height() ),
	wst = parseFloat( win.scrollTop() ),
	sRatio,
	isMobile = mobile.detect(),
	uty = {
		speed: 666,
		easing: 'easeInOutExpo',
		ani: function( o, callback ){
			var _t = this, ID = o['el'];
			if( _t.detectEl( ID ) ){
				ID.stop().animate(o['prop'], o['speed'] || _t.speed, o['easing'] || _t.easing);
				setTimeout(function(){
					if( typeof callback !== 'undefined' )
						callback();
				}, ( o['speed'] || _t.speed ) + 1);
			}
		},
		setCss: function( o ){
			TweenLite.set(o['el'], { css: o['prop'] || {} } );
		},
		setAttr: function( o ){
			o['el'].attr( o['prop'], o['val'] || '' );
		},
		detectEl: function( ID ){
			return ID.length > 0 ? true : false;
		},
		ajx: function( o, callback ){
			$.ajax({
				type: o['type'] || 'GET',
				dataType: o['dataType'] || 'html',
				url: o['uri'] || '',
				data : o['param'] || {},
				contentType: o['contentType'] || '',
				error: function( e ){ 
					if( typeof callback !== 'undefined' ) 
						callback({ type: 'error' }); 
				},
				timeout: 30000,
				success:function( d ){ 
					if( typeof callback !== 'undefined' ) 
						callback({ type: 'success', val: d });
				}
			});
		},
		getScript: function( o, callback ){
			$.getScript(o['uri'], function(){
				if( typeof callback !== 'undefined' ) 
					callback();
			});
		},
		cssClass: function( o, callback ){
			var _t = this, ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
			if( _t.detectEl( ID ) ){
				if( type == 'add' ){
					cls = o['cls'] || ['ready', 'animate'];
					ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
				}else{
					cls = o['cls'] || ['animate', 'ready'];
					ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
				}
			}
		},
		pageScroll: function( o, callback ){
			var _t = this, k = o || {};
			$('html, body').stop().animate({ scrollTop: k['scrollTop'] || 0 }, k['speed'] || _t.speed, k['easing'] || _t.easing, function(){ 
				if( typeof callback !== 'undefined' )
					callback();  
			});
		},
		lazyLoad: function( o, callback ){
			var _t = this, ID = $( o['ID'] );
			if( _t.detectEl( $('.lazy', ID) ) )
				$('.lazy', ID).lazyload({ effect: 'fadeIn', container: o['container'] || window, load: function(){ 
					$( this )
					.removeClass('lazy')
					.addClass('loaded'); 
				}});
		},
		clearScriptTag: function( k ){
			var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
			while( SCRIPT_REGEX.test( k ) )
				k = k.replace(SCRIPT_REGEX, '');	
			return k;
		},
		trimText: function( k ){
			return k.replace(/(^\s+|\s+$)/g,'');
		},
		cleanText: function( k ){
			return k.replace(/\s+/g, '');
		},
		diff: function( arr1, arr2 ){
			var newArr = [];
			var arr = arr1.concat(arr2);
		
			for (var i in arr) {
				var f = arr[i];
				var t = 0;
				for (j = 0; j < arr.length; j++) {
					if (arr[j] === f) {
						t++;
					}
				}
				if (t === 1)
					newArr.push(f);
				
			}
			return newArr;
		},
		isVisible: '.responsive-control',
		visibleControl: function(){
			var _t = this, b = false;
			if( _t.isVisible !== '' ){
				var e = $( _t.isVisible );
				if( uty.detectEl( e ) )
					if( e.is(':visible') )
						b = true;	
			}
			return b;
		},
		Cookies: function( o ){ 
			var typ = o['typ'] || '', name = o['name'] || '';
			if( typ == 'set' ){ 
				var date = new Date(), minutes = o['minutes'] || 5;
					date.setTime( date.getTime() + ( minutes * 60 * 1000 ) );
				$.cookie(name, o['value'] || '', { expires: date, path: '/' });
			}else if( typ == 'get' )
				return $.cookie( name );
		}
	},
	management = {
		form: {
			/* regex kullanılınca özel karekterler çalışmayacak */
			regex: {
				typ1: /[^a-zA-ZıiIğüşöçİĞÜŞÖÇ\s]+/g, /* sadece harf */
				typ2: /[^0-9\s]+/g, /* sadece rakam */
				typ3: /[^a-zA-ZıiI0-9ğüşöçİĞÜŞÖÇ\s]+/g /* harf rakam karışık */
			},	
			arr: [				
				/*{ el: '[id$="txtUYA_CEPTELEFON"]', mask: '0(599) 9999999',required: 'required' },
				{ el: '[id$="lbfUYA_CEPTELEFON"]', class: 'zorunluFont'},
				{ el: '[id$="txtUYE_CEPTELEFONALAN"]', mask: '999' },
				{ el: '[id$="txtUYE_CEPTELEFON"]', mask: '9999999' },
				{ el: '[id$="txtUYA_POSTAKODU"]', mask: '99999' },
				{ el: '[id$="txtARM_KEYWORD"]', placeHolder: translation['txtARM_KEYWORD'] || 'Aramak istediğiniz nedir?' },
				{ el: '[id$="txtUYE_AD"]', regex: 'typ1', prop: 'maxlength', value: '40' },
				{ el: '[id$="txtUYE_SOYAD"]', regex: 'typ1', prop: 'maxlength', value: '40' },
				{ el: '[id$="txtUYA_FAT_AD"]', regex: 'typ1' },
				{ el: '[id$="txtUYE_EMAILYENI"]', prop: 'maxlength', value: '50' },
				{ el: '[id$="txtHCK_KEY"]', placeHolder: translation['txtHCK_KEY'] || 'Kodunuzu giriniz.' },
				{ el: '[id$="txtUYA_ADRES"]', prop: 'maxlength', value: '160' },
				{ el: '[id$="txtUYE_DOGUMTARIHI"]', required: 'required' },
				{ el: '[id$="lbfUYE_DOGUMTARIHI"]', class: 'zorunluFont' }*/
				
				{ el: '.mod-price-range input[type="text"]', mask: '000.000.000.000.000,00' }
				
				
				
				
				
			],
			set: function( o ){
				var _t = this, el = $( o['el'] );
				if( uty.detectEl( el ) ){
					var msk = o['mask'] || '', plc = o['placeHolder'] || '', rqrd = o['required'] || '', cls = o['class'] || '', rgx = o['regex'] || '', prop = o['prop'] || '';
					
					if( prop != '' )
						el.attr(prop, o['value'] || '');
					
					if( msk != '' ){
						el.removeAttr('maxlength');
						el.mask(msk, { autoclear: true, placeholder: '' });
					}
					if( plc != '' ) 
						el.attr('placeholder', plc );
					
					if( rqrd != '' )	
						el.attr('required', rqrd );	
						
					if( cls != '' )	
						el.addClass( cls );
					
					if( rgx != '' )
						el
						.attr('data-regex', rgx)
						.unbind('keyup paste', _t.events.onKeyUp)
						.bind('keyup paste', _t.events.onKeyUp);
				}
			},
			events: {
				onKeyUp: function(){
						var _t = formManagement, ths = $( this ), val = ths.val(), rgx = ths.attr('data-regex') || '';
						rgx = _t.regex[ rgx ] || '';
						if( rgx != '' )
							ths.val( val.replace( rgx, '') );
				}
			},
			init: function(){
				var _t = this, arr = _t.arr;
				for( var i = 0; i < arr.length; ++i )
					_t.set( arr[ i ] );	
			}
		},
		append: {
			arr: [
				//{ main: '.page-detail .ems-prd-color', target: '.page-detail .ems-prd-zoom-wrp li:eq(1), .page-detail .ems-prd-zoom-wrp li:eq(0)', 'type': 'after' },
			],
			set: function( o ){
				var main = $( o['main'] || '' ), target = $( o['target'] || '' ), clone = o['clone'] || '', type = o['type'] || '', htm = o['htm'] || '', target2 = o['target2'] || '';
				
				/**/
				if( !uty.detectEl( target ) && target2 != '' )
					target = $( target2 );
				
				if( uty.detectEl( main ) && uty.detectEl( target ) ){ 
					main = main.eq( 0 );
					target = target.eq( 0 );
					var e = clone != '' ? main.clone() : main;
					if( htm != '' ) e = htm;
					if( type == 'prepend' ) target.prepend( e );
					else if( type == 'before' ) target.before( e );
					else if( type == 'after' ) target.after( e );
					else if( type == 'html' ) target.html( e.html() );
					else target.append( e );
				}
			},	
			init: function( k ){
				var _t = this, arr = k || _t.arr;
				for( var i = 0; i < arr.length; ++i )
					_t.set( arr[ i ] );	
			}
		},
		destroy: function( o ){
			var _t = this, typ = o['type'] || '';
			if( typ == 'pc' ){
			
			}else if( typ == 'mobi' ){
			
			}
		},
		onScroll: function(){
			var _t = this;
		},
		adjust: function(){
			var _t = this;
		},
		init: function(){
			var _t = this;
				_t.append.init();
				_t.form.init();
		}	
	},
	plugin = {
		menu: {
			cls: { active: 'active-menu-plugin' },
			arr: [
				{ ID: '.nav-main:not(".active-menu-plugin") .cat-menu-holder', prop: { closeElem: '.mod-mini-cart, .mod-mini-login', setPos: '.nav-main', bdyClicked: true, eventType: isMobile ? 'click' : 'hover', isVisible: uty.isVisible, overlay: true, bdyCls: 'mini-menu-ready' } }
			],
			set: function( o ){
				var _t = this, ID = $( o['ID'] );
				if( uty.detectEl( ID ) ){
					if( !ID.hasClass( _t['cls']['active'] ) ){
						ID.addClass( _t['cls']['active'] );
						ID.minusMenu( o['prop'] || {} );
					}
				}
			},
			init: function(){
				var _t = this;
				for( var i = 0; i < _t.arr.length; ++i )
					_t.set( _t.arr[ i ] );
			}
		},
		tabMenu: {
			cls: { active: 'active-tabMenu-plugin' },
			el: '.ems-tab:not(".active-tabMenu-plugin")',
			set: function( ID ){
				var _t = this;
				if( !ID.hasClass( _t['cls']['active'] ) ){
					ID.addClass( _t['cls']['active'] );
					ID.minusTabMenu(); 
				}
			},
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) ){
					el.each(function(){ 
						var ths = $( this );
						_t.set( ths );
					});
				}
			}
		},
		slider: {
			cls: { active: 'active-slider-plugin' },
			el: '.swiper-container',
			target: '.swiper-wrapper > li',
			adjust: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) )
					el.each(function(){ 
						var ths = $( this );
						if( uty.detectEl( ths.find( _t.target ) ) ){
							ths = ths.get( 0 ); 	
							if( typeof ths.adjust !== 'undefined' )
								ths.adjust();
						}
					});
			},
			set: function( ID ){
				var _t = this;
				if( !ID.hasClass( _t['cls']['active'] ) && uty.detectEl( ID.find( _t.target ) ) ){
					ID.addClass( _t['cls']['active'] );
					ID.minusSlider(); 
				}
			},
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) ){
					el.each(function(){ 
						var ths = $( this );
						_t.set( ths );
					});
				}
			}
		},
		customDropDown: {
			cls: { active: 'active-custom-dropDown-plugin' },			
			el: '.dropdown',
			set: function( ID ){
				var _t = this;
				if( !ID.hasClass( _t['cls']['active'] ) ){
					ID.addClass( _t['cls']['active'] );
					ID.minusCustomDropDown(); 
				}
			},
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) ){
					el.each(function(){ 
						_t.set( $( this ) );
					});
				}
			}
		},
		dropDown: {
			cls: { active: 'active-dropDown-plugin' },
			arr: [				
				{ 'ID': '.mod-mini-cart', 'prop': { 'type': isMobile ? 'click' : 'hover', 'customClass': 'opened', 'bdyCls': 'mini-cart-ready', 'clicked': '.mod-mini-cart-header', 'overlay': true, 'openedDelay': 222  } },
			],
			set: function( o ){
				var _t = this, ID = $( o['ID'] ); 
				if( uty.detectEl( ID ) ){
					if( !ID.hasClass( _t['cls']['active'] ) ){
						ID.addClass( _t['cls']['active'] );
						ID.minusDropDown( o['prop'] || {} );
					}
				}
			},
			init: function(){
				var _t = this;
				for( var i = 0; i < _t.arr.length; ++i )
					_t.set( _t.arr[ i ] );
			}
		},
		styler: {
			el: 'select, input:checkbox, input:radio',
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) )
					el.iStyler({ wrapper:true });	
			}
		},
		sticky: {
			arr: [				
				{ 'ID': '.ems-row-2 .inner-row-2', 'prop': { 'parent': ".ems-row-2", 'offset_top': 60 } }
			],
			set: function( o ){
				var _t = this, ID = $( o['ID'] ), prop = o['prop'] || {}; 
				if( uty.detectEl( ID ) ){
					ID.each(function(){
						var ths = $( this );
							ths.stick_in_parent( prop );
					});
				}
			},
			init: function(){
				var _t = this;
				for( var i = 0; i < _t.arr.length; ++i )
					_t.set( _t.arr[ i ] );
			}
		},
		destroy: function( o ){
			var _t = this, typ = o['type'] || '';
			if( typ == 'pc' ){
			
			}else if( typ == 'mobi' ){
			
			}
		},
		onScroll: function(){
			var _t = this;
		},
		adjust: function(){
			var _t = this;
				_t.slider.adjust();
		},
		init: function(){
			var _t = this;
				_t.menu.init();
				_t.slider.init();
				_t.tabMenu.init();
				_t.dropDown.init();
				_t.customDropDown.init();
				_t.styler.init();
				_t.sticky.init();
		}
	},
	modules = {
		cookieBanner: {
			data: {},
			el: '.campaign-bnr',
			set: function( id ){
				var _t = this;
					_t.data[ id ] = 0;

				uty.Cookies({ typ: 'set', name: 'cookieBanner', value: JSON.stringify( _t.data ) });
			},
			addEvent: function(){
				var _t = this;
				$( _t.el )
				.find('.bnr-close')
				.bind('click', function(){
					var ths = $( this ), prts = ths.parents( _t.el ), id = prts.attr('id') || '';
					_t.set( id )
					prts.slideUp( 333 );
				});
			},
			add: function(){
				var _t = this, c = uty.Cookies({ typ: 'get', name: 'cookieBanner' }) || '';
				if( c != '' ){
					_t.data = JSON.parse( c );
					$.each(_t.data, function( i, k ){
						if( k == 0 )
							$('[id$="'+ i +'"]').hide();
					});
				}
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el ) ) ){
					_t.addEvent();
					_t.add();
				}
			}
		},
		mobiMenu: {
			cls: { ready: 'mobi-menu-ready', animate: 'mobi-menu-animate', selected: 'selected', subMenu: 'sub-menu', lvl: 'mobi-menu-lvl-1' },
			el: { wrp: '.nav-main', btn: '.mobile-burger', closeBtn: '#mobil-menu-close', backBtn: '#mobil-menu-back' },
			pp: function( k ){
				var _t = this;
				if( k == 'add' )
					uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':[_t.cls['ready'], _t.cls['animate']] });
				else
					uty.cssClass({ 'ID': 'body', 'delay': 333, 'type': 'remove', 'cls':[_t.cls['animate'], _t.cls['ready']] });	
			},
			addEvent: function(){
				var _t = this, e = $( _t.el.btn );
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						if( bdy.hasClass( _t.cls['ready'] ) )
							_t.pp('remove');
						else
							_t.pp('add');	
					});		
				
				e = $( _t.el.closeBtn );
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						_t.pp('remove');
					});
				
				e = $( _t.el.backBtn );
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						bdy.removeClass( _t.cls['lvl'] );
						$( _t.el.wrp )
						.find('.' + _t.cls['selected'])
						.removeClass( _t.cls['selected'] );
						
					});	
				
				$( _t.el.wrp )
				.find('a')
				.each(function(){
                    var ths = $( this ), prt = ths.parent('li'), sib = ths.siblings('ul, div');
					if( uty.detectEl( sib.find('li') ) )
						prt.addClass( _t.cls['subMenu'] );
                })
				.bind('click', function( evt ){
					var ths = $( this ), sib = ths.siblings('div, ul'), prt = ths.parents('li').eq( 0 );
					if( uty.visibleControl() )
						if( uty.detectEl( sib.find('li') ) ){
							evt.preventDefault();	
							if( prt.hasClass( _t.cls['selected'] ) ){
								prt.add( prt.siblings('li') ).removeClass( _t.cls['selected'] );
								bdy.removeClass( _t.cls['lvl'] );
							}else{	
								prt.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
								bdy.addClass( _t.cls['lvl'] );
							}
						}	
				});
								
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		customSearch: {
			cls: { focused: 'search-focused', keyup: 'search-keyup', loading: 'search-ajx-loading', ready: 'mobi-search-ready' },
			el: { wrp: '.mod-mini-search', input: '#tags', suggContent: '.suggestion-wrapper', mobiBtn: '.mobile-search', closeBtn: '.mod-mini-search-footer' },
			begin: 3,
			delay: 333,
			stm: null,
			clearTm: function(){
				var _t = this;
				if( _t.stm !== null )
					clearTimeout( _t.stm );
			},
			uri: {
				kyw: 'sugg/prd-sugg-ajx.php?kyw={{val}}'
			},
			getURI: function( o ){
				var _t = this, val = o['val'] || '', typ = o['typ'] || '';
				return _t.uri[ typ ].replace(/{{val}}/g, val);
			},
			loading: function( k ){
				var _t = this;
				if( k == 'add' ) 
					bdy.addClass( _t.cls['loading'] );
				else 
					bdy.removeClass( _t.cls['loading'] );	
			},
			addEvent: function(){
				var _t = this, wrp = $( _t.el.wrp ), input = wrp.find( _t.el.input ), suggContent = wrp.find( _t.el.suggContent );
				
				input
				.bind('focus', function(){
					var ths = $( this ), val = uty.trimText( ths.val() || '' );
					if( val.length > 0 )
						bdy.addClass( _t.cls['keyup'] );
						
					bdy.addClass( _t.cls['focused'] );	
				})
				.bind('keyup paste', function(){
					var ths = $( this ), val = uty.trimText( ths.val() || '' );
					if( val.length > 0 ){
						bdy.addClass( _t.cls['keyup'] );
						_t.clearTm();
						
						if( val.length >= _t.begin )
							_t.stm = setTimeout(function(){
								
								_t.loading('add');
								
								uty.ajx({ uri: _t.getURI({ val: val, typ: 'kyw' }) }, function( d ){
									if( d['type'] == 'success' ){
										var k = uty.trimText( d['val'] || '' );
										suggContent.html( k );
									}else
										suggContent.html('');
										
									_t.loading('remove');
								});
								
							}, _t.delay);
					}else
						bdy.removeClass( _t.cls['keyup'] );	
				})
				.bind('blur', function(){
					var ths = $( this ), val = uty.cleanText( ths.val() || '' );
					if( val.length == 0 )
						bdy.removeClass( _t.cls['focused'] ).removeClass( _t.cls['keyup'] ).removeClass( _t.cls['ready'] );
				});	
				
				
				$( _t.el.mobiBtn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['ready'] ) )
						bdy.removeClass( _t.cls['ready'] );
					else{
						bdy.addClass( _t.cls['ready'] );
						setTimeout(function(){ input.focus(); }, 333);
					}
				});
				
				$( _t.el.closeBtn )
				.bind('click', function(){
					input.val('').blur();
				});
			},
			destroy: function(){
				var _t = this;
				if( bdy.hasClass( _t.cls['focused'] ) )
					bdy.removeClass( _t.cls['focused'] ).removeClass( _t.cls['keyup'] ).removeClass( _t.cls['ready'] );
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		viewType: {
			btn: '.ems-prd-list-view ul li',
			cls: { selected: 'selected' }, 
			cookie: function( o ){ 
				var _t = this, typ = o['typ'] || '';
				if( typ == 'set' ) 
					$.cookie('viewType', o['val'] || '', { expires: 1, path: '/' });
				else if( typ == 'get' ) 
					return $.cookie('viewType') || '';
			},
			addEvent: function(){
				var _t = this, btn = $( _t.btn ), cls = '';
				btn
				.each(function(){
					var ths = $( this ), rel = ths.attr('rel') || '';
					if( rel != '' )
                    	cls += rel + ' '; 
                })
				.unbind('click')
				.bind('click', function(){
					var ths = $( this ), rel = ths.attr('rel') || '';
						ths.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
					bdy.removeClass( cls ).addClass( rel );
					_t.cookie({ typ: 'set', val: rel });
					setTimeout(function(){ win.resize() }, 10);
				});
				
				var k = _t.cookie({ typ: 'get' }), ind = 0;
				if( k != '' ){
					k = $( _t.btn + '[rel="'+ k +'"]');
					if( uty.detectEl( k ) )
						ind = k.index();	
				}
				
				btn
				.eq( ind )
				.click();
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.btn ) ) )
					_t.addEvent();
			}
		},
		pageFocused: {
			arr: [
				{ 'main': ".mobile-element-scroll", 'target': ".site-wrapper" },
				{ 'main': ".ems-prd-size-btn", 'target': ".ems-size-table" }
				
			],
			onClick: function( k ){
				var ths = $( k ), target = $( ths.attr('data-target') || '' ), off = parseFloat( ths.attr('data-offset') || 0 );
				if( uty.detectEl( target ) )
					uty.pageScroll({ scrollTop: target.offset().top + off })
			},
			set: function( o ){
				var _t = this, main = $( o['main'] || '' ), target = $( o['target'] || '' );
					if( uty.detectEl( main ) && uty.detectEl( target ) )
						main
						.attr('data-target', o['target'] )
						.attr('data-offset', o['offset'] || 0 )
						.unbind('click')
						.bind('click', function(){ _t.onClick( this ); });
			},	
			init: function(){
				var _t = this, arr = _t.arr;
				for( var i = 0; i < arr.length; ++i )
					_t.set( arr[ i ] );
			}	
		},
		compactMenu: {
			el: { wrp: '.site-header' },
			cls: { ready: 'header-fixed-animate', fxd: 'fixed-header' },
			rate: 200,
			adjust: function(){
				var _t = this, wrp = $( _t.el.wrp );
				
				if( uty.detectEl( wrp ) )
					if( wst >= wrp.offset().top ) wrp.addClass( _t.cls['fxd'] );
					else wrp.removeClass( _t.cls['fxd'] );
				
				if( wst >= _t.rate ) bdy.addClass( _t.cls['ready'] );
				else bdy.removeClass( _t.cls['ready'] );
			}
		},
		changeDiv: {
			arr: [
				{ mobi: { main: '.page-detail .ems-prd-color', target: '.page-detail .ems-prd-zoom-wrp li:eq(1)', target2: '.page-detail .ems-prd-zoom-wrp li:eq(0)', type: 'after' }, pc: { main: '.page-detail .ems-prd-color', target: '.inner-row-2 .ems-prd-top', type: 'after' } }
			],
			set: function( o ){
				management.append.set( o );
			},
			init: function( o ){
				var _t = this, arr = _t.arr;
				for( var i = 0; i < arr.length; ++i )
					_t.set( arr[ i ][ o['typ'] || '' ] );
			}
		},
		filter: {
			cls: { ready: 'filter-popup-ready', animate: 'filter-popup-animate', filterSelection: 'filter-selection', opened: 'opened', closed: 'closed', lvl: 'filter-level-open' },
			el: { wrp: '.page-list', mobiBtn: '.mobile-element-filter', mobiCloseBtn: '.cat-filter-text, .vail-filter', selectionWrp: '.mod-categories, .mod-filter-rows', headerBtn: '.header-btn' },
			pp: function( k ){
				var _t = this;
				if( k == 'add' )
					uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':[_t.cls['ready'], _t.cls['animate']] });
				else
					uty.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':[_t.cls['animate'], _t.cls['ready']] });
			},
			addEvent: function(){
				var _t = this;
				
				$( _t.el.mobiBtn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['ready'] ) )
						_t.pp('remove');
					else
						_t.pp('add');		
				});	
				
				$( _t.el.mobiCloseBtn )
				.bind('click', function(){
					_t.pp('remove');
				});	
				
				$( _t.el.headerBtn )
				.bind('click', function(){
					var ths = $( this ), prts = ths.parents( _t.el.selectionWrp ).eq( 0 );
					if( uty.visibleControl() ){
						/* mobi */
						if( prts.hasClass( _t.cls['opened'] ) ){
							prts.removeClass( _t.cls['opened'] );
							bdy.removeClass( _t.cls['lvl'] );
						}else{
							prts.addClass( _t.cls['opened'] );
							bdy.addClass( _t.cls['lvl'] );
						}					
					}else{
						/* pc */
						prts.toggleClass( _t.cls['closed'] );
					}
				});
				
			},
			setSelection: function(){
				var _t = this, count = 0;
				$( _t.el.selectionWrp )
				.each(function(){
                    var ths = $( this ), k = ths.find('.selected > a span');
					if( uty.detectEl( k ) ){
						ths.find('.selection').text( k.map(function(){ return $( this ).text(); }).get().join( ", " ) );
						count++;
					}
                });
				
				if( count == 0 ) bdy.removeClass( _t.cls['filterSelection'] );
				else bdy.addClass( _t.cls['filterSelection'] ); 
			},
			destroy: function(){
			
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) ){
					_t.setSelection();
					_t.addEvent();
				}
			}
		},
		stockStore: {
			cls: { ready: 'stock-store-ready' },
			el: { wrp: '.popup-default-size', btn: '.ems-prd-store-btn', closeBtn: '.popup-default-size .btn-popup-close, .vail-size' },
			pp: function( k ){
				var _t = this;
				if( k == 'add' )
					bdy.addClass( _t.cls['ready'] );
				else
					bdy.removeClass( _t.cls['ready'] );	
			},
			addEvent: function(){
				var _t = this, wrp = $( _t.el.wrp );
				
				$( _t.el.btn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['ready'] ) )
						_t.pp('remove');
					else
						_t.pp('add');	
				});
				
				$( _t.el.closeBtn )
				.bind('click', function(){
					_t.pp('remove');
				});
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		suggestionCartPopup: {
			cls: { ready: 'suggestion-popup-ready' },
			el: { wrp: '.popup-default-prd-cart', closeBtn: '.popup-default-prd-cart .btn-popup-close, .vail-cart' },
			pp: function( k ){
				var _t = this;
				if( k == 'add' )
					bdy.addClass( _t.cls['ready'] );
				else
					bdy.removeClass( _t.cls['ready'] );	
			},
			addEvent: function(){
				var _t = this;
				
				$( _t.el.closeBtn )
				.bind('click', function(){
					_t.pp('remove');
				});
			},
			show: function(){
				var _t = this, wrp = $( _t.el.wrp );
				if( uty.detectEl( wrp ) ){
					bdy.addClass( _t.cls['ready'] );
					setTimeout(function(){ 
						/*var e = wrp.find('swiper-container');
						if( uty.detec )*/
						
					win.resize(); 
					}, 100);
				}
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		destroy: function( o ){
			var _t = this, typ = o['type'] || '';
			if( typ == 'pc' ){
			
			}else if( typ == 'mobi' ){
			
			}
		},
		onScroll: function(){
			var _t = this;
				_t.compactMenu.adjust();
		},
		adjust: function(){
			var _t = this;
				_t.compactMenu.adjust();
		},
		init: function(){
			var _t = this;
				_t.cookieBanner.init();
				_t.mobiMenu.init();
				_t.customSearch.init();
				_t.viewType.init();
				_t.pageFocused.init();
				_t.filter.init();
				_t.stockStore.init();
				_t.suggestionCartPopup.init();
		}
	},
	pages = {
		delivery: {
			cls: { opened: 'opened' },
			el: { wrp: '.ems-page-order-delivery', coupon: '.ems-cart-coupon' },
			addEvent: function(){
				var _t = this, e = $( _t.el.coupon );
				if( uty.detectEl( e ) )
					e
					.find('.ems-cart-coupon-header')
					.bind('click', function(){
						$( this ).parent().toggleClass( _t.cls['opened'] );	
					});
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		detail: {
			cls: { selected: 'selected', mobiSizeReady: 'mobi-size-ready' },
			el: { wrp: '.page-detail', thumb: '.ems-prd-zoom-thumb ul', gallery: '.ems-prd-zoom-wrp li', mobiSizeBtn: '.mobile-size-btn', mobiCloseSizeBtn: '.vail-mobi-size, .ems-prd-size-header' },
			addEvent: function(){},
			template: {
				thumb: '<li data-order="{{ord}}" class="{{cls}}"><a href="javascript:void(0);"><i></i><img src="{{src}}"></a></li>'
			},
			getTemplate: function( o ){
				var _t = this, htm = '', typ = o['typ'] || '', ID = $( o['ID'] || '' );
				if( uty.detectEl( ID ) ){
					if( typ == 'thumb' ){
						htm = '<ul>';
						ID
						.each(function( i ){
							var ths = $( this ), k = ths.attr('data-thumb') || '', cls = i == 0 ? _t.cls['selected'] : '';
								ths.attr('data-order', i);
							if( k != '' )
								htm += _t.template['thumb'].replace(/{{src}}/g, k).replace(/{{cls}}/g, cls).replace(/{{ord}}/g, i);	
						});
						
						htm += '</ul>';
					}
				}
				return htm;
			},
			addEvent: function(){
				var _t = this, wrp = $( _t.el.wrp ), e = wrp.find( _t.el.thumb + ' li' );
				
				
				/* gallery thumb clicked */
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						var ths = $( this ), ord = ths.attr('data-order') || '', k = $( _t.el.gallery ).eq( ord );
						if( uty.detectEl( k ) )	
							uty.pageScroll({ scrollTop: k.offset().top - 60 });
					});
				
				/* gallery large image */
				e = wrp.find( _t.el.gallery )
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){ 
						var ths = $( this ), k = ths.find('a').attr('data-large') || '';
						if( k != '' ){
							var arr = [];
								arr.push( k );
							ths.siblings().each(function(){
								var n = $( this ).find('a').attr('data-large') || ''; 
								if( n != '' )
									arr.push( n );
							});
							
							bdy.get( 0 ).loadImg( { uri: k, items: arr } );
						}
					});
				
				
				/* mobi info clicked */
				e = wrp.find('.mobile-element-info')
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						var k = $('.ems-tab-detail .content-js [rel="tab-1"]');
						if( uty.detectEl( k ) )	
							k.removeClass( _t.cls['selected'] ).find('> a').get( 0 ).click();
					});
				
				/* mobi size */
				$( _t.el.mobiSizeBtn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['mobiSizeReady'] ) )
						bdy.removeClass( _t.cls['mobiSizeReady'] );
					else
						bdy.addClass( _t.cls['mobiSizeReady'] );
				});	
				
				$( _t.el.mobiCloseSizeBtn )
				.bind('click', function(){
					bdy.removeClass( _t.cls['mobiSizeReady'] );
				});	
						
			},
			add: function(){
				var _t = this, wrp = $( _t.el.wrp );
				
				wrp
				.find( _t.el.thumb )
				.html( _t.getTemplate({ ID: _t.el.gallery, typ: 'thumb' }) );	
			},
			detectPosition: function( ID ){							
				var b = false,
					o1 = { x: 0, y: wst + ht * .4, width: wt, height: ht },
					o2 = { x: 0, y: ID.offset().top, width: wt, height: ID.height() };  
				if( o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y ){
					b = true;       
				}
				
				return b;
			},
			adjust: function(){
				var _t = this, wrp = $( _t.el.wrp ), gallery = $( _t.el.gallery );
				if( uty.detectEl( wrp ) && uty.detectEl( gallery ) ){
					
					if( wst >= wrp.offset().top ){	
						gallery.each(function(){     
							var ths = $( this );
							if( _t.detectPosition( ths ) && ths.is(':visible') ){
								var rel = ths.attr('data-order') || '';
								if( rel !== '' ){
									var e = $(_t.el.thumb + ' li' + '[data-order="'+ rel +'"]');
									if( uty.detectEl( e ) )
										e.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
								}
								return false;
							}
						});
					}
				}
			},
			initPlugins: function(){
				bdy.minusGallery();
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) ){
					_t.initPlugins();
					_t.add();
					_t.addEvent();
				}
			}
		},
		login: {
			cls: { ready: 'member-login-ready' },
			el: { wrp: '.page-login', loginBtn: '.btn-default-login', memberBtn: '.btn-default-member' },
			addEvent: function(){
				var _t = this;
				
				$( _t.el.loginBtn )
				.bind('click', function(){
					setTimeout(function(){ uty.pageScroll({ scrollTop: 0 }); }, 100);
					bdy.addClass( _t.cls['ready'] );
				});
				
				$( _t.el.memberBtn )
				.bind('click', function(){
					setTimeout(function(){ uty.pageScroll({ scrollTop: 0 }); }, 100);
					bdy.removeClass( _t.cls['ready'] );
				});
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},
		cart: {
			cls: { currencyPp: 'currency-popup-ready', costsPp: 'costs-popup-ready' },
			el: { wrp: '.page-cart', currencyBtn: '.ems-other-currency a', currencyCloseBtn: '.popup-default-currents .btn-popup-close, .vail-currents', costsBtn: '.ems-page-default-cargo a', costsCloseBtn: '.popup-default-costs .btn-popup-close, .vail-costs' },
			addEvent: function(){
				var _t = this;
				
				$( _t.el.currencyBtn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['currencyPp'] ) )
						bdy.removeClass( _t.cls['currencyPp'] );
					else	
						bdy.addClass( _t.cls['currencyPp'] );
				});
				$( _t.el.currencyCloseBtn )
				.bind('click', function(){
					bdy.removeClass( _t.cls['currencyPp'] );
				});
				
				$( _t.el.costsBtn )
				.bind('click', function(){
					if( bdy.hasClass( _t.cls['costsPp'] ) )
						bdy.removeClass( _t.cls['costsPp'] );
					else	
						bdy.addClass( _t.cls['costsPp'] );
				});
				$( _t.el.costsCloseBtn )
				.bind('click', function(){
					bdy.removeClass( _t.cls['costsPp'] );
				});
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},	
		lookbook: {
			cls: {  },
			el: { wrp: '.page-cart' },
			addEvent: function(){
				
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.el.wrp ) ) )
					_t.addEvent();
			}
		},	
		destroy: function( o ){
			var _t = this, typ = o['type'] || '';
			if( typ == 'pc' ){
			
			}else if( typ == 'mobi' ){
			
			}
		},
		onScroll: function(){
			var _t = this;
				_t.detail.adjust();
		},
		adjust: function(){
			var _t = this;
				_t.detail.adjust();
		},
		init: function(){
			var _t = this;
				_t.delivery.init();
				_t.detail.init();
				_t.login.init();
				_t.cart.init();
		}
	},
	resetDom = {
		k: true,
		adjust: function(){
			var _t = this;
			if( !_t.k && uty.visibleControl() ){
				// mobi
				_t.k = true;
				management.destroy({ typ: 'mobi' });
				modules.destroy({ typ: 'mobi' });
				plugin.destroy({ typ: 'mobi' });
				pages.destroy({ typ: 'mobi' });
				
				modules.changeDiv.init({ typ: 'mobi' });
			}else if( _t.k && !uty.visibleControl() ){
				// pc
				_t.k = false;
				management.destroy({ typ: 'pc' });
				modules.destroy({ typ: 'pc' });
				plugin.destroy({ typ: 'pc' });
				pages.destroy({ typ: 'pc' });
				
				modules.changeDiv.init({ typ: 'pc' });
			}
		},
		init: function(){
			var _t = this;
			if( uty.visibleControl() )
				_t.k = false;
		}
	},
	events = {
		bdyClicked: function(){
			$('body, html').bind('click touchstart', function( e ){
				var m = $('.dropdown'); 
				if( !m.is( e.target ) && m.has( e.target ).length === 0 )
					m.removeClass('opened');
					
				var m = $('.mod-mini-search'); 
				if( !m.is( e.target ) && m.has( e.target ).length === 0 )
					modules.customSearch.destroy();
			});	
		},
		loaded: function(){
			uty.lazyLoad( { ID: 'body' } );
		},
		onResize: function(){
			wt = parseFloat( win.width() );
			ht = parseFloat( win.height() );
			
			resetDom.adjust();
			management.adjust();
			modules.adjust();
			plugin.adjust();
			pages.adjust();
		},
		onResizeStop: function(){
			
		},
		onScroll: function(){
			wst = parseFloat( win.scrollTop() );
			sRatio = wst / ( doc.height() - ht );
			
			management.onScroll();
			modules.onScroll();
			plugin.onScroll();
			pages.onScroll();
		},
		init: function(){
			var _t = this;
				_t.bdyClicked();
			win.load( _t.loaded );
			win.resize( _t.onResize ).resize();
			win.bind('resizestop', _t.onResizeStop);
			win.bind('scroll', _t.onScroll ).scroll();
		}
	},
	initialize = function(){
			management.init();
			modules.init();
			plugin.init();
			pages.init();
			resetDom.init();
			events.init();
	};
	
	initialize();