$(document).ready(function() {
  $output = $("pre > code").parent().not(".r"); // All pre's that do not have class 'r'
  $output.prepend("<div class=\"showopt\">Show Output</div>");
  $code = $output.children("code");
  $code.fadeToggle("fast", "linear");
  
  $(".showopt").click(function() {
  	  $this = $(this);
      $n = $(this).next("code");
	  $n.fadeToggle("fast", "linear");
	  if($this.html() === "Show Output") {
	      $this.html("Hide Output");
	  } else {
	  	  $this.html("Show Output");
	  }
  });
});



