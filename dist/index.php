<?php
$id = $_GET['id'];
?>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title></title>

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        
        <!-- Vis CSS -->
        <link href='css/App.css' rel='stylesheet' type='text/css'>
    </head>
    
    <body></body>
    <!-- App Script  -->
    <script data-my_var_1="<?php echo $id; ?>" data-my_var_2="./data/links.json" src="js/App.js"></script>
    <script>
        
        
        
        App.init({});
    </script>
</html>
<?php
$id = NULL;
?>