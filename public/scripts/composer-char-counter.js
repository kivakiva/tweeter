

$(document).ready(function() {
  // --- our code goes here ---
  $('textarea').on("keyup", function(event) {
    
    let chars = $(this).val().length;
    let counter = $($(this)[0].parentNode[2]);

    counter.val(140 - chars);

    let remaining =  counter.val();
    let excess = counter[0].attributes[3];

    if (remaining < 0) {
      excess.value = true;
    }
  })
});