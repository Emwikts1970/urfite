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
  // Select the <pre> tags, then choose their <code> child tags and toggle visibility 
  $output.children("code").fadeToggle("fast", "linear");

  // When the show/hide-button is clicked, toggle the current state and
  // change the button text
  $(".showopt").click(function() {
  	  $btn = $(this);
      $chunk = $btn.next("code");
	    $chunk.slideToggle(350, "swing");
	    if($btn.html() === "Show Output") {
	      $btn.html("Hide Output");
	    } else {
	  	  $btn.html("Show Output");
	    }
  });
});



