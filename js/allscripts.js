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
				{ 'ID': '.page-detail:not(".page-quick-review") .ems-row-2 .inner-row-2', 'prop': { 'parent': ".ems-row-2", 'offset_top': 60 } },
				{ 'ID': '.page-detail:not(".page-quick-review") .ems-prd-zoom-left', 'prop': { 'parent': ".ems-prd-zoom-inner", 'offset_top': 0 } }
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
		customFormInput: {
			el: '.ems-form input[type="text"]:not("#tags"), .ems-form input[type="password"], .ems-form textarea',
			allow: '.ems-form select, .ems-form input[type="checkbox"]',
			cls: { active: 'is-active', completed: 'is-completed' },
			addEvent: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) )
					el
					.each(function(){
                        var ths = $( this ), val = uty.cleanText( ths.val() );
						if( val != '' )
							ths
							.closest('.ems-field')
							.addClass( _t.cls['active'] )
							.addClass( _t.cls['completed'] );
                    })
					.unbind('focus')
					.bind('focus', function(){
						 $( this )
						 .closest('.ems-field')
						 .addClass( _t.cls['active'] )
						 .addClass( _t.cls['completed'] )
					})
					.unbind('focusout')
					.bind('focusout', function(){
						var ths = $( this );
						if( ths.val() == '' )
							ths
							.closest('.ems-field')
							.removeClass( _t.cls['active'] )
							.removeClass( _t.cls['completed'] )
					})
					.bind('change', function(){
						var ths = $( this );
						setTimeout(function(){
							if( ths.val() != '' )
								ths
								.closest('.ems-field')
								.addClass( _t.cls['active'] )
								.addClass( _t.cls['completed'] )
						}, 1);
					})
			},
			add: function(){
				var _t = this;
				$( _t.allow )
				.each(function(){
					var ths = $( this );
						ths
						.closest('.ems-field')
						.addClass( _t.cls['active'] )
						.addClass( _t.cls['completed'] );
				})
			},
			init: function(){
				this.add();
				this.addEvent();
			}
		},
		pp: {
			init: function(){
				$('body').minusSimplePopup();
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
				_t.pp.init();
				_t.customFormInput.init();
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
					if( wst >= wrp.offset().top + 100 )
						 bdy.addClass( _t.cls['ready'] );
					else
						bdy.removeClass( _t.cls['ready'] );
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
					setTimeout(function(){ win.resize(); }, 100);
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
			el: { wrp: '.page-detail', thumbWrp: '.ems-prd-zoom-left', thumb: '.page-detail:not(".page-quick-review") .ems-prd-zoom-thumb ul', gallery: '.page-detail:not(".page-quick-review") .ems-prd-zoom-wrp li', mobiSizeBtn: '.mobile-size-btn', mobiCloseSizeBtn: '.vail-mobi-size, .ems-prd-size-header' },
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
				var _t = this, wrp = $( _t.el.wrp ), e = $( _t.el.thumb + ' li' );
				
				
				/* gallery thumb clicked */
				if( uty.detectEl( e ) )
					e
					.bind('click', function(){
						var ths = $( this ), ord = ths.attr('data-order') || '', k = $( _t.el.gallery ).eq( ord );
						if( uty.detectEl( k ) )	
							uty.pageScroll({ scrollTop: k.offset().top - 60 });
					});
				
				/* gallery large image */
				e = $( _t.el.gallery )
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
				var _t = this, wrp = $( _t.el.wrp ), e = $( _t.el.thumb );
				
				if( uty.detectEl( e ) )
					e.html( _t.getTemplate({ ID: _t.el.gallery, typ: 'thumb' }) );	
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
					
					/*  */
					$( _t.el.thumbWrp ).height( gallery.eq( 0 ).height() );
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
		list: {
			cls: {  },
			el: { wrp: '.page-list', main: '.emosInfinite .ems-prd:not(".ems-prd-alternate")', target: '.ems-prd-alternate' },
			addEvent: function(){
				
			},
			adjust: function(){
				var _t = this, main = $( _t.el.main ), target = $( _t.el.target );
				if( uty.detectEl( main ) && uty.detectEl( target ) )
					target.height( Math.ceil( main.height() - 1 ) );
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
				_t.list.adjust();
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