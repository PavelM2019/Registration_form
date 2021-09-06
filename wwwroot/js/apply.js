
jQuery(function ($) {

    $(".pay_bz").on('click', function () {
        //alert('dd');
        $(".bz_note").show();
        $(".payonline").hide();
        //css('display', 'block');
        //saveTime($(this), $(this).val(), null);
    });

    $(".pay_nl").on('click', function () {
        //alert('dd');
        $(".bz_note").hide();
        $(".payonline").show();
        //css('display', 'block');
        //saveTime($(this), $(this).val(), null);
    });

    $(".grp_stud").on('click', function () {
        if (this.checked) {
            $('.all-groups-ls').prop('disabled', false);
            $(".ind-info").hide();
        }
    });

    $('.all-groups-ls').on('change', function () {
        //$(this).val();
        //$('.apply-f-discount').text();

    });


    $(".ind_stud").on('change', function () {

        if (this.checked) {
            $('.all-groups-ls').prop('disabled', true);
            $(".ind-info").show('slow');
        }
//                alert('dd');
        //console.log($('#AllGroups'));
        //$(".payonline").hide();
        //css('display', 'block');
        //saveTime($(this), $(this).val(), null);
    });

    
    $('.apply-courses-select').on('change', function () {
//    $('#Program').on('change', function () {
        loadCourseGroups($(this));
        
    });


    //        $('#AllGroups').live('change', function() {
    //            id = $("#Program :selected").val();
    //            query = 'type=get-group-info&id=' + id;
    //        
    //            $.ajax({
    //                type: 'POST',
    //                url: '/tools/ajax-handler.php',
    //                data: query,
    //                dataType: "json",
    //                success: function(data)
    //                {
    //                    if(data && data != '' && data.gr != '')
    //                        $('#AllGroups').html(data.gr);
    //                }
    //            });
    //        });

    $(".add_stud").on('click', function () {
        var name = $('.appl-name').clone();
        var phone = $('.appl-phone').clone();

        //name.after(phone);

        //$('.appl-phone').after(name);        
        //$(name).after(phone);        

        return false;
    });
    
    
    $(".enable-indiv-only").ready(function($){
        if($(".enable-indiv-only").length){
            $('.ind_stud').prop('checked', true);
            $('.all-groups-ls, .grp_stud').prop('disabled', true);
            $(".ind-info").show();
        }
    });
    
    $(".enable-grs-only").ready(function($){
        if($(".enable-grs-only").length){
            $('.ind_stud').prop('checked', false);
            $('.grp_stud').prop('checked', true);
            $('.all-groups-ls, .grp_stud').prop('disabled', false);
            $(".ind-info").hide();
    }
    });
    
    $('.applay-phone').focus(function(){
        //$(this).val('0');
        //$(this).trigger({type: 'keypress', which: 13, keyCode: 13});
        //console.log('f');
    });
    
    $(".add-friend-btn").on('click', function () {
        
        if($(this).data('state')){
            $(this).text('Скрыть форму Х');
            $('.friend-cls-block').show('slow');
            $(this).data('state', false);
        }else{
            $(this).text('Добавить друга +1');
            $('.friend-cls-block').hide('slow');
            $(this).data('state', true);
        }
        
    });
    
    

});
//<![CDATA[
// array of possible countries in the same order as they appear in the country selection list


$('.applay-phone').mask('+38 (000) 000-00-00');


function loadCourseGroups(this_pointer){
    
    var id = this_pointer ? this_pointer.val() : $("#Program :selected").val();

    //console.log('loadCourseGroups: ' + id);

    var query = 'type=get-groups&id=' + id;

    if (id != 'empty')
        $('.course-pic').attr('src', '/programs/img/' + id + '.png');

    $('#AllGroups').html('<option value="0" >Загрузка...</option>');

    $.ajax({
        type: 'POST',
        url: '/tools/ajax-handler.php',
        data: query,
        dataType: "json",
        success: function (data)
        {
            if (data && data != '' && data.gr != '') {
                
                $('#AllGroups').html(data.gr);

                
                //return;
//                if (data.has_grs) {
//                    console.log(data.has_grs);
//                    
//                    $('.grp_stud').prop('disabled', true);
//                    //$('#ind').prop('checked', true);
//                    $('.all-groups-ls').prop('disabled', true);
//                    //$(".ind-info").show('slow');
//                }
            }
        }
    });    
}



/*        var coursesLists = new Array()
 *   coursesLists["empty"] = ["Select a C"];
 * coursesLists["Nor"] = ["C", "Us", "M"];
 *
 * courseChange() is called from the onchange event of a select element.
 * param selectObj - the select object which fired the on change event.
 */
function courseChange1(selectObj) {
    // get the index of the selected option
    var idx = selectObj.selectedIndex;
    // get the value of the selected option


    var which = selectObj.options[idx].value;
    // use the selected option value to retrieve the list of items from the coursesLists array
    cList = coursesLists[which];
    // get the course select element via its known id
    var cSelect = document.getElementById("AllGroups");
    // remove the current options from the course select

    var len = cSelect.options.length;
    while (cSelect.options.length > 0) {
        cSelect.remove(0);
    }


    var newOption;
    // create new options
    for (var i = 0; i < cList.length; i++) {
        newOption = document.createElement("option");
        newOption.value = cList[i];  // assumes option string and value are the same
        newOption.text = cList[i];

        // add the new option
        try {
            cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE
        }
        catch (e) {
            cSelect.appendChild(newOption);
        }
    }

}

function eventTrigger(e) {
    if (!e)
        e = event;

    alert(e.target.value + ' ' + e.srcElement + ' ');
    return e.target || e.srcElement;
}

function radioClick(e) {
    //var obj = eventTrigger(e);
    var notify = document.getElementById && document.getElementById('AllGroups');
    if (notify)
        notify.disabled = (e.target.value == 'Group') ? false : true;// value = 'You clicked on ' + obj.value;
    return true;
}

function radioClickPay(e) {
    //var obj = eventTrigger(e);
    //alert("dd");


    var notify = document.getElementById && document.getElementById('AllGroups');
    if (notify)
        notify.show = (e.target.value == 'Group') ? false : true;// value = 'You clicked on ' + obj.value;


    return true;
}

// not used
function blur_error(div_id, input_id)
{
    var obj_len = document.getElementById(input_id).value.length;
    var obj_error = document.getElementById(div_id);

    if (obj_len == 0)
        obj_error.style.visibility = "visible";
    else
        obj_error.style.visibility = "hidden";
}

function validate_form(thisform)
{
    with (thisform)
    {
        if (validate_required(email, "Email must be filled out!") == false)
        {
            email.focus();
            return false;
        }
    }
}


function validate_required(field, alerttxt)
{
    with (field)
    {
        if (value == null || value == "")
        {
            jQuery(alerttxt).show();
            return false;
        }
        else
        {
            jQuery(alerttxt).hide();
            return true;
        }
    }
}


function validate_required_phone(field, alerttxt)
{
    with (field)
    {
        if (value == null || value == "" || value.replace(/[^0-9]/g, "").length < 5)
        {
            jQuery(alerttxt).show();
            return false;
        }
        else
        {
            jQuery(alerttxt).hide();
            return true;
        }
    }
}



function validate_lb(field, alerttxt)
{
    with (field)
    {
        if (value == null || value == "0" || value == "empty")
        {
            jQuery(alerttxt).show();
            return false;
        }
        else if (!disabled && value == "0")
        {
            jQuery(alerttxt).show();
            return false;
        }
        else{
            jQuery(alerttxt).hide();
            return true;
        }
    }
}

function validate_lb2(field, alerttxt)
{
        with (field)
    {
        //console.log(this);
        
        if (!disabled)
        {
            alert(alerttxt);
            return false;
        }
        else
            return true;
    }
}

function validate_email(field, alerttxt)
{
    with (field)
    {
        apos = value.indexOf("@");
        dotpos = value.lastIndexOf(".");
        if (apos < 1 || dotpos - apos < 2) {
            alert(alerttxt);
            return false;
        }
        else {
            return true;
        }
    }
}

function validate_adding(field1, field2, alerttxt)
{
    if (field1.value == null || field1.value == "0" || field1.value != field2.value)
    {
        alert(alerttxt);
        return false;
    }

    return true;
}

function validate_chekbox(field1, alerttxt)
{
    with (field) {
        if (value == null || value == false)
        {
            alert(alerttxt);
            return false;
        }
    }

    return true;
}

function validate_form(thisform)
{
    
    console.log(thisform);
    
    with (thisform)
    {

//        if (validate_lb2(Program, "Выберите, пожалуйста, уровень курса обучения!") == false) {
//            Program.focus();
//            return false;
//        }


        if (validate_required(FirstName, '.applay-err-name-1') == false) {
            FirstName.focus();
            return false;
        }
        
        if (validate_required(LastName, '.applay-err-name-2') == false) {
            LastName.focus();
            return false;
        }

        if (validate_required_phone(Phone, '.applay-err-phone') == false) {
            Phone.focus();
            return false;
        }
        
        if (validate_required(Email, '.applay-err-email') == false) {
            Email.focus();
            return false;
        }

        
        //"Выберите, пожалуйста, курс обучения!"
        if (validate_lb(Program, '.applay-err-program' ) == false) {
            Program.focus();
            return false;
        }

        //debugger;
        //"Выберите, пожалуйста, группу!"
        if (!AllGroups.disabled)
            if (validate_lb(AllGroups, '.applay-err-group') == false) {
                AllGroups.focus();
                return false;
            }

        if (!jQuery('.form-company-tr:hidden').is(':hidden') && validate_required(Company, '.applay-err-company') == false) {
            Company.focus();
            return false;
        }

        var googleResponse = jQuery('#g-recaptcha-response').val();
        
        if (!googleResponse && !jQuery('#is-local-host').length) {
            $('.error-captcha').show();
            return false;
        } else {
            $('.error-captcha').hide();
            return true;
        }
        

//        if (validate_checkbox(IndOff, "Укажите филиал!") == false) {
//            Private.focus();
//            return false;
//        }


//        if (validate_checkbox(Private, "Подтвердите согласие!") == false) {
//            Private.focus();
//            return false;
//        }

        //            if (validate_adding(Adding, AddRes, "Ответ на вопрос неверный!") == false) {
        //                Adding.focus();
        //                return false;
        //            }
    }
}

function saveuser() {
    alert('fffgfg');
}

function onSubmitAppl(token) {
   
   //grecaptcha.execute();
   console.log('aaaa');
   
   document.getElementById("CommonRequestForm").submit();
   
 }

function validate_recaptcha1(event) {
    
    event.preventDefault();
    
    if (!document.getElementById('field').value) {
        alert("You must add text to the required field");
    } else {
        grecaptcha.execute();
    }
}

function onload_recaptcha1() {
    var element = document.getElementById('submit');
    element.onclick = validate_recaptcha;
}

//]]>