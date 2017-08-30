$(document).ready(function(){
      
var selected = "#selected-sample";
var organisms = [],
    htmltext = "";
    
$.each(file_directory, function(i,file) {
    organism = file.organism;
    if (organisms.indexOf(organism) === -1) organisms.push(organism);
});

organisms.forEach(function(item,index){
    htmltext = htmltext+'<option value=\"'+item+'\">'+item+'</option>';
})

$("#organisms").html(htmltext);
$('#organisms').selectpicker('refresh');

$("#groups").on('change',function(){
    updateGroups();
}); 
    
$("#organisms").on('change',function(){
    updateFolder();
    //Need to remove all groups ;
    //and all selectionboxes of all groups (except selected-sample)
    //and all selection at selected-sample
    //and refresh all #files selection
}); 
    
$("#folders").on('change',function(){
   updateSubfolder();
}); 
    
$("#subfolders").on('change',function(){
   updateFiles($("#subfolders option:selected").text(),true);
}); 
    
$("#files").on('change',function(){
    updateSelection();
});

function updateFiles(selected_folder,subfolder_exist){
    
    htmltext = "";
    $.each(file_directory, function(i,file) {
        folder = file.folder;
        subfolder = file.subfolder;
        sampleID = file.sampleID;
        if ((subfolder_exist == false && folder == selected_folder) || (subfolder_exist == true && subfolder == selected_folder)){
            htmltext = htmltext+'<option value=\"'+sampleID+'\">'+sampleID+'</option>';
        };
    });
    
    $("#files").html(htmltext);
    $('#files').selectpicker('refresh');
    $.each($(selected+" option"), function(){
        var value = $(this).val();
        $('#files').find('[value="'+value+'"]').prop('selected',true);
        $('#files').selectpicker('refresh');
    });
}    

function updateFolder(){
    
    var selected_organism = $("#organisms option:selected").text();
    var folders = [];
    
    $.each(file_directory, function(i,file) {
        organism = file.organism;
        if (organism == selected_organism){
            folder = file.folder;
            if (folders.indexOf(folder) === -1) folders.push(folder);
        };
    });
    
    htmltext = ""
    folders.forEach(function(item,index){
        htmltext = htmltext+'<option value=\"'+item+'\">'+item+'</option>';
    })
    
    $("#folders").html(htmltext);
    $('#folders').selectpicker('refresh');
    
}

function updateSubfolder(){
        
    var selected_folder = $("#folders option:selected").text();
    var subfolders = [];
    
    $.each(file_directory, function(i,file) {
        folder = file.folder;
        if (folder == selected_folder){
            subfolder = file.subfolder;
            if (subfolders.indexOf(subfolder) === -1 && subfolder != "") subfolders.push(subfolder);
        };
    });
    
    if (subfolders.length == 0) {
        document.getElementById("subfolders-div").style.display="none";
        updateFiles(selected_folder,false);
    }
    else{
        
        htmltext = ""
        subfolders.forEach(function(item,index){
            htmltext = htmltext+'<option value=\"'+item+'\">'+item+'</option>';
        })
        
        document.getElementById("subfolders-div").style.display="";
        $("#subfolders").html(htmltext);
        $('#subfolders').selectpicker('refresh');
        updateFiles(selected_folder,true);
    }
}

function updateSelection() {
    
    $.each($("#files option:not(:selected)"), function(){
        var value = $(this).val();
        $(selected).find('[value="'+value+'"]').remove();
    });
    
    $.each($("#files option:selected"), function(){
        var value = $(this).val();
        if (!($(selected+' option[value="'+value+'"]').length>0)){
            $(selected).append($('<option>', { 
                value: $(this).val(),
                text : $(this).text() 
            }));
        }
    });
    
    issueWarning();

}

function updateGroups(){
    
    $('#files').selectpicker('deselectAll');
    
    selected = "#"+$("#groups option:selected").val();
    if (selected == "#") selected = "#selected-sample";
    
    $( ".selectionbox" ).css('display','none');
    selected_div = selected+"_div"
    $( selected_div ).css('display','');
    
    $.each($(selected+" option"), function(){
        var value = $(this).val();
        $('#files').find('[value="'+value+'"]').prop('selected',true);
        $('#files').selectpicker('refresh');
    });

}

$('#delete-selected').click(function(){
    
    $.each($(selected+" option:selected"), function(){
        var value = $(this).val(); $('#files').find('[value="'+value+'"]').prop('selected',false);
        $('#files').selectpicker('refresh');
    });
    $(selected+' option:selected').remove();
    
    issueWarning();
    
});

$('#clear-all').click(function(){
    
    $('#files').selectpicker('deselectAll');
    $('#files').selectpicker('refresh');
    $(selected).empty();
    
    issueWarning();

});

$('.group-div').click(function(){
    
    issueWarning();

});
    
function issueWarning(){
    
    var selected = $("#groups option:selected").val();
    if (selected == "") {
		selected = 'selected-sample';
    }
    
    if (selected == "selected-sample" && $('#selected-sample').find('option').length > 6 && flag == "SP")
        document.getElementById('warning').innerHTML="<font color=\"red\">No more than 6 samples!";
    else if (selected == "selected-sample" && $('#selected-sample').find('option').length > 100 && flag == "heatmap")
        document.getElementById('warning').innerHTML="<font color=\"red\">No more than 100 samples!";
    else
        document.getElementById('warning').innerHTML="";
}

var content = "<input type='text' id='groupinput' class='bss-input' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event)' onClick='event.stopPropagation()' placeholder='Add item'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event)'></span>";

var divider = $('<option/>')
      .addClass('divider')
      .data('divider', true);


var addoption = $('<option/>', {class: 'addItem'})
      .data('content', content)

$('#groups')
      .append(divider)
      .append(addoption)
      .selectpicker();

    
addSelectItem = function(t,ev)
{
    
    ev.stopPropagation();

    var oplength = $('#groups > option').length - 2;

    if (oplength > 6){
        ev.preventDefault();
        $( "#groupwarning" ).fadeIn( 300 ).delay( 400 ).fadeOut( 300 );
        return;
    }
    var txt=$(t).prev().val().replace(/[^a-z0-9]/gi,"");
    if ($.trim(txt)=='') return;
    
    //Add option to list
    var p=$(t).closest('.bootstrap-select').prev();
    var o=$('option', p).eq(-3);
    o.before( $("<option>", { "selected": true, "text": txt, "value": txt}) );
    p.selectpicker('refresh');
    

    //Add select box
    var divid = txt+"_div"
    $("#selected-sample_div").after($("<div>", { "class": "col-md-12 selectionbox", "style": "margin-top:10px", "id": divid}));
    document.getElementById(divid).innerHTML="<form><select name='file_list' SIZE='4' class='group_selection selectionlist' MULTIPLE id='"+txt+"' style='width: 175px;font-size: 14px'></select></form>"
    
    updateGroups();
    
}
 
addSelectInpKeyPress = function(t,ev)
{
   ev.stopPropagation();
 
   // do not allow pipe character
   if (ev.which==124) ev.preventDefault();
    
    if (ev.which==32) ev.preventDefault();
 
   // enter character adds the option
   if (ev.which==13)
   {
      ev.preventDefault();
      addSelectItem($(t).next(),ev);
   }
}


$("#removegroup").click(function(){
    
    selected = $("#groups option:selected").val();
    $('#groups').find('[value="'+selected+'"]').remove();
    selected = "#"+selected;
    $('#groups').selectpicker('refresh');
    
    selected_div = selected+"_div"
    $(selected_div).remove();
    
    updateGroups();
})



$('.selectpicker').selectpicker({
    dropupAuto: false
});

});


    
