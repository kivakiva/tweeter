$(document).ready(function() {
  // --- our code goes here ---
  $('textarea').on("keyup", function(event) {
    console.log($(this).val().length);
    let chars = $(this).val().length;
    $($(this)[0].parentNode[2]).val(140 - chars);
    console.log($($(this)[0].parentNode[2]).val())
  })
});
//[0].parentNode[2]

//[0].form.length
// parent tweeta -> sibling tweetb -> child output --> val