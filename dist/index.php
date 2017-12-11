<?php
$sampleID = $_GET['sampleID'];
$organism = $_GET['organism'];
$id = $_GET['sessionid'];

//Get info for mysql server
$str = file_get_contents('mysql/mysql_info.json');
$json = json_decode($str, true);
$host = $json['host'];
$port = $json['port'];
$user = $json['user'];
$passwd = $json['passwd'];
$unix_socket = $json['unix_socket'];
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
    <script sampleID="<?php echo $sampleID; ?>" links_file="./data/links.json" organism="<?php echo $organism; ?>" sessionid="<?php echo $id; ?>" host="<?php echo $host; ?>" port="<?php echo $port; ?>" user="<?php echo $user; ?>" passwd="<?php echo $passwd; ?>" unix_socket="<?php echo $unix_socket; ?>" src="js/App.js"></script>
    <script>
        
        
        
        App.init({});
    </script>
</html>
<?php
$id = NULL;
?>