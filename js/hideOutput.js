$(document).ready(function() {
  /*
  Form of output chunks:
  <pre>
    <code>
    </code>
  </pre>
  
  Form of code chunks:
  <pre clasS="r">
    <code>
    </code>
  </pre>
  */
  
  // Select all <pre> tags that do not have class 'r'
  $output = $("pre").not(".r");
  // Add the "show/hide-button" to each output chunk
  $output.prepend("<div class=\"showopt\">Show Output</div>");
  // Create selector variable for the <code> tags that include the output
  $code = $output.children("code");
  // When the page is loaded, hide all output chunks
  $code.fadeToggle("fast", "linear");
  
  
  // When the show/hide-button is clicked, toggle the current state and
  // change the button text
  $(".showopt").click(function() {
  	  $btn = $(this);
      $chunk = $(this).next("code");
	    $chunk.fadeToggle("fast", "linear");
	    if($btn.html() === "Show Output") {
	      $btn.html("Hide Output");
	    } else {
	  	  $btn.html("Show Output");
	    }
  });
});



