/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  loadTweets();

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

 const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const $tweetsContainer = $('#tweets-container')
  $tweetsContainer.empty();

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  }


  const $textarea = $('textarea');
  // console.log($('textarea'));
  $('form').submit(function (event) {
    event.preventDefault();
    const characters = $textarea.val().trim().length;
    console.log('null or empty?', $textarea.val()=== null)
    if ( characters === 0 ) {
      alert("cat got your tongue?")
    } else if (characters > 140) {
      alert("much too much!")
    } else {      
      const $serializeTweet = $(this).serialize();
      console.log($textarea.val());
  
      $.post('/tweets', $serializeTweet)
      .then(loadTweets);
    }
  })










})

