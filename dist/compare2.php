<?php 
if (isset($_COOKIE['mitoviz_user_upload'])) { 
        session_id($_COOKIE['mitoviz_user_upload']);
}

session_start();

$id = session_id();
setcookie('mitoviz_user_upload',$id,time() + (86400 * 7));

$PCA_path = "data/user_uploads/".$id."/PCA/";
if (!is_dir($PCA_path)){
//    mkdir($PCA_path, 0777, true);
}

$heatmap_path = "data/user_uploads/".$id."/heatmap/";
if (!is_dir($heatmap_path)){
//    mkdir($heatmap_path, 0777, true);
}

$compare = $_GET['compare'];

if($compare){
    $jsarray =implode(",", $compare);
}

$connect = mysql_connect('localhost','root', '', 'false', '128');
mysql_query('set global group_concat_max_len = 150000');
mysql_select_db('mitox',$connect);
    
$query = "SELECT * from file_directory";
$result = mysql_query($query);

$rows = array();
while($r = mysql_fetch_assoc($result)) {
    $rows[] = $r;
}
?>
<html lang="en">
    <head>
        <title>MitoXplorer - Analysis</title>
        <meta charset=utf-8>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="./css/bootstrap-select.min.css" rel="stylesheet" >
        <link href="./css/bootstrap.css" rel="stylesheet" >
        <link href="./css/style.css" rel="stylesheet" >
        <link href="./css/App.css" rel="stylesheet" >
        
        <script src="./js/jquery-1.12.4.min.js"></script>
        <script src="./js/bootstrap.min.js"></script>
        <script src="./js/bootstrap-select.js"></script>
        <link rel="icon" type="image/png" href="img/logos/favicon.png">
    </head>
    
    <body>
    <nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" href="index.php">MitoXplorer</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="index.php"></a>
                    </li>
                    <li>
                        <a href="index.php#about">About</a>
                    </li>
                    <li>
                        <a href="index.php#database">Database</a>
                    </li>
                    <li>
                        <a href="index.php#analysis">Analysis</a>
                    </li>
                    <li>
                        <a href="index.php#tutorial">Tutorial</a>
                    </li>
                    <li>
                        <a href="index.php#download">Download</a>
                    </li>
                    <li>
                        <a href="index.php#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
        <!-- Page Content -->

            <div class = "container" id="content">
                <!-- Page Content -->     
                <div class="container main">
                    <div id="#wrapUp" class="row">
                        <div class="col-md-2">
                            <div class="row">
                                <!-- Select organism -->
                                <div class="col-md-12 title" style="margin-top:10px">Organism 
                                </div>
                                <div class="col-md-12" style="margin-top:10px;">
                                    <select class="selectpicker" id="organisms" data-style="btn-default" title="Choose Organism" data-width="175px" >
                                    </select>
                                </div>
                                <!--Select type of analysis -->
                                <div class="col-md-12 title" style="margin-top:15px;">Analysis  <font style="text-transform:none;font-size:70%;color:#929292;text-decoration: underline;"><a href="#database-aneuploidy" class="database-link" data-toggle="modal">Change</a></font> 
                                    <button type="button" class="btn btn-default btn-xs question"><i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                        <span id="question-analysis" class="question-tooltip" style="width: 250px;height: 40px;left: 95%;">Click "Change" to select other analyses<br>and see their descriptions</span>
                                    </button>
                                    
                                </div>
                                <div id="analysis" class="col-md-12" style="margin-top:10px;text-align:center;padding-right:0px;font-size:16px">Scatter Plot</div>
                                 
                                <!--Grouping for Mutation analysis -->
                                <div class="col-md-12 title group-div" style="margin-top:15px;display:none">Groups <font style="text-transform:lowercase;font-size:65%;color:#929292">(optional)</font>
                                    <button type="button" class="btn btn-default btn-xs question"><i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                        <span id="question-group" class="question-tooltip" style="width: 175px;height: 80px;left: 95%;">Add up to 6 groups to<br>compare group means<br>or skip this and compare<br>individual samples</span>
                                    </button>
                                </div>
                                <div class="col-md-10 group-div" style="margin-top:10px;display:none">
                                    <select class="selectpicker" id="groups" data-style="btn-default" title="Create Groups" data-width="160px">
                                    </select>
                                </div>
                                <!--button to remove group -->
                                <div class="col-md-2 group-div" style="margin-top:10px;text-align:right;display:none">
                                    <button id="removegroup" type="button" class="btn btn-default btn-xs question" style="padding: 5px 0 3px;font-size: 20px;"><i class="fa fa-times-circle-o" aria-hidden="true"></i>
                                        <span id="question-remove"class="question-tooltip" style="width: 110px;height: 40px;left: 105%;">Click to remove<br> selected group</span>
                                    </button>
                                </div>
                                
                                <!--Folders to select data -->
                                <div class="col-md-12 title" style="margin-top:15px;" id="hihi">
                                    Select Data
                                </div>
                                <div class="col-md-12" style="margin-top:10px;">
                                    <select class="selectpicker" id="folders" data-style="btn-default" title="Pick dataset" data-width="175px" >
                                    </select>
                                </div>
                                <!--SubFolders to select data -->
                                <div class="col-md-12" style="margin-top:10px;display:none" id="subfolders-div">
                                    <select class="selectpicker" id="subfolders" data-style="btn-default" title="Pick subset" data-width="175px" >
                                    </select>
                                </div>
                                <!--Select data -->
                                <div class="col-md-12" style="margin-top:10px;">
                                    <select class="selectpicker" MULTIPLE id="files" data-style="btn-default" title="Pick samples" data-width="175px" data-actions-box="true" data-selected-text-format="static">
                                    </select>
                                </div>
                                <!--box to store selected data --> 
                                <div class="col-md-12 selectionbox" style="margin-top:10px;display:none" id="selected-sample_div">
                                    <form id="form1">
                                        <select name="file_list" SIZE="4" class="selectionlist" MULTIPLE   id="selected-sample" style="width: 175px;font-size: 14px">
                                        </select>
                                    </form>
                                </div>
                                <!--buttons to edit selected data -->
                                <div class="col-md-12" style="text-align:right;display:none">
                                    <button id = "delete-selected" class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>     Remove
                                    </button>
                                    <button id = "clear-all" class="btn btn-xs btn-danger">
                                        <span class="glyphicon glyphicon-trash" aria-hidden="true">
                                        </span> 
                                        Clear
                                    </button>
                                </div>
                                <!--warning area -->
                                <div class="col-md-12" id="warning" style="margin-top:10px">
                                </div>
                                <div style="display:none" class="col-md-12" id="groupwarning" style="margin-top:10px">
                                    <font color = "red">No more than 6 groups!</font>
                                </div>
                                <!--the GO button -->
                                <div class="col-md-12" style="margin-top:10px;text-align: center;display:none">
                                    <button id = "compareButton" class="btn btn-success">Compare</button>
                                </div>
                                <!-- Browse button -->
                                <div class="col-md-12" style="margin-top:5px;text-align:left;display:">
                                    <button id = "delete-selected" class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Browse
                                    </button>
                                    <button id = "clear-all" class="btn btn-xs btn-danger">
                                        Browse in new tab
                                    </button>
                                </div>
                                <div id="sidebar" style="margin-top:0px;">
                                </div>
                            </div>
                                
                        </div>
                        <div class="col-md-10">
                            <div id = "svgs-all" class="col-md-12">
                            </div>   
                        </div>
                    </div>
                </div>
            </div>        

    <script data-my_var_1="<?php echo $id; ?>" data-my_var_2="./data/links.json" src="js/App.js"></script>
        <script type='text/javascript'>
            var file_directory = <?php echo json_encode($rows); ?>;
        </script>
        <script src="./js/mainjs.js"></script>
        <script>   
            App.init();
        </script>
        
        
    </body>
</html>
