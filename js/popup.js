function ppResize(){
	var bdy = $('body'), cls = 'frm-popup-mobile';
	if( typeof window.parent.uty.visibleControl !== 'undefined' ){
		if( window.parent.uty.visibleControl() )
			bdy.addClass( cls );
		else
			bdy.removeClass( cls );
	}
			
}
$(window).bind('resize', ppResize).resize();