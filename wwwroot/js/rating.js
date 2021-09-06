/* 
 * Stars rating
 * 
 */

$.originalresult = 0;

var rating={

    ratingCode:
    '<div class="star-rating" id="rating1result0" style = "background-position:0 0;">'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +'</div>'
    +'<div class="result">'
    //+   '<!--span style="color:green" class="vote_avg">0</span-->'
    +   '(<img src="/images/icon_rating_people.png" /><span class="vote_num">0</span>)'
    +'</div>',


    show:function(){

        var curr_page = $('.place-rating').attr('page');
        
        if(!curr_page)
            return;

        //alert(curr_page);
        $.ajax({
            type: "POST",
            url: "/tools/ajax-handler.php",
            data: "type=voting&cmd=get&id=" + curr_page,
            success: function(data)
            {
                if(data!=''){
                    var avg = data.split(';')[0];
                    var num = data.split(';')[1];
                    var rating = parseFloat(avg);
                
                    rating = num = 0;       // tmp HUCK for disable old ratings  !!!!!
                    
                   // $('.star-rating').css("background-position","0 -" + (32 * rating) + "px");
                    //$('.vote_num').html(num);
                
                    $.originalresult = rating;
                }
                
            //alert(data);
            //style = "background-position:0 -" + (32 * stars) + "px;";
            }
        }); 

        $('.place-rating').html(this.ratingCode);

        this.handler();
        
    //$('.star-rating').css("background-position","0 -" + (32 * stars) + "px");
    },
   
    change:function(stars){
        if(stars > 0 & stars <= 5)
            $('.star-rating').css("background-position","0 -" + (32 * stars) + "px");
    },

    init:function(){
        
        jQuery(document).ready(function($){
            var mainobj=rating
            
            // show stars
            $('.place-rating').ready(function (){   
                
                mainobj.show();
            });
            
        })
    },
    
    handler:function(){
        
//        $('.star').mouseover(function (){
//            var star = $(this).index() + 1;
//            $(this).parent().css("background-position","0 -" + (32 * star) + "px");
//        });
            
//        $('.star-rating').mouseout(function (){
//            //var originalresult = $(this).attr('id').split('result')[1];
//            $.originalresult = isNaN($.originalresult)? 0 : $.originalresult;
//            $(this).css("background-position","0 -" + (32 * $.originalresult) + "px");
//        });                    

        $('.star').click(function (){
            $('.vote_voted').html('Голосуют только слушатели!');
        });
        
//        
//        $('.star').click(function (){
//            //var id = $(this).parent().attr('id').split('rating')[1];
//            var id = $('.place-rating').attr('page');
//            var ip = $('.place-rating').attr('ip');
//            var vote = $(this).index() + 1;
//
//            //alert(id + ' ' + vote + ' ' + ip);
//            
//            
//            $.ajax({
//                type: "POST",
//                url: "/tools/ajax-handler.php",
//                data: "type=voting&cmd=set&id=" + id + "&vote=" + vote + "&ip=" + ip,
//                success: function(data)
//                {
//                    
//                    if(data != ''){
//                        if(data == 'voted')
//                            $('.vote_voted').html('Вы уже голосовали!');
//                        else{
//                            var avg = data.split(';')[0];
//                            var num = data.split(';')[1];
//                            var rating = parseFloat(avg);
//                        
//                            $('.star-rating').css("background-position","0 -" + (32 * rating) + "px");
//                            $('.vote_num').html(num);
//                        }
//                    }
//                }                
//            });
//            
//            $(this).parent().removeAttr("id");
//            $(this).parent().html(" ");
//        });  
        
    }
}

var rating_ext={

    ratingCode:
    '<div><span class="rating_mid-"></span></div>'
    + '<div class="star-rating-" id="rating1result0" style = "background-position:0 0;">'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +   '<div class="star"></div>'
    +'</div>'
    +'<div class="result">'
    //+   '<!--span style="color:green" class="vote_avg">0</span-->'
    //+   '(<span class="vote_num">0</span>)'
    +'</div>',


    show:function(){

        var curr_page = $('.show-rating').attr('page');
        comd = 'get';
        
        if(curr_page == undefined){
            curr_page = $('.place-rating').attr('page');
            comd = 'get-teacher';
        }

        //alert(curr_page);
        $.ajax({
            type: "POST",
            url: "/tools/ajax-handler.php",
            data: "type=rating&cmd="+comd+"&id=" + curr_page,
            dataType: "json",
            success: function(data)
            {
                var rating = data.rating;
                var rating_stars = data.rating_st;
                //var avg = data.split(';')[0];
                var num = data.number;
                
//                if(data!=''){
//                    var avg = data.split(';')[0];
//                    var num = data.split(';')[1];
//                    var rating = parseFloat(avg);
                //alert(num + ' ' + rating);
                
                    
                
                    $('.star-rating').css("background-position","0 -" + (32 * rating_stars) + "px");
                    
                    $('.vote_num').html(num);
                    
                    $('.rating_mid').html(rating);
                    
                
 //                   $.originalresult = rating;
//                }
                
            //alert(data);
            //style = "background-position:0 -" + (32 * stars) + "px;";
            }
        }); 

        $('.show-rating').html(this.ratingCode);

        this.handler();
    //$('.star-rating').css("background-position","0 -" + (32 * stars) + "px");
    },
   
    change:function(stars){
        if(stars > 0 & stars <= 5)
            $('.star-rating').css("background-position","0 -" + (32 * stars) + "px");
    },

    init:function(){
        
        jQuery(document).ready(function($){
            var mainobj1=rating
            var mainobj2=rating_ext
            
            // show stars
            $('.show-rating').ready(function (){   
                
                mainobj1.show();
                mainobj2.show();
            });
            
        })
    },
    
    handler:function(){
        
        $('.star').click(function (){
            $('.vote_voted').html('Голосуют только слушатели!');
        });
        
        
    }
}

//rating.init();
rating_ext.init()
