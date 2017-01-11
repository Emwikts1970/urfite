$(document).ready(function() {
  // Select all <pre> tags that do not have class 'r'
  
  $chunks = $('.fold');

  $chunks.each(function () {
    // hide source code
    if ( $(this).hasClass('s') ) {
      $('pre.r', this).prepend("<div class=\"showopt\">Hide Source</div><br style=\"line-height:22px;\"/>");
      $('pre.r', this).children('code').attr('class', 'folded');
    }
    
    // hide output
    if ( $(this).hasClass('o') ) {
    
      // text Output
      $('pre:not(.r)', this).has('code').prepend("<div class=\"showopt\">Hide Output</div><br style=\"line-height:22px;\"/>");
      $('pre:not(.r)', this).children('code:not(r)').addClass('folded');
      
      // plots
      $(this).find('img').wrap('<pre class=\"plot\"></pre>');
      $('pre.plot', this).prepend("<div class=\"showopt\">Show Plot</div><br style=\"line-height:22px;\"/>");
      $('pre.plot', this).children('img').addClass('folded');
      
    }

  });
  

  $(".showopt").click(function() {
      var label = $(this).html();
      if(label.indexOf("Show") >= 0) {
          $(this).html(label.replace("Show", "Hide"));
      } else {
          $(this).html(label.replace("Hide", "Show"));
          
      }
      $(this).parent().find('code, img').slideToggle('fast', 'swing');
  });
  
});





