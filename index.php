<?php
include 'header.php';
?>

<main class="site-content ems-width-full">
    <?php

        $page = (isset($_GET['page'])) ? $_GET['page'] : 'home';

        require_once($page.'.php');
    ?>
</main>

<?php
include 'footer.php'; 
?>