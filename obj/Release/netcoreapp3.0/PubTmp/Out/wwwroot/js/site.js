// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('btn').disabled = true;
    document.getElementById('tnumber').value = 1;
});
var counter = 1;
$(function () {

    $('#addButton').click(function () {
        $('<tr id="tablerow' + counter + '"><td>' +
            '<input class="text-box single-line" name="ClientName[' + counter + ']" type="text" value="" required="required" style="width: 250px;"/>' +
            '</td>' +
            '<td>' +
            '<div class="editor-field">'+
            '<input class="applay-phone" name="KlientPhone[' + counter + ']" type="text" placeholder="+38 (___) ___-__-__"   required />' +
            '</div>' +
            '</td>' +
            '<td>' +
            '<select class="TextInputControl apply-courses-select" name="transfer[' + counter + ']" id="transfer">'+
                    '<option selected="foot" value="1">Своїм ходом</option>'+
                    '<option value="bus">&nbsp;&nbsp;Автобус із Києва</option>'+
                '</select>' +
             '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-primary" onclick="removeTr(' + counter + ');">Delete</button>' +
            '</td>' +
            '</tr>').appendTo('#clientTable');
        counter++;
        $(".number-tourists")[0].value = clientTable.tBodies[0].rows.length;
        $(".FIO").change();
        $(".applay-phone").change();
        return false;
    });

});

$(function () {

    $('#addButtongrill').click(function () {
        $('<tr id="table2row' + counter + '"><td>' +
            '<select class="grill_menu_select" name="grill_menu[' + counter + ']" id="grill_menu' + counter + '" style="width: 220px;">'+
            '<option selected="" value="0"></option>'+
            '<option value="1">&nbsp;&nbsp;шашлик зі свинини</option>' +
            '<option value="2">&nbsp;&nbsp;курячі крильця</option>' +
            ' <option value="3">&nbsp;&nbsp;ковбаски-гриль</option>' +
            ' <option value="4">&nbsp;&nbsp;лаваш з сиром сулугуні</option>' +
            ' <option value="5">&nbsp;&nbsp;овочі-гриль</option>' +
            ' </select>' +
            '</td>' +
            '<td>' +
            '<div class="editor-field">' +
            '<input type="number" id="grill_number" name="grill_number[' + counter + ']" style="height: 25px;width: 50px; " />' +
            '</div>' +
            '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-primary" onclick="removeBt(' + counter + ');" style="font-weight: bold;">Х</button>' +
            '</td>' +
            '</tr>').appendTo('#grill_menu_Table');
        counter++;
        $(".number-tourists")[0].value = clientTable.tBodies[0].rows.length;
        $(".FIO").change();
        $(".applay-phone").change();
        return false;
    });

});

$(function () {

    $('#SkiPassButton').click(function () {

        $(".number-tourists")[0].value = clientTable.tBodies[0].rows.length;
        var linkGoogleDock = "https://docs.google.com/forms/d/e/1FAIpQLSct0eKLH1OFdILdKefOo034BBVG1Eu3uFpOYBDlS4Urn3P-FA/viewform";
        var FIO = $(".FIO")[0].value + ' ' + $(".FIO")[1].value + ' ' + $(".FIO")[2].value;
        var FIOclient = "";
        var Tel   = "";
        var textFIO = "";
        var Tourdate = $(".startDate")[0].value;

        var countertour = $(".number-tourists").val();
        var counter = 1;

   

        for (let i = counter; i <= countertour; i++) {

            var Cpvalue = clientTable.rows[counter].cells[6].getElementsByTagName("input")[0].checked;
            if (Cpvalue == true) {
                var point = (i != countertour) ? (", ") : (".");

                FIOclient += clientTable.rows[counter].cells[0].getElementsByTagName("input")[0].value + point;

                Tel += clientTable.rows[counter].cells[1].getElementsByTagName("input")[0].value + point;
            }
                counter++;
                // alert(i);
                //i++;
        }


        if (FIOclient != "") {

            textFIO = "&entry.2092238618=" + FIOclient;

        }

        if (Tel != "")  {

            textFIO = textFIO + "&entry.1556369182=" + Tel;

        }

        if (Tourdate != "") {

            textFIO = textFIO + "&entry.1471822885=" + Tourdate;

        }

        window.open(linkGoogleDock + '?entry.213614699=' + FIO + textFIO, "_blank"); 
        return false;
    });

});



$(".number-tourists").change(function () {



    var countertour = $(".number-tourists").val();
    countertour     = Number(countertour)-1;
    var counter = clientTable.tBodies[0].rows.length-1;

    if (countertour > counter) {

        for (let i = counter; i < countertour; i++) {
            let ccounter = counter + 1;
            $('<tr id="tablerow' + ccounter + '"><td>' +
                '<input class="text-box single-line" name="ClientName[' + ccounter + ']" type="text" value="" required="required" style="width: 250px;"/>' +
                '</td>' +
                '<td>' +
                '<input class="applay-phone" name="KlientPhone[' + ccounter  + ']" type="text" placeholder="+38 (___) ___-__-__"   required />' +
                '</td>' +
                '<td>' +
                '<select class="TextInputControl apply-courses-select" name="transfer[' + counter + ']" id="transfer">' +
                '<option selected="" value="foot">Своїм ходом</option>' +
                '<option value="bus">&nbsp;&nbsp;Автобус із Києва</option>' +
                '</select>' +
                '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-primary" onclick="removeTr(' + ccounter  + ');">Delete</button>' +
                '</td>' +
                '</tr>').appendTo('#clientTable');
            counter++;
        }
    }
    else {
        for (let i = counter; i > countertour; i--) {
            //let g = (i == 0) ? 1 : i;
            $('#tablerow' + i).remove();
        }
    }

    $(".FIO").change();
    $(".applay-phone").change();
});


function removeTr(index) {
    if (index >= 1) {
        $('#tablerow' + index).remove();
        counter--;
    }
    $(".number-tourists")[0].value = clientTable.tBodies[0].rows.length;
    return false;
}



function skipassTr(index) {


    $(".number-tourists")[0].value = clientTable.tBodies[0].rows.length;
    var linkGoogleDock = "https://docs.google.com/forms/d/e/1FAIpQLSct0eKLH1OFdILdKefOo034BBVG1Eu3uFpOYBDlS4Urn3P-FA/viewform";
    var FIO = $(".FIO")[0].value + ' ' + $(".FIO")[1].value + ' ' + $(".FIO")[2].value;
    var FIOclient = clientTable.rows[index + 1].cells[0].getElementsByTagName("input")[0].value;
    var Tel = Phone.value;
    var textFIO = "";
    var Tourdate = $(".startDate")[0].value;


    if (FIOclient != "") {

        textFIO = "&entry.2092238618=" + FIOclient;

    }

    if ((Tel != "") && (index==0)) {

        textFIO = textFIO+ "&entry.1556369182=" + Tel;

    }

    if (Tourdate != "") {

        textFIO = textFIO + "&entry.1471822885=" + Tourdate;

    }

    window.open(linkGoogleDock + '?entry.213614699=' + FIO + textFIO, "_blank"); 
   
    return false;
}



$(".FIO").change(function () {
    var FIO = $(".FIO")[0].value + ' ' + $(".FIO")[1].value + ' ' + $(".FIO")[2].value;
    FIO = '<tr id="tablerow0"><td>' +
        '<input class="text-box single-line" name="ClientName[0]" type="FIO" value="' + FIO + '" required="required" style="width: 250px;"/>' +
        '</td>';
    clientTable.rows[1].cells[0].innerHTML = FIO;
  });

$(".applay-phone").change(function () {
    var tel = $(".applay-phone")[0].value;
    tel = '<tr id="tablerow0"><td>' +
        '<input class="applay-phone" name="KlientPhone[0]" type="FIO" value="' + tel + '" required="required" />' +
        '</td>';
    clientTable.rows[1].cells[1].innerHTML = tel;
});


function removeBt(index) {
    if (counter > 1) {
        $('#table2row' + index).remove();
        counter--;
    }
    $(".number-rooms")[0].value = clientTable.tBodies[0].rows.length;
    return false;
}

$(".grill_menu_select").change(function (index) {

    document.getElementById('grill_number').value = 1;
  
});


$('#grill_menu_Table').on('change', '.grill_menu_select', function (index) {
    //alert('the  element changed!');
    ////$('#table2row' + counter)
    ////$(this).parent().parent('tr').find('td:last').html($(this).parent().parent('tr').find('.myprice').html() * $(this).val());
    ////$(this).parent().parent('tr')[0]
    //let tek_id = 'grill_number' + counter + '';
    $(this).parent().parent('tr')[0].getElementsByTagName("input")[0].value = 1;

    //for (var i = 0, l = grill_menu_Table.length; i < l; i++) {
    //    var row = tableRows[i];
    //    alert(row)$
    //    //...
    //}
});



function AddToBase() {

    var FIOclient = "";


    var countertour = $(".number-tourists").val();
    var counter = 1;



    for (let i = counter; i <= countertour; i++) {

        var point = (i != countertour) ? (", ") : (" ");
            var Tel = clientTable.rows[counter].cells[1].getElementsByTagName("input")[0].value;
            var TourFIO = clientTable.rows[counter].cells[0].getElementsByTagName("input")[0].value;
            var transport = clientTable.rows[counter].cells[2].getElementsByTagName("select")[0].value;
        FIOclient += TourFIO  + "tel" + Tel + "transport" +"_"+ transport+ point;
       
        counter++;
        // alert(i);
        //i++;
    }

    document.getElementById('Datatoserver').value = FIOclient;

    document.getElementById('pasportFio').value = document.getElementById('restplace').value;

    var grilldata = "";
    var grillenght =  $('#grill_menu_Table tr').length;
    for (let i = 1; i < grillenght; i++) {

 
        grilldata += grill_menu_Table.rows[i].cells[0].getElementsByTagName("select")[0].value + "number" +
            + grill_menu_Table.rows[i].cells[1].getElementsByTagName("input")[0].value + ";";

        //counter++;
        // alert(i);
        //i++;
    }



    document.getElementById("Data2").value = grilldata;

    //grecaptcha.render('html_element', {
    //    'sitekey': '6LfkMd4ZAAAAAFv0v3bWeKJePJ6cjRpx0NIU2vSu'
    //});

}
var onloadCallback = function () {
    grecaptcha.render('html_element', {
        'sitekey': '6LfkMd4ZAAAAAFv0v3bWeKJePJ6cjRpx0NIU2vSu'
    });
    

};

var imNotARobot = function () {
    var captcha = grecaptcha.getResponse();
    if (!captcha.length) {

        return false;
    } else {
        document.getElementById('btn').disabled = false;
    }
};