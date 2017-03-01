<?php
	$kyw = (isset($_GET['kyw'])) ? $_GET['kyw'] : '';
	
	if( $kyw == 'yaka' )
		require_once('sugg.php');
	else
		echo '';	
?>