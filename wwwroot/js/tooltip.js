$(function(){

    var hideDelay = 500;
    var hideTimer = null;

    var headerPos = 0;
    var headerPointer = null;
    var categoryFirst = null;

    //return;

    // One instance that's reused to show info for the current person
    var container = $('<div id="personPopupContainer">'
        + '<table width="" border="0" cellspacing="0" cellpadding="0" align="center" class="personPopupPopup">'
        + '<tr>'
        + '   <td class="corner topLeft"></td>'
        + '   <td class="top"></td>'
        + '   <td class="corner topRight"></td>'
        + '</tr>'
        + '<tr>'
        + '   <td class="left">&nbsp;</td>'
        + '   <td class="tooltip"><div id="personPopupContent"></div></td>'
        + '   <td class="right">&nbsp;</td>'
        + '</tr>'
        + '<tr>'
        + '   <td class="corner bottomLeft">&nbsp;</td>'
        + '   <td class="bottom">&nbsp;</td>'
        + '   <td class="corner bottomRight"></td>'
        + '</tr>'
        + '</table>'
        + '</div>');

    $('body').append(container);

    $('.personPopupTrigger').mouseover(function()
    {
        // format of 'rel' tag: pageid,personguid
        var text = $(this).attr('mytitle');

        // If no guid in url rel tag, don't popup blank
        if (text == '')
            return;

        if (hideTimer)
            clearTimeout(hideTimer);

        var pos = $(this).offset();
        var width = $(this).width();
        container.css({
            left: (pos.left + width) + 'px',
            top: pos.top - 5 + 'px'
        });

        $('#personPopupContent').html('&nbsp;');

        //      alert(pageID);

        $('#personPopupContent').html('<span class="tooltip">' + text + '</span>');

        $(this).attr('src', '/images/question_mini_h.png');
        container.css('display', 'block');
    });

    $('.personPopupTrigger').mouseout(function()
    {
        $(this).attr('src', '/images/question_mini.png');
        if (hideTimer)
            clearTimeout(hideTimer);
        hideTimer = setTimeout(function()
        {
            container.css('display', 'none');
        }, hideDelay);
    });

    $('.ajaxPopup').mouseover(function()
    {
        // format of 'rel' tag: pageid,personguid
        var text = $(this).attr('mytitle');
        var type = $(this).attr('type');
        var groups = $(this).attr('groups');
        var fullname = $(this).attr('fullname');

        // If no guid in url rel tag, don't popup blank
        if (text == '')
            return;

        if (hideTimer)
            clearTimeout(hideTimer);

        var pos = $(this).offset();
        var width = $(this).width();
        container.css({
            left: (pos.left + width) + 'px',
            top: pos.top - 5 + 'px'
        });

        $('#personPopupContent').html('&nbsp;');

        var show = true;
        var handler = '';
        var query = '';
        var query_type = 'GET';

        switch(type){

            case 'teacher': {
                handler = '/teachers/tooltip.php'
                query = 'name=' + text+'&fullname=' + fullname;
            }
            break;
            case 'office':  {
                handler = '/contacts/tooltip.php';
                query = 'office=' + text;
            }
            break;
            case 'course':  {
                query_type ='POST';
                handler = '/tools/ajax-handler.php';
                query = 'type=course&course=' + text+'&groups=' + groups;
            }
            break;
        }

        if(handler != ''){
            $.ajax({
                type: query_type,
                url: handler,
                data: query,
                success: function(data)
                {
                    //alert(text2);
                    if(data == '')
                        show = false;
                    else
                        $('#personPopupContent').html(data);
                }
            });
        }


        if(show)
            container.css('display', 'block');
    });

    $('.ajaxPopup').mouseout(function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
        hideTimer = setTimeout(function()
        {
            container.css('display', 'none');
        }, hideDelay);
    });


    // Allow mouse over of details without hiding details
    $('#personPopupContainer').mouseover(function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
    });

    // Hide after mouseout
    $('#personPopupContainer').mouseout(function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
        hideTimer = setTimeout(function()
        {
            container.css('display', 'none');
        }, hideDelay);
    });


    $('.bubbleInfo').each(function () {
        var distance = 10;
        var time = 250;
        var hideDelay = 500;

        var hideDelayTimer = null;

        var beingShown = false;
        var shown = false;
        var trigger = $('.trigger', this);
        var info = $('.popup', this).css('opacity', 0);


        $([trigger.get(0), info.get(0)]).mouseover(function () {
            if (hideDelayTimer) clearTimeout(hideDelayTimer);
            if (beingShown || shown) {
                // don't trigger the animation again
                return;
            } else {
                // reset position of info box
                beingShown = true;

                info.css({
                    top: -90,
                    left: -33,
                    display: 'block'
                }).animate({
                    top: '-=' + distance + 'px',
                    opacity: 1
                }, time, 'swing', function() {
                    beingShown = false;
                    shown = true;
                });
            }

            return false;
        }).mouseout(function () {
            if (hideDelayTimer) clearTimeout(hideDelayTimer);
            hideDelayTimer = setTimeout(function () {
                hideDelayTimer = null;
                info.animate({
                    top: '-=' + distance + 'px',
                    opacity: 0
                }, time, 'swing', function () {
                    shown = false;
                    info.css('display', 'none');
                });

            }, hideDelay);

            return false;
        });
    });

    $('.show_groups').click(function (){

        var course = $(this).attr('course');
        var tagname = '.toggleText-' + course;

        if($(tagname).attr('myshow') == '1'){
            $(tagname).fadeOut("fast");
            $(tagname).attr('myshow', '0');
            $(this).attr('src', '/images/icon_plus.png');
        }
        else{
            $(tagname).fadeIn("slow");
            $(tagname).attr('myshow', '1');
            $(this).attr('src', '/images/icon_minus.png');
        }
    });

    $('.ajaxPopup')
    .mouseover(function (){
        switch($(this).attr('type')){
//                case 'office':
//                    $(this).attr('src', '/images/icon_map_h.png');
//                    break;
//                case 'teacher':
//                    if($(this).attr('src').indexOf('icon_teacher') != -1)
//                        $(this).attr('src', '/images/icon_teacher_h.png');
//                    break;
            case 'course':
                $(this).attr('src', '/images/icon_calendar_h.png');
                break;
        }
    })
    .mouseout(function (){
        switch($(this).attr('type')){
            case 'office':
                $(this).attr('src', '/images/icon_map.png');
                break;
//                case 'teacher':
//                    if($(this).attr('src').indexOf('icon_teacher') != -1)
//                        $(this).attr('src', '/images/icon_teacher.png');
//                    break;
            case 'course':
                $(this).attr('src', '/images/icon_calendar.png');
                break;
        }
    });


    $('.applay-button')
    .mouseover(function (){
        if($(this).attr('src') == '/images/reg-big.gif')
            $(this).attr('src', '/images/reg-big-h.gif');

//            if($(this).attr('src') == '/images/button-sign.png')
//                $(this).attr('src', '/images/button-sign-h.png');
    })
    .mouseout(function (){
        if($(this).attr('src') == '/images/reg-big-h.gif')
            $(this).attr('src', '/images/reg-big.gif');

//            if($(this).attr('src') == '/images/button-sign-h.png')
//                $(this).attr('src', '/images/button-sign.png');
    });


    //        $('.apply-tab').click(function (){
    //            alert('dddddd');
    //        });


    $('.show-text').click(function (){

        var name = $(this).data('name');
        var tagname = '.teacher-cut[data-name="'+name+'"]';

        $(tagname).fadeIn("slow");
        $(this).fadeOut("fast");

    //alert(name);

    /*            $(tagname).filter(function() {
            if($(tagname).data("name") == name ){
                $(this).fadeIn("slow");
                $(th).fadeOut("fast");
            }*/
    });

    $('.tab-1').click(function (){
        switchtab($(this), 1);
    });
    $('.tab-2').click(function (){
        switchtab($(this), 2);
    });
    $('.tab-3').click(function (){
        switchtab($(this), 3);
    });
    $('.tab-4').click(function (){
        switchtab($(this), 4);
    });
    $('.tab-5').click(function (){
        switchtab($(this), 5);
    });
    $('.tab-6').click(function (){
        switchtab($(this), 6);
    });

    function switchtab(pointer, position){
        $('.tabberactive').removeClass('tabberactive');
        pointer.addClass('tabberactive');

        $('.tabbertabshow').removeClass('tabbertabshow').addClass('tabbertabhide');
        $('.tabbody-' + position).addClass('tabbertabshow').removeClass('tabbertabhide');
    }

    jQuery(document).scroll(function($){

        if(headerPointer != null && headerPointer.length > 0){

            //console.log(headerPos + ' ' + jQuery(window).scrollTop());
            /*
            if(headerPos + 400 < jQuery(window).scrollTop())
                setTimeout(function (){
                    headerPointer.addClass('fixed-header');
                }, 100);
            else
                setTimeout(function (){
                    headerPointer.removeClass('fixed-header');
                }, 100);
            */
        }
    });

    jQuery(document).ready(function($){
        headerPointer = $('.payment-header');
        categoryFirst = $('.courses-cost-list');

        if(categoryFirst.length > 0)
            headerPos = categoryFirst.offset().top;
    });


    //------------- menu ------------
    var timeout     = 500;
    var closetimer	= 0;
    var ddmenuitem  = 0;

    function jsddm_open()
    {
        jsddm_canceltimer();
        jsddm_close();
        ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
    }

    function jsddm_close()
    {
        if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
    }

    function jsddm_timer()
    {
        closetimer = window.setTimeout(jsddm_close, timeout);
    }

    function jsddm_canceltimer()
    {
        if(closetimer)

        {
            window.clearTimeout(closetimer);
            closetimer = null;
        }
    }

    $(document).ready(function()
    {
        $('#jsddm > li').bind('mouseover', jsddm_open);
        $('#jsddm > li').bind('mouseout',  jsddm_timer);
    });

    document.onclick = jsddm_close;


    // tabber functionality
    $(".tabber-link").click(function() {

        var uid = $(this).data('uid');

//            $('.tabber-link').removeClass('tabberactive');
//            $(this).addClass('tabberactive');

        var prev_tab = $('.tabberactive');
        prev_tab.removeClass('tabberactive');   // inactive button

        $(this).addClass('tabberactive');       // active button

        //console.log('.tabbody-' + prev_tab.data('uid'));

        //$(this).parent().parent().find
        $('.tabbody-' + prev_tab.data('uid')).addClass('tabbertabhide');               // hide tab
        $(this).parent().parent().find
        $('.tabbody-' + uid).removeClass('tabbertabhide').addClass('tabbertabshow');   // show new tab

        if(uid == 'online')
            $('#apply-form-new').hide();
        else
            $('#apply-form-new').show();

    });

    /*
    $(".tabber-link").click(function() {

        var uid = $(this).data('uid');

        prev_tab = $('.tabberactive');
        prev_tab.removeClass('tabberactive');   // inactive button

        $(this).addClass('tabberactive');       // active button
        $(this).parent().parent().find('.tabbody-' + prev_tab.data('uid')).addClass('tabbertabhide');               // hide tab

        $(this).parent().parent().find('.tabbody-' + uid).removeClass('tabbertabhide').addClass('tabbertabshow');   // show new tab

        if(uid == 'online')
            $('#apply-form-new').hide();
        else
            $('#apply-form-new').show();

    });
    */


    //        $(".feedback-link").on('click', function() {
    //            DISQUS.reset({
    //                reload: true,
    //                config: function () {
    //                    this.page.identifier = "Avdeeva";
    //                    this.page.url = "http://kursor.kiev.ua/teachers/?name='Avdeeva'";
    //                }
    //                });
    //        });

    /* BYV-16 */
    //	Scrolled by user interaction
    if($('div#tch_items').length){
        $('div.list_carousel').show();

        $('div#tch_items').carouFredSel({
            scroll: {
                items: 1,
                pauseOnHover: 'resume'
            },
            auto:{
              play: false
            },
            height: 220,
            // prev: '#prev2', next: '#next2',
            prev: {
                button  : "#prev2",
                key     : "left"
            },
            next: {
                button  : "#next2",
                key     : "right"
            },
            pagination: "#pager2"

        });
    }

    //------ profile ------

    $(document).on('change', '.adm-set-current-month', function () {
        insertParam('month', $(this).val());
    });

    $(document).on('change', '.adm-set-current-year', function () {
        insertParam('year', $(this).val());
    });

    $(document).on('click', '.pr-send-report', function () {

        if(!$('.pr-check-int').prop('checked')) {
            alert('Подтвердите часы сперва!');
            return;
        }

        $('.pr-check-int').hide();
        $('.pr-tch-label').hide();
        $(this).hide();

        var date = $(this).data('date');
        var sum = $(this).data('sum');
        var tch_uid = $('.pr-tch-name').data('id');

        tch_uid = tch_uid + '-' + date;

        $.ajax({
            url:'/tools/ajax-handler.php',
            type:'POST',
            data: 'type=tchreport&uid=' + tch_uid + '&s=' + sum,
            dataType: "json",
            success: function(data){
                alert('Часы успешно поданы!');
            }
        });
    });


    $(document).on('click', '.pr-send-email', function () {

        if($('.pr-send-email-form').length)
            return;

        var pr = $(this).closest('tr');
        var id = $(this).data('id');
        var mode = $(this).data('mode');

        var html_block = '<tr class="pr-send-email-form"><td colspan="100%" style="text-align: center;">' +
            '<p style="color: tomato">Приветсвие не пишем. Оно с именем само автоматически подставится.<br/>' +
            'Чтобы выслать методичские материалы - загрузите их в облaко и сформируйте ссылку. мы рекомендуем использовать Google Drive (Диск)</p>' +

            'Здравствуйте, *Имя*!<br/>' +
            '<textarea class="pf-email-txtarea" rows="5" style="resize: none;"></textarea><br/>' +
            '<button class="pr-send-eml-cancel">Закрыть ❌</button> <button class="pr-send-eml-ok" style="margin-left: 100px" data-mode="'+mode+'" data-id="'+id+'">Отправить ✅</button>' +
            '</td></td>';

        pr.after(html_block);
    });

    $(document).on('click', '.pr-send-eml-cancel', function () {
        $('.pr-send-email-form').remove();
    });

    $(document).on('click', '.pr-send-eml-ok', function () {

        var text = $('.pf-email-txtarea').val();
        var id = $(this).data('id');
        var mode = $(this).data('mode');

        var tch_uid = $('.pr-tch-name').data('id');

        var text_str = text ? text.replace(/\n/g, '<br>') : '';

        if(text && text != '' && text.trim() != '') {

            $.ajax({
                url: '/tools/ajax-handler.php',
                type: 'POST',
                data: 'type=tch-pr-email&uid=' + tch_uid + '&t=' + mode +'&id=' + id + '&txt=' + text_str,
                dataType: "json",
                success: function (data) {
                    alertify.success('Выслано ' + data.res + ' сообщений!');
                }
            });

            $('.pr-send-email-form').remove();

        }else
            alert('Ошибка отправки!')
    });



    $(document).on('click', '.pr-group-del', function () {

        var ok = confirm("Удалить группу?");

        if (ok) {

            var pt = $(this).closest('tr');
            var id = pt.data('id');

            var dt = new Date().toJSON().slice(0, 10);

            if (id)
                saveDBValue('groups', 'group_id', id, 'cancel_date', dt, function (res) {
                    if (res) {
                        alertify.success('Группа удалена!');
                        pt.hide();
                        saveDBValue('groups', 'group_id', id, 'cancel_reas', 'Удаление преподом');
                    } else
                        alertify.error('Возникла ошибка!');
                });
        }

    });

    $(document).on('click', '.pr-show-rowall', function () {

        $('.row').removeClass('hide-row');

        $(this).closest('tr').hide();

    });


    $(document).on('click', '.pr-grph-first, .pr-grph-cell, .pr-grph-th', function () {

        var day = $(this).data('day');
        var time = $(this).data('time');
        var mode = $(this).hasClass('pr-grph-hour-actieve');

        //window.print();

        //console.log(day + ' ' + time + ' '+ mode);

        if($(this).hasClass('pr-grph-th')){
            var pt = $('.pr-grph-cell').filter('[data-day=' + day + ']');

            if(mode)
                pt.removeClass('pr-grph-hour-actieve');
            else
                pt.addClass('pr-grph-hour-actieve');
        }


        if($(this).hasClass('pr-grph-first')){

            var pt = $('.pr-grph-cell').filter('[data-time=' + time + ']');

            if(mode)
                pt.removeClass('pr-grph-hour-actieve');
            else
                pt.addClass('pr-grph-hour-actieve');


        }

        $(this).toggleClass('pr-grph-hour-actieve');

        var pts = $('.pr-grph-cell').filter('.pr-grph-hour-actieve');

        var datetime = [];

        $.each(pts, function (index, entry) {
            time = $(entry).data('time');
            day = $(entry).data('day');

            if(datetime[time] === undefined)
                datetime[time] = [];

            datetime[time].push(day);
        });

        // pts.forEach(function (element) {
        //     console.log($(element).data('time'));
        // });


        var str_arr = JSON.stringify(datetime);

//        console.log(datetime);
//        console.log(str_arr);

        var tch_uid = $('.pr-tch-name').data('id');

         $.ajax({
            url:'/tools/ajax-handler.php',
            type:'POST',
            data: 'type=tch-grph&uid=' + tch_uid + '&dt=' + str_arr,
            dataType: "json",
            success: function(data){ }
        });


    });

    $(document).on('click', '.pr-set-office', function () {

        var tch_uid = $('.pr-tch-name').data('id');
        var list = $('.pr-set-office').filter(':checked');
        var arr = [];

        $.each(list, function (index, entry) {
            arr.push($(entry).val());
        });

        var str_arr = JSON.stringify(arr);

        $.ajax({
            url:'/tools/ajax-handler.php',
            type:'POST',
            data: 'type=tch-gr-off&uid=' + tch_uid + '&off=' + str_arr,
            dataType: "json",
            success: function(data){ }
        });
    });

    $(document).on('change', '.pr-tch-email, .pr-tch-exp, .pr-tch-exp_tch', function () {

        var val = $(this).val();
        var tch_uid = $('.pr-tch-name').data('id');

        var column = null;

        if($(this).hasClass('pr-tch-email'))
            column = 'email';
        else if($(this).hasClass('pr-tch-exp'))
            column = 'exp';
        else if($(this).hasClass('pr-tch-exp_tch'))
            column = 'exp_teach';


        if(column == 'exp' || column == 'exp_teach') {

            if(isNaN(parseInt(val))) {
                alertify.error('Необходимо ввести только число!');
                return;
            }

            if (val > 40 && val < 1980) {
                alertify.error('Такой стаж недоступный!');
                return;
            }
        }

        if(column && tch_uid)
            saveDBValue('teachers', 'id',tch_uid, column, val, function(res){
                if(res)
                    alertify.success('Новое значение сохранено!');
                else
                    alertify.error('Возникла ошибка!');
            });
    });


    function saveDBValue(type, id_n, id, column, val, callback) {

        $.ajax({
            url:'/tools/ajax-handler.php',
            type:'POST',
            data: 'type=save-val&t=' + type + '&in=' + id_n + '&i=' + id + '&c=' + column + '&v=' + val,
            dataType: "json",
            success: function(data){

                if(callback)
                    callback(data.res);
            }
        });

    };


});
    
//-------------menu-------------------------    

jQuery(document).scroll(function($e){
    
    if($(window).width() > 1000)
   
        if($(window).scrollTop() > 200 ){
            if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
                $('#fixed-main-nav').show();
            //$('#fixed-main-nav').animate( {opacity: 0.8});
        }else
            //$('#fixed-main-nav').animate( {opacity: 0}, 0);
            $('#fixed-main-nav').hide();
        
    //console.log('sss');
});


/*

document.addEventListener("DOMContentLoaded", function() {

    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false;

    const lazyLoad = function() {
        if (active === false) {
            active = true;

            setTimeout(function() {
                lazyImages.forEach(function(lazyImage) {
                    if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove("lazy");

                        lazyImages = lazyImages.filter(function(image) {
                            return image !== lazyImage;
                        });

                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                });

                active = false;
            }, 200);
        }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
});
*/


/*
if(typeof(grecaptcha) !== 'undefined') {

    console.log(grecaptcha);

    grecaptcha.ready(function () {
        grecaptcha.execute('6LfmlcMUAAAAAJLu2yHZY3PoMPC5zWHu9TYLBxm3', {action: 'homepage'}).then(function (token) {
            // console.log(token);
            document.getElementById("token").value = token;
        });
    });
}*/

//console.log('dddd');

jQuery(document).ready(function($){
       
    
    // teach cut
    $('.show-text').html('Подробнее &uarr;');
    
    //auto redi
    $('#pay-online').delay(3000).submit();

    if(typeof(isMobile) !== 'undefined' && isMobile.phone)
        $("#youtubeFrame").attr("align", 'center');
    
    $("#youtubeFrame").attr("src", 'https://www.youtube.com/embed/YtCsFN2RFfo');
    
    //  alert('ddd');
    
    $('.ext-ref-sp').replaceWith (function (){
        
        var cls = $(this).data('class') !== '' ? " class='" + $(this).data ('class') + "'" : '';
        //var title = $(this).text () !== '' ? " title='" + $(this).text () + "'" : '';
        //var cls = $(this).hasClass() data('class') !== '' ? " class=" + $(this).data ('class') : '';
        //console.log(title);
                //'" title="' +  $(this).text () + '"' 
                //title
        
        return'<a onclick="return !window.open(this.href)" href="' +  $(this).data ('link') + '"' +
                cls +  '>' + 
                $(this).html ()+'</a>';
    });
    
    


    if($('.slick_slider').length > 0){
        
        $('.slick_slider').show();
        
        $('.slick_slider').slick({
          dots: true,
          infinite: true
        });
        
        
    }
    
    
});

$('#user-type').ready(function($){
    addV();
});

$('#online-pay-any').ready(function($){
    $('.name-online-pay').val($('#online-pay-any').data('name'));
    $('.phone-online-pay').val($('#online-pay-any').data('phone'));
    $('.office-online-pay [value="' + $('#online-pay-any').data('office') + '"]').attr("selected", "selected");
});


$('.phone-number').ready(function (){  
    
    //alert('M ' + isMobile.phone);
    
    if(typeof(isMobile) !== 'undefined' && isMobile.phone){
        //console.log(number);
      
      $('.phone-number').each(function() {
//            var number = $(this).data('number');
//            var number = $(this).text();
            var txt = $(this).text();
            var numb = txt.match(/\d/g);
            var number = numb.join("");
            //console.log(number);
            
            $(this).replaceWith(
                $('<a href="tel:' + number + '">' + txt + '</a>')
        );
      });
    }    
});

$('.nabor').ready(function (){  
    
//        $('.nabor').each(function() {           
//        });
        
        
        //$('.nabor').append('<br/>3 заявки');
        //console.log($(this));
        
});


$('.gr_filter-off').ready(function (){  
        
        if($('.gr_filter-off').length){ // has copy in next func

            var tb_pt = $('.gr_filter-off').closest('.group-filter-tb');
    
            //console.log(tb_pt);
            var groups = get_groups_sort_arr(tb_pt.data('course')); //eval('this.f = get_groups_' + uid + '()');
        
            //var groups = get_groups();

            if(groups.length < 5)
                return; 

            var items = new Array();
            var itemsru = new Array();
            var off_count = new Array();
            var off_index = new Array();
            
            for(i=1; i<groups.length; i++){
                var office = groups[i][7];
                if(office != '' && items.indexOf(office) == -1){
                    items.push(office);
                    itemsru.push(groups[i][4]);
                }
                
                //console.log(i + ' ' + office);
                off_count[office] = (off_count[office] === undefined) ? 1 : off_count[office] + 1;
                off_index[office] = groups[i][8];
            }

            if(items.length < 2)
                return;

            //$('.gr_filter').css( 'background-color', '#E8EDFF');

            var alink = '<a class="filter_office button_left button_toggled" href="javascript: void(0);" data-val="all">'+
                (isUkr() ? 'Фiлiя будь-яка' : 'Филиал любой')+'</a>';
            
            var off_col = '';
            
            
            for(i=0; i < items.length; i++){
                off_col = '';// 'line-' + items[i];
                
//                switch(items[i]){
//                    case 'pechersk' : off_col = 'line-green';  break;
//                    case 'petrovka' : off_col = 'line-blue2'; break;
//                    case 'teatralnaya' : off_col = 'line-red'; break;
//                    case 'shulyavka' : off_col = 'line-orange'; break;
//                    case 'poznyaki' : off_col = 'line-green2'; break;
//                    case 'olimpiiska' : off_col = 'line-blue2'; break;                        
//                }
                
                var btn_type = (i == items.length - 1 ? ' button_right' : ' button_center');
                
                var count = (off_count[items[i]] === undefined) ? '' : '<sup>' + off_count[items[i]] + '</sup>';
                alink = alink + '<a class="filter_office ' + off_col + btn_type+ '" href="javascript: void(0);" data-val="'+off_index[items[i]]+'">'+itemsru[i] + count + '</a>';
            }

            $('.gr_filter-off').html(alink);
            
            //console.log($(this));
        }
        
});

$('.gr_filter-days-disabled').ready(function (){  

    if($('.gr_filter-days-disabled').length){ // has copy in prev func

        var tb_pt = $('.gr_filter-days').closest('.group-filter-tb');

        var groups = get_groups_sort_arr(tb_pt.data('course')); 

        if(groups.length < 5)
            return; 
        
        var alink = '<a class="gr-filter-days" href="javascript: void(0);" data-val="all" style="font-weight:bold;">'+(isUkr() ? 'Днi будь-якi' : 'Дни любые')+'</a> ';
        alink += '<a class="gr-filter-days" href="javascript: void(0);" data-val="work">' + (isUkr() ? 'Буднi': 'Будни') + '</a> ';
        alink += '<a class="gr-filter-days" href="javascript: void(0);" data-val="weekend">' + (isUkr() ? 'Вихiднi': 'Выходные') + '</a>';
        //$('.gr_filter-days').html(alink);
        
        alink = '<a class="gr-filter-times" href="javascript: void(0);" data-val="all" style="font-weight:bold;">'+(isUkr() ? 'Час будь-який': 'Время любое')+'</a> ';
        alink += '<a class="gr-filter-times" href="javascript: void(0);" data-val="morning">' +  (isUkr() ? 'Ранок': 'Утро') + '</a> ';
        alink += '<a class="gr-filter-times" href="javascript: void(0);" data-val="daytime">' + (isUkr() ? 'Вдень': 'День') + '</a> ';
        alink += '<a class="gr-filter-times" href="javascript: void(0);" data-val="evening">' + (isUkr() ? 'Вечiр': 'Вечер') + '</a>';
        //$('.gr_filter-times').html(alink);
    }

});


function isUkr(){
    return $('.set-lang').length > 0 && $('.set-lang').text() !== 'UA';
}

function addV(text) {
    
    var ref = $('#user-type').data('page');
    var page = $('#user-type').data('ref');

    var data = $('#user-type').data('d');
    
    var cl = getClient();
    text = (typeof(text)==='undefined') ? '' : '&text=' + text;
    
    //cl = serialize(cl);
    //cl = Base64.encode(cl);
    //var query = 'type=user&p='+ page + '&r='+ ref;
    var query = 'type=user&d='+ data + '&c=' + cl + text;

    $.ajax({
        type: 'POST',
        url: '/tools/ajax-handler.php',
        data: query,
        success: function(data) {}
    });

}

function serialize( mixed_val ) {    // Generates a storable representation of a value
    // 
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   adapted for IE: Ilia Kantor (http://javascript.ru)
 
    switch (typeof(mixed_val)){
        case "number":
            if (isNaN(mixed_val) || !isFinite(mixed_val)){
                return false;
            } else{
                return (Math.floor(mixed_val) == mixed_val ? "i" : "d") + ":" + mixed_val + ";";
            }
        case "string":
            return "s:" + mixed_val.length + ":\"" + mixed_val + "\";";
        case "boolean":
            return "b:" + (mixed_val ? "1" : "0") + ";";
        case "object":
            if (mixed_val == null) {
                return "N;";
            } else if (mixed_val instanceof Array) {
                var idxobj = { idx: -1 };
		var map = []
		for(var i=0; i<mixed_val.length;i++) {
			idxobj.idx++;
                        var ser = serialize(mixed_val[i]);
 
			if (ser) {
                        	map.push(serialize(idxobj.idx) + ser)
			}
		}                                       

                return "a:" + mixed_val.length + ":{" + map.join("") + "}"

            }
            else {
                var class_name = get_class(mixed_val);
 
                if (class_name == undefined){
                    return false;
                }
 
                var props = new Array();
                for (var prop in mixed_val) {
                    var ser = serialize(mixed_val[prop]);
 
                    if (ser) {
                        props.push(serialize(prop) + ser);
                    }
                }
                return "O:" + class_name.length + ":\"" + class_name + "\":" + props.length + ":{" + props.join("") + "}";
            }
        case "undefined":
            return "N;";
    }
 
    return false;
}


function get_groups_sort_arr(uid){
        
    uid = uid.replace(/-/g, "_");
    return eval('this.f = get_groups_' + uid + '()');
}


/**
*
*  Base64 encode / decode
*  <!--noindex--><a rel="nofollow" href="http://www.webtoolkit.info/" title="http://www.webtoolkit.info/" class="liexternal">http://www.webtoolkit.info/</a><!--/noindex-->
*
**/
 

$('.reverse-timer').ready(function($){  // has bug if time more then now. don't count days
    //   alert('sss');
   //    setTimeout(function () {  
   //        $(this).text();
   //    }, 100);

   var countdown = $('.reverse-timer');

   if(!countdown.length)
       return;
   
   countdown.each(function() {
       var countdown = $(this);
       var perehod = countdown.data('time');
       
       var target_date = new Date(perehod.replace(/(\d+)-(\d+)-(\d+)/, '$2/$1/$3'));    //var perehod = '2014-01-22 11:00';
       
       var days, hours, minutes, seconds;

        // update the tag with id "countdown" every 1 second
        setInterval(function () {

            //console.log(target_date);
            var text = '';
            // find the amount of "seconds" between now and target
            var current_date = new Date().getTime();
            var seconds_left = (target_date - current_date) / 1000;

            if(seconds_left > 0){
                // do some time calculations
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                // format countdown string + set tag value
                //var text =  days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s";  
                seconds = (seconds < 10) ? '0' + seconds : seconds;
                minutes = (minutes < 10) ? '0' + minutes : minutes;
                text =  hours + ":" + minutes + ":" + seconds;  
            }else{
                var pt = countdown.closest('td');
                var prev_val = pt.find('.discount').data('prev-val');
                
                if(prev_val)
                    pt.html('<span class="discount">'+prev_val+'%</span>');
                else
                    pt.text('-');
                
                pt = pt.next();
                
                var price = pt.find('.price');
                var price_val = price.data('prev');
                
                if(price_val)
                    price.html('<nobr>' + price_val + ' грн.</nobr>');

                if(!prev_val){
                    pt.find('.oldprice').remove();
                    pt.find('br').remove();
                }
            }
            
            countdown.html(text);
            //alert(text);
            //console.log(text);

        }, 1000);
       
   });

//alert(str);
    return;

   // -------------- old DISABLED ------------
    
   var perehod = countdown.data('time');
   //var time =  countdown.data('time');
   //var perehod = '2014-01-22 11:00';

   var target_date = new Date(perehod.replace(/(\d+)-(\d+)-(\d+)/, '$2/$1/$3'));

   //alert(target_date);

   //debugger;

   // set the date we're counting down to
   //var target_date = new Date("Aug 15, 2014").getTime();

   //var target_date = new Date(2013, 11, 29, 11, 0).getTime();

   // variables for time units
   var days, hours, minutes, seconds;

   // get tag element
   //var countdown = $('.reverse-timer');
   //var htmlString = $( this ).html();
   //concole.log($(this));
   //  $( this ).text( htmlString );

   // update the tag with id "countdown" every 1 second
   setInterval(function () {

       //console.log(target_date);

       // find the amount of "seconds" between now and target
       var current_date = new Date().getTime();
       var seconds_left = (target_date - current_date) / 1000;

       // do some time calculations
       days = parseInt(seconds_left / 86400);
       seconds_left = seconds_left % 86400;

       hours = parseInt(seconds_left / 3600);
       seconds_left = seconds_left % 3600;

       minutes = parseInt(seconds_left / 60);
       seconds = parseInt(seconds_left % 60);

       // format countdown string + set tag value
       //countdown.innerHTML 
       //var text =  days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s";  
       seconds = (seconds < 10) ? '0' + seconds : seconds;
       minutes = (minutes < 10) ? '0' + minutes : minutes;
       var text =  hours + ":" + minutes + ":" + seconds;  
       countdown.html(text);
       //alert(text);
       //console.log(text);

   }, 1000);

});



/*function a_onClick($) {
    if(handler != ''){
        $.ajax({
            type: query_type,
            url: handler,
            data: query,
            success: function(data)
            {
                //alert(text2);
                if(data == '')
                    show = false;
                else
                    $('#personPopupContent').html(data);
            }
        });
}
*/
/*
function a_onClick($) {
    //$('.teacher-cut').css('display', 'block');
    alert('a_onClick');
}
  
  
function getsupport ( selectedtype )
{
    alert ("selectedtype");
    document.supportform.supporttype.value = selectedtype ;
    document.supportform.submit() ;
}

function toggle(ID) {
    var ele = document.getElementById("toggleText-" + ID);
    var text = document.getElementById("displayText-" + ID);

    //alert (text +" "+ ele + " " + courseID);
    if(ele.style.display == "block") {
        ele.style.display = "none";
        text.innerHTML = "<img src='/images/plus.png'> Просмотреть все группы";
    }
    else {
        ele.style.display = "block";
        text.innerHTML = "<img src='/images/minus.png'> Скрыть группы";
    }
}
 */


$(document).ready(function(){
    // 
    var th_groups = new Array();
    th_groups[1] = 0;
    th_groups[2] = 1;
    th_groups[3] = 2;
    th_groups[4] = 3;
    th_groups[5] = 4;
    th_groups[6] = 5;
    th_groups[7] = 6;


    // $('.rounded_sort').append('<img src="arr_refresh.png" />');

    var path = '/images/icons/arrow-';
        
    /*    BYV-16 */
    //$('.rounded_sort').append('<img src="' + path + 'blank.png" />');
    //$('.rounded_sort up').append('<img src="arr_up.png" />');
                
    //$('.rounded-company').children('img').attr('src', path + 'up.png');
                
    $('.rounded_sort').click(function(){

        $('.border-new').hide();
        
        var tb_pt = $(this).closest('.course-grs-tbl');
        var id = $(this).attr('id');

        sort_gr(tb_pt, $(this), id, 0);
    });

    function sort_gr(tb_pt, pt, id, sort){
        
        
        if(pt.hasClass('up')){
            sort = (sort)?sort:1;

            pt.removeClass('up').addClass('down');
            pt.children('img').attr('src', path + 'down.png');
        }
        else{
            sort = (sort)?sort:-1;
            
            if(pt.hasClass('down')){
                pt.removeClass('down').addClass('up');
                pt.children('img').attr('src', path + 'up.png');
            }
            else{
                tb_pt.find('.rounded_sort').removeClass('down').removeClass('up');
                tb_pt.find('.rounded_sort').children('img').attr('src', path + 'blank.png');
                         
                pt.addClass('up');
                pt.children('img').attr('src', path + 'up.png');
            }
        }
        
        //var uid = tb_pt.data('course');
        //console.log(uid);

        var groups = get_groups_sort_arr(tb_pt.data('course'));
        //eval('this.f = get_groups_' + uid + '()');
        //console.log(groups);
        
        //return;
        
        var groups_id = new Array();
        
        for(i=0; i<groups.length-1; i++)
            groups_id[i] = i+1;
        
        for(i=0; i<groups.length-1; i++){
            for(j=0; j<groups.length-2; j++){
                if(((comparison(groups[j+1][th_groups[id]], groups[j+2][th_groups[id]]))+sort==0) || 
                    ((groups[j+1][th_groups[id]] == groups[j+2][th_groups[id]]) && 
                        (groups[j+1][0] > groups[j+2][0]))){
                    tmp = groups[j+1];
                    groups[j+1] = groups[j+2];
                    groups[j+2] = tmp;
                    tmp = groups_id[j];
                    groups_id[j] = groups_id[j+1];
                    groups_id[j+1] = tmp;
                }
            }
        }
        //return groups_id;
        //alert(groups_id);   
        move_tr(tb_pt, groups_id);
    }

    function comparison(a, b){
        if(a > b) return 1;
        if(b > a) return -1;
        return 0;
    }

    function move_tr(tb_pt, groups_id){
        //pt = $('.grs_table').filter('#'+'3').hide();

        var body = tb_pt.next();// find('.grs_table');
        
        //console.log(body);
        
        for (i = 0; i <groups_id.length; i++) {
            var gr_obj = body.children('div[id="'+groups_id[i]+'"]');
            //body.appendTo('<div id="'+ groups_id[i] +'">' + gr_obj.html() + '</div>');
            gr_obj.appendTo(body);
        }
    }

    
    // disabled 02.17
    $(".sort-gr-table").change(function() {
        
        var tb_pt = $(this).closest('.group-filter-tb');
        //console.log(tb_pt);
        //var uid = tb_pt.data('course');
        //tb_pt = tb_pt.next('.course-grs-tbl');
        tb_pt = $('.groups-container').find('.course-grs-tbl');
        
        var id = $(this).val();
        var pt = tb_pt.find('.rounded_sort').filter('#' + id);
        
        //console.log(tb_pt);
        sort_gr(tb_pt, pt, id, -1);
        //console.log(id);
    });
    
    
//    $('.grs_table').hover(function() {
//        alert('ff');
//            $(this).children().stop().animate({backgroundColor:'#4E1402'}, 300);
//            }, function () {
//            $(this).children().stop().animate({backgroundColor:'#943D20'}, 100);
//        });
//    });

    var mouse_event_arr = [];
    
    $('.group_item_tb').mouseenter(function(){

        //$(this).stop().animate({ backgroundColor: '#EDF3FF' }, 'slow');

        $(this).css('cursor', 'pointer');
        
        var uid = $(this).data('uid');
        
        mouse_event_arr.push(uid);
        
        //console.log(mouse_event);
        
        setTimeout(function() { 
            
            var index = mouse_event_arr.indexOf(uid);
            
            if(index > -1){
                mouse_event_arr.splice(index, 1);
                
                $.ajax({
                    type: 'POST',
                    url: '/tools/ajax-handler.php',
                    data: 'type=gr-act&gr=' + uid,
                    dataType: "json",
                    success: function(data) { }
                }); 
            }
        }, 3000);
        
    });
    
    $('.group_item_tb').mouseleave(function(){
        //$(this).stop().animate({ backgroundColor: 'white' }, 'fast');
        
        var uid = $(this).data('uid');

        var index = mouse_event_arr.indexOf(uid);
        if(index > -1)
            mouse_event_arr.splice(index, 1);
        
//        setTimeout(function() { 
//            $.ajax({
//                type: 'POST',
//                url: '/tools/ajax-handler.php',
//                data: 'type=gr-act&gr=' + thiz.data('uid'),
//                dataType: "json",
//                success: function(data) { }
//            }); 
//        }, 1000);
    });


    $('.set-lang').click(function(event){

        $.cookie("lang", $(this).text(), { path: '/', expires: 30 });

        ga('send', 'event', 'Set-Lang', $(this).text(), '');
    });

    $('.off-list-header').click(function(event){
        $('.off-list-header-popup').show();

        $('.off-list-header-popup').addClass('active');

        $('.off-list-link img.arrow-ico').css({'transform' : 'rotate('+ 180 +'deg)'});

        ga('send', 'event', 'Office-Show', 'On', '');

    });

    $('body').click(function(event){

        //console.log(event);
        //console.log(popup);
        var popup = $(event.target).closest('.off-list-header-popup');

        if(!popup.length && !$(event.target).hasClass('off-list-link') && $('.off-list-header-popup').hasClass('active')) {

            $('.off-list-header-popup').hide();
            $('.off-list-header-popup').removeClass('active');

            $('.off-list-link img.arrow-ico').css({'transform' : 'rotate('+ 0 +'deg)'});
        }
    });


    $('.group_item_tb').click(function(){
        
//        var ref = window.location.href;
//        var n1 = ref.lastIndexOf("/")+1;
//        var n2 = ref.lastIndexOf(".");
//        var str = ref.substr(n1, n2-n1);
        
        var str = $(this).data('cuid');
        var uid = $(this).data('uid');
        var t = $(this).data('t');
        //alert(n1 +' '+ n2);
        var lang = isUkr() ? '&lang=ukr' : '';
        
        //if(!$(this).hasClass('filter-office') || !$(this).hasClass('applay-button'))
        window.open("/programs/group-info.php?course=" + str + "&uid=" + uid + '&t=' + t + lang, "_self");
    });
    
    // get _GET paramater from current url
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };




    // load progarm
    $( "#new-projects" ).ready(function(){
        
        var course = getUrlParameter('course');
        
        if(typeof(course) === 'undefined' || !course){
            course = $('.course-promo').data('uid');
            
            if(typeof(course) === 'undefined')
                return;
        }
        
        //console.log(course);
        
        if($('#gr-inf-program-list').length > 0){
            
            //var href = "/programs/"+course+".php";

            var tch_uid = $('.gr-cur-teacher').data('tuid');
            var ukr = isUkr() ? '/ua' : '';
                    
            // Hack
            if(tch_uid == 'Radzivill' || tch_uid == 'Timoschuk'){ 
            
                $.ajax({
                    url:'/tools/ajax-handler.php',
                    type:'POST',
                    data: 'type=author-program&uid=' + tch_uid,
                    dataType: "json",
                    success: function(data){
                        $('#gr-inf-program-list').html(data.text);
                    }
                });
                
            }else{
                $.ajax({
                    url: ukr + "/programs/"+course+".php",
                    type: 'GET',
                    success: function(data){
                        var pr_list = $(data).find('#decor_list');
                        var list = '';

                        if(pr_list.length > 0)
                            for(i=0; i < pr_list.length - 1; i++)
                                 list += $(data).find('#decor_list')[i].outerHTML;

                        //var list = $(data).find('#decor_list')[0].outerHTML;

                        $('#gr-inf-program-list').html(list);
                    }
                });
        }
    }
        
    });
    
    //$( "#new-projects" ).load( "/resources/load.html #projects li" );
    
//    $( "#new-projects" ).load( "/not-here.php", function( response, status, xhr ) {
//        if ( status == "error" ) {
//            var msg = "Sorry but there was an error: ";
//            $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
//  }
//});
//    
 
    
    
    // times, days, off
    function filterGroups(this_pt, type) {

        $('.border-new').hide();
        
        var tb_pt = this_pt.closest('.group-filter-tb');
        //tb_pt = tb_pt.next('.course-grs-tbl');
        //tb_pt = $('.groups-container').find('.course-grs-tbl');
        
        tb_pt = tb_pt.nextAll().eq(1);
        
        //console.log(tb_pt);
        
        var val = this_pt.data('val');
        
        $('.gr_filter-' + type).children().removeClass('button_toggled');
        this_pt.addClass('button_toggled');
        
        
        var filter_class = 'filtred-gr-' + type;
        var filter_class1 = type == 'times' ? 'filtred-gr-off' : type == 'days' ? 'filtred-gr-off' : 'filtred-gr-days';
        var filter_class2 = type == 'times' ? 'filtred-gr-days' : type == 'days' ? 'filtred-gr-times' : 'filtred-gr-times';
        
        if(typeof ga !== 'undefined')
            ga('send', 'event', 'Filter', type, val);
        
        //console.log(filter_class1);
        //console.log(filter_class2);
        var counter = 0;//$('.gr_filter-counter').text();
        
        
        var filterGroups_func = function(item) {
        
            //console.log(item);
            
            var p_tr = item.closest('.group_item_tb');
            //var p_tr_gr = item.closest('.group_item_tb');
            //var p_tr_mob_gr = item.closest('.group_item_mob-tb');
            
            //console.log($(this).data(type) + ' = ' +val);
//            if(val == 'all'){
//                if(p_tr.hasClass(filter_class) && !p_tr.hasClass(filter_class1) && !p_tr.hasClass(filter_class2))
//                    p_tr.show();
//                
//                p_tr.removeClass(filter_class);
//            }
                
            if(val == 'all' || item.data(type) == val){
                if(p_tr.hasClass(filter_class) && !p_tr.hasClass(filter_class1) && !p_tr.hasClass(filter_class2))
                    p_tr.show();
                    
                p_tr.removeClass(filter_class);
            }else if(val != 'all'){
                p_tr.hide();
                p_tr.addClass(filter_class);
            }
            
            if(p_tr.is(":visible"))
                counter++;
            
        };        
        
        
        tb_pt.find('.gr-flt-days').each(function(){
            filterGroups_func($(this));
        });
        
//        tb_mob_pt.find('.gr-flt-days').each(function(){
//            filterGroups_func($(this));
//        });
        
        $('.gr_filter-counter').text(counter);
    };
    
    $('.filter_office').click(function(){
        filterGroups($(this), 'off');
    });

    $('.gr-filter-days').click(function(){  
        filterGroups($(this), 'days');
    });

    $('.gr-filter-times').click(function(){ 
        filterGroups($(this), 'times');
    });


    $('.sidebar-category').click(function(){
        //console.log('+++');
        
        pt = $(this);
        par = pt.parent().parent(); // ckeck if menu doesnt work !!!
        
        if(pt.hasClass('sb-cat-hide')){
            pt.removeClass('sb-cat-hide');
            pt.addClass('sb-cat-show');
            par.next().show();

            pt.find('.cat-ico-arrow').css({'transform' : 'rotate('+ 180 +'deg)'});
            
            if(typeof ga !== 'undefined')
                ga('send', 'event', 'Sidebar', 'show', '');
            
        } else if(pt.hasClass('sb-cat-show')){
            pt.removeClass('sb-cat-show');
            pt.addClass('sb-cat-hide');
            par.next().hide();

            pt.find('.cat-ico-arrow').css({'transform' : 'rotate('+ 0 +'deg)'});
            
            if(typeof ga !== 'undefined')
                ga('send', 'event', 'Sidebar', 'hide', '');
        }
        
    });
    
//    $('.teacher-goto').click(function(){
//        $('.tab-teacher').click();
//    });
    
    
    $('.course-card').hover(
        function() {
            //$(this).stop(true, false).animate({ 'zoom': 1.1, left: "-=20", top: "-=20" }, 300);
            //$(this).transition({ scale: 1.3 });
            $(this).find('.course-card-img').stop(true, false).animate({top: "-=9", left: "-=14",  width: "+=28",  height: "+=18.6"  }, 200); // 10% zoom
        },
        function() {
            $(this).find('.course-card-img').stop(true, false).animate({  top: "0",  left: "0",  width: "280",  height: "186.6"}, 200);            
    });
    
    $('.applay-goto').click(function(){
        
        //console.log($('.tab-online').length);
        
        if($('.tab-online').length == 0){
            var url = "/entrance/apply";    
            $(location).attr('href',url);
            return;
        }
        
        $('.tab-online').click();
        
        
        var pt = $(this).closest('.course-grs-tbl');
        $('#Program').children('option[value='+ pt.data('course') +']').prop('selected', true);
        loadCourseGroups(null);
        
        var index = $(this).data('index') + 1;
        
        setTimeout(function() { 
            console.log(index);
            $('#AllGroups :nth-child('+ index +')').prop('selected', true); 
        }, 1000);

        
        
//        var pt = $(this).closest('tr').find('.discount')
//        if(pt.length > 0){
//            var val = pt.data('value');
            //$('.apply-f-discount').text(val + '%');
            //$('#Discount_fm').val(val);
//        }
    });

    $('.applay-btn-evt').click(function(){
        
        //console.log($('.tab-online').length);
        
        if($('.tab-online').length == 0){
            var url = "/entrance/apply";    
            $(location).attr('href',url);
            return;
        }
        
        $('.tab-online').click();
        var index = $(this).data('index') + 1;
        $('#AllGroups :nth-child('+ index +')').prop('selected', true); 
        
    });

    $('.course-button-card, .course-card-img').click(function(){
        $(location).attr('href', $(this).data('link'));
    });


    $('.how-to-apply').on('click', function(){
        
        //alert('sss');
        var pt = $('.how-to-apply-cont');
  
        if(pt.text().length > 0)
            pt.empty();
        else{
            var text = $('.tabbody-apply').html();
            pt.html(text);
        }
        //console.log(pt.text().length);
    });
    
    $('#jivo-label').click(function(){
       //console.log('ssss');
       addV('jivo');
    });
    
    
  $(".helbnt").on('click', function() {
              // alert('aaaaaaa');
            
                $.ajax({
                    type: 'POST',
                    url: '/tools/ajax-handler.php',
                    data: 'type=course-sch',
                    dataType: "json",
                    success: function(data)
                    {
                    }
                });
        });    
    
//    $('.payonline').click(function(){
//        $('#CommonRequestForm').submit();
//    });

        var prev_act_tab = $('.courses-list__tab_best');
        var prev_act_content = $('.courses-list__content').children("[data-index='best']");

        $('.courses-list__tab').click(function(){
           //console.log('ddd');
            prev_act_tab.removeClass('is-active');
            prev_act_tab = $(this);
            prev_act_tab.addClass('is-active');
            
            var tab = $(this).data('group');
            prev_act_content.addClass('is-hidden');
            prev_act_content = $('.courses-list__content').children("[data-index='" + tab + "']");
            prev_act_content.removeClass('is-hidden');
        });



        $('.pay_anyamount').click(function() {
            
            var pt = $(this).closest('.apllay-form');
        
            if(this.checked){
                pt.find('.amount-online-pay').prop('readonly', false).val('').focus();
                pt.find('.pay-online-form').children('input[name=description]').val('Оплата за обучение');
            }
            
        });     
        
        $('.pay_prepay').click(function() {
            
            var pt = $(this).closest('.apllay-form');
                    
            if(this.checked){
                pt.find('.amount-online-pay').prop('readonly', true).val(100);
                pt.find('.pay-online-form').children('input[name=description]').val('Предоплата за пробный урок');
                pt.find('.pay-online-form').children('input[name=amount]').val(100);
                pt.find('.online-pay-err').hide();
                
            }
        });     
        
        
        $('.show-feedback').click(function() {
            
            var uid = $(this).data('uid');
            
            $('#hcw_embed_' + uid).show();
            
        });     
 
    

        $('.course-opt').mouseenter(function () {

            //console.log($(this).position());
            //console.log($(this).offset());
            
            var uid = $(this).data('uid');
            var p = $('.bubble.' + uid);
//            console.log(uid);
//            console.log(p);
            
            p.css('top', $(this).offset().top + $(this).height() + 20);
            p.css('left', $(this).position().left - 35);
            
            p.show();
        });

        $('.course-opt').mouseleave(function () {
            $('.bubble').hide();
        });
    
        
        
//        $('#OnlinePayForm').submit(function() {
//            alert('ddd');
//            
//        });
    
//--------------------------------------------------------------------------------    
});


function validateOnlinePay(thisform){
     with (thisform)        
     {
            if (validateRequired(customer) == false) {
                $('.online-pay-name-err').show();
                customer.focus();
                return false;
            }
            
            if (validateRequired(info) == false) {
                $('.online-pay-phone-err').show();
                customer.focus();
                return false;
            }

            // tmp
             if (validateRequired(email) == false) {
                 $('.online-pay-email-err').show();
                 customer.focus();
                 return false;
             }

            if (validateRequired(amount) == false) {
                $('.online-pay-err').show();
                amount.focus();
                return false;
            }
    }
        
     return true;
}

function validateRequired(field)
{
    with (field)
    {

        if (value == null || value == "")
        {
            //alert(alerttxt);
            //$('.amount-online-pay').after(alerttxt);
            //$('.online-pay-err').show();
            return false;
        }
        
        return true;
    }
}


var mainMenu = {
    timer_hd: 0,
    timer_sh: 0,
    config :{
        menu: '.hr-menu-programs',
        submenu: '.programCol'
    },
    init: function(config){
        $.extend(this.config, config);
        
        $(mainMenu.config.menu).on('mouseenter', this.show);
        $(mainMenu.config.submenu).on('mouseenter', this.show);
        $(mainMenu.config.menu).on('mouseleave', this.hide);
        $(mainMenu.config.submenu).on('mouseleave', this.hide);
        
        $('.hr-menu-index').on('mouseenter', function(){
            if (mainMenu.timer_hd){
                clearTimeout(mainMenu.timer_hd);
                mainMenu.timer_hd = 0;
                $(mainMenu.config.submenu).hide();
            }
        });
        
        //$('.hr-menu-index, .indexCol').on('mouseenter', this.show);
        //$('.hr-menu-index, .indexCol').on('mouseleave', this.hide);
    },
    show : function(){
        
        //console.log('enter ' + mainMenu.timer_hd);
        //console.log($(this));
        
        if (mainMenu.timer_hd){
            clearTimeout(mainMenu.timer_hd);
            mainMenu.timer_hd = 0;
        }
        else
            mainMenu.timer_sh = setTimeout(function(){
                //$('.programCol').slideDown('fast');
                $(mainMenu.config.submenu).show();
                mainMenu.timer_sh = 0;
            }, 200);
    },
    hide : function(){
        //$this = this;
        
        if(mainMenu.timer_sh){
            clearTimeout(mainMenu.timer_sh);
            mainMenu.timer_sh = 0;
        }else
            mainMenu.timer_hd = setTimeout(function(){

                //$('.programCol').slideUp('fast');
                $(mainMenu.config.submenu).hide();
                mainMenu.timer_hd = 0;

            }, 600);
        
        //console.log('leave ' + mainMenu.timer_hd);
    }
    
};

//new mainMenu
mainMenu.init();
//var mainMenu2;
//$.extend(mainMenu2,mainMenu);

//mainMenu2.init({menu: '.hr-menu-index', submenu:'.indexCol'});


//-----------------------------------------------------------------------------------------


function getClient() {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/')))
    {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    var str = 'Browser name  = ' + browserName + '<br>'
            + 'Full version  = ' + fullVersion + '<br>'
            + 'Major version = ' + majorVersion + '<br>'
            + 'Agent = ' + navigator.userAgent + '<br/>'
            + 'Res = ' + screen.width + " x " + screen.height + '<br/>'
            + 'os = ' + navigator.platform;

    return str;
}


var disqus_shortname = '10101';

function loadDisqus(source, identifier, url) {

    if (window.DISQUS) {

       jQuery('#disqus_thread').insertAfter(source); //append the HTML after the link

       //if Disqus exists, call it's reset method with new parameters
       DISQUS.reset({
          reload: true,
          config: function () {
          this.page.identifier = identifier;
          this.page.url = url;
          }
       });

    } else {

       //insert a wrapper in HTML after the relevant 'show comments' link
       jQuery('<div id="disqus_thread"></div>').insertAfter(source);
       disqus_identifier = identifier; //set the identifier argument
       disqus_url = url; //set the permalink argument

       //append the Disqus embed script to HTML
       var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
       dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
       jQuery('head').append(dsq);

    }

}


function loadHCW(source, identifier, url) {
    
//    _hcwp = window._hcwp || [];
//    _hcwp.push({widget: "Stream", widget_id: 72045, append: "#hcw_embed_'.$uid.'", xid: "'.$uid.'"});
//    (function () {
//        if ("HC_LOAD_INIT" in window)
//            return;
//        HC_LOAD_INIT = true;
//        var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
//        var hcc = document.createElement("script");
//        hcc.type = "text/javascript";
//        hcc.async = true;
//        hcc.src = ("https:" == document.location.protocol ? "https" : "http") + "://w.hypercomments.com/widget/hc/72045/" + lang + "/widget.js";
//        var s = document.getElementsByTagName("script")[0];
//        s.parentNode.insertBefore(hcc, s.nextSibling);
//    })();
    
}


/*********************************************************************************************************************************************************

	***	Anchor Slider by Cedric Dugas   ***
	*** Http://www.position-absolute.com ***
	
	Never have an anchor jumping your content, slide it.

	Don't forget to put an id to your anchor ! You can use and modify this script for any project you want, but please leave this comment as credit.
	
************************************************************************************************************************************************************/

$(document).ready(function() {
	$(".anchorLink").anchorAnimate();
});

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({  
		speed : 500
	}, settings);	
	
	return this.each(function(){
		var caller = this;
		$(caller).click(function (event) {	
			event.preventDefault();
			var locationHref = window.location.href;
			var elementClick = $(caller).attr("href");
			
                        //console.log(elementClick); console.log(elementClick);
                        var destination = $(elementClick).offset().top; // -90
                        destination = destination > 100 ? destination - 100 : destination;
                        
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick;
			});
		  	return false;
		});
	});
}

document.addEventListener('copy', function(e) {
     clipdata = e.clipboardData || window.clipboardData;
    // console.log(clipdata.getData('text/plain'));
    // return;
    //
    // clipdata = e.clipboardData || window.clipboardData;
    //
     //var txt = clipdata.getData('text/plain');

    var txt = getSelectionText();

    //console.log(txt);

    clipdata.setData('text/plain', txt + ' Источник: ' + window.location.href);

    e.preventDefault();
});


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


// has copy
// Adding a parameter to the URL
function insertParam(key, value){

    //key = escape(key); value = escape(value);

    var kvp = window.location.search.substr(1).split('&');

    if (kvp == '') {
        window.location.search = '?' + key + '=' + value;
    } else {

        var i = kvp.length;
        var x;

        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) { kvp[kvp.length] = [key, value].join('=');  }

        window.location.search = kvp.join('&');
    }
}


/*********************************************************************************************************************************************************/
