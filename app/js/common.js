$(document).ready(function(){

    var items = [];
    var sorted = [];

    $.getJSON('./js/data.json', function(data) {
        (function parsObj(data){
            for (var key in data) {
                if(typeof data[key] !== 'object'){
                    items.push({'order':key, 'color':data[key]});
                } else {
                    parsObj(data[key]);
                }
            }
        }(data));
    });


    for ( var i = 0; i < items.length; i++) {
        sorted[i] = items[i];
    }

    sorted.sort(function(a, b) {
        return a.order > b.order;
    });
    console.log(sorted);
    



    $('body').append('<div class="wpr"></div>');

    for ( var i = 0; i < items.length; i++) {
        
        $('body .wpr').append('<div class="square' + items[i]['order'] + '"></div>');

        if(i % 2) {
            $('body').find('.square' + items[i]['order']).css('box-shadow', '0 0 25px 5px #000');
        }

        if((i + 1) % 3 == 0) {
            $('.wpr').append('<br>');
        }
    }

    $('body').append('<button>Sort squares</button>');


    //output(items);

    $('div[class^="square"]').on('mouseenter', function() {
        $(this).prev().addClass('previous_efect');
        $(this).next().not('button').addClass('next_efect');
    });

    $('div[class^="square"]').on('mouseleave', function() {
        $(this).prev().removeClass('previous_efect');
        $(this).next().removeClass('next_efect');
    });

    $('div[class^="square"]').on('click', function() {
        var borderWide =  parseInt($(this).css('border-width'));
        if ($(this).hasClass('border_wide')) {
            $(this).css('border-width', borderWide / 3).removeClass('border_wide');
        } else {            
            $(this).css('border-width', borderWide * 3).addClass('border_wide');
        }
    });

    $('button').on('click', function() { 
        if ($(this).hasClass('sorted-sqr')) {
            output(items);
            $(this).removeClass('sorted-sqr');
        } else {
            output(sorted);
            $(this).addClass('sorted-sqr');
        }
    });



    function output(arrStyles) {
        for ( var i = 0; i < arrStyles.length; i++) {
            var color = arrStyles[i]["color"];
            var order = arrStyles[i]['order'];
            var style = (order % 2) ? "border-color" : "background";

            $('body').find('.wpr .square' + order).css(style, color).css('border-width', order);
        }
    }
});