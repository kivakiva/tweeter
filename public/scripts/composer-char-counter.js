$(document).ready(function() {

  $('textarea').on("input", function(event) {
    
    //personal choice to not include untrimmed whitespace towards count
    let chars = $(this).val().length;
    let counter = $($(this)[0].parentNode[2]);
    counter.val(140 - chars);

    let remaining =  counter.val();
    let exceedsLimit = counter[0].attributes[3];

    if (remaining < 0) {
      exceedsLimit.value = true;
    } else {
      exceedsLimit.value = false;
    }
  })
});