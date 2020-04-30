const rootLinkRegion = 'https://apps.omegatheme.com/region-restrictions/';
if(typeof $ == 'undefined'){

    javascript: (function(e, s) {
        e.src = s;
        e.onload = function() {
            $ = jQuery.noConflict(); 
            $.getScript(`${rootLinkRegion}app.js?v=12`) ;
        };
        document.head.appendChild(e);
    })(document.createElement('script'), 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

 
  
}else{ 
    $.getScript(`${rootLinkRegion}app.js?v=12`) ;
}