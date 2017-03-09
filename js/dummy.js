/* Sitedeki aksiyonları gösterme amaçlı ekleniyor */

var pageAction = {
	list: {
		cls: { selected: 'selected' },
		el: { wrp: '.page-list', filter: '.mod-controller-objects li > a' },
		addEvent: function(){
			var _t = this;
			$( _t.el.filter )
			.bind('click', function(){
				var ths = $( this ), prt = ths.parent('li');
				prt.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] ).parents('li').eq( 0 ).addClass( _t.cls['selected'] );
				modules.filter.setSelection();
			});		
		},
		init: function(){
			var _t = this;
			if( uty.detectEl( $( _t.el.wrp ) ) )
				_t.addEvent();
		}
	},
	detail: {
		cls: { addCart: 'add-cart', added: 'cart-added' },
		el: { wrp: '.page-detail', addCart: '.btn-addToCart' },
		addEvent: function(){
			var _t = this;
			
			
			$( _t.el.addCart )
			.bind('click', function(){
				var ths = $( this );
					ths.addClass( _t.cls['addCart'] );
					setTimeout(function(){ 
						ths.addClass( _t.cls['added'] ); 
						setTimeout(function(){ 
							ths.removeClass( _t.cls['addCart'] ).removeClass( _t.cls['added'] );
							modules.suggestionCartPopup.show();
						}, 1000);
					}, 1000);
			});
			
		},
		init: function(){
			var _t = this;
			if( uty.detectEl( $( _t.el.wrp ) ) )
				_t.addEvent();
		}
	},
	init: function(){
		var _t = this;
			_t.list.init();
			_t.detail.init();
	}
};

pageAction.init();