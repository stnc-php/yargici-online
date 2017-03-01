/* Sitedeki aksiyonları gösterme amaçlı ekleniyor */

var pageAction = {
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
		
			_t.detail.init();
	}
};

pageAction.init();