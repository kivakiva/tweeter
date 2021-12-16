$(() => {

  const loadTweets = function () {
    $.ajax({

      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.err(err);
      }
    });
  };

  //load initial tweets
  loadTweets();

  //helper to prevent mailcious code
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
 const createTweetElement = (tweetObject) => {

  const $tweet = $(
    `  <article class="tweets">
    <header>
      <div class="profile">
        <img class="icon" src="${tweetObject.user.avatars}">
        <div class="name">${tweetObject.user.name}</div>
      </div>
      <div>
        <div class="username">${tweetObject.user.handle}</div>
      </div>
    </header>
    <div class="content">${escape(tweetObject.content.text)}</div>
    <footer>
      <div class="age">
        ${timeago.format(tweetObject.created_at)}
      </div>
      <div class="social-icons">
        <i class="fas fa-flag"></i> 
        <i class="fas fa-retweet"></i> 
        <i class="far fa-heart"></i></div>
    </footer>
  </article>`
  )

  return $tweet;
 }

 //render tweets in ascending order by date
 const renderTweets = function(tweets) {

  const $tweetsContainer = $('#tweets-container')
  $tweetsContainer.empty();

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  //handle submission and validation
  const $emptyError = $(".no-tweet");
  $emptyError.hide();
  const $tooLongError = $(".long-tweet");
  $tooLongError.hide();
  const $textarea = $('textarea');

  $('form').submit(function (event) {
    event.preventDefault();
    const characters = $textarea.val().trim().length;
    
    if ( characters === 0 || $textarea === null) {
      $tooLongError.hide(300);
      $emptyError.show(300);
      
    } else if (characters > 140) {
      $emptyError.hide(300);
      $tooLongError.show(300);
      
    } else {      
      $emptyError.hide(300);
      $tooLongError.hide(300);
      const $serializeTweet = $(this).serialize();  
      $.post('/tweets', $serializeTweet)
      .then(loadTweets);
    }
  });










})

