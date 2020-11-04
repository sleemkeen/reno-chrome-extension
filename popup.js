$(function(){
    var nameInLocal =  localStorage.getItem('name');
    $('#inputName').html(nameInLocal);

    $("body").vegas({
        slides: [
            { src: "img/img1.jpg" },
            { src: "img/img2.jpg" },
            { src: "img/img3.jpg"},
            { src: "img/img4.jpg"},
            { src: "img/img5.jpg"},

        ],
        overlay: 'vegas/overlays/08.png',
        animation: 'kenburns',
    });


    function displayClock() {
      let d = new Date();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let clock = document.querySelector(".clock");
      let session = "AM";
      if (hours > 12){
        hours = hours - 12;  
        session = "PM"
      };
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      let time = hours + ":" + minutes + ":" + seconds + " " + session;
      clock.innerHTML = time;
    }


    setInterval(displayClock, 1000);

    $('.inputName').blur(function(){
        var content = $('#inputName').html();
        if(content == ""){
            localStorage.setItem('name', "Nick Name");
            $('#inputName').html("Nick Name");
        }else{
            localStorage.setItem('name', content);
        }
       
    })

    $('.inputName').focus(function(){
         $('#inputName').html("");
        // console.log(content);
    });

    $('.inputName').keypress(function (e) {
        var content = $('#inputName').html();
        if (e.which == 13) {

            if(content == ""){
                localStorage.setItem('name', "Nick Name");
                $('#inputName').html("Nick Name");
            }else{
                localStorage.setItem('name', content);
            }
            
          return false;    //<---- Add this line
        }
      });

      $('#hello').click(function(){
          $('#inputName').focus();
      });


      //Fetch Tweet

      const URL = "http://localhost:8082/statuses/user_timeline";

    function fetchTweet(){
        fetch(URL)
        .then(res => res.json())
        .then(result => {
          var tweetArray = result;
          setInterval(randomTweet, 10000, tweetArray);         
        });
  
      }

      var i = -1;
      function randomTweet(arg){
        i+=1  
        var twtObj = arg[i];
        parseTweet(twtObj.retweeted_status.full_text);
        $('.countComment').html(twtObj.comment_count || 0);
        $('.countRetweet').html(twtObj.retweet_count);
        $('.countReply').html(twtObj.favorite_count);
        $('#tweetimg').attr('src',twtObj.retweeted_status.user.profile_image_url_https);
        $('#tweetName').html(twtObj.retweeted_status.user.name);
        $('#screenName').html('@'+twtObj.retweeted_status.user.screen_name);
        $('.tweetsCard').fadeIn(1000);





      }

      fetchTweet();

    


      function parseLineBreaks(tweet) {
        return tweet.replace(/\n/g, '<br>');
      }

      function parseHashtag(tweet) {
        return tweet.replace(/[#]+[A-Za-z0-9-_]+/g, (t) => {
          const tag = t.replace('#', '');
          return `<a class="twitter-link" href="https://www.twitter.com/hashtag/${tag}" target="_blank">#${tag}</a>`;
        });
      };

      function parseUsername(tweet) {
        return tweet.replace(/[@]+[A-Za-z0-9-_]+/g, (t) => {
          const tag = t.replace('@', '');
          return `<a class="twitter-link" href="https://www.twitter.com/${tag}" target="_blank">@${tag}</a>`;
        });
      }


      function parseLinks(tweet) {
        console.log(tweet);
        return tweet.replace(/(?:(https?:\/\/[^\s]+))/m, '<a href="$1" class="twitter-link" target="_blank">$1</a>');
        
        
      }

      function parseTweet(tweet) {
        var k = parseLineBreaks(
          parseHashtag(
            parseUsername(
              parseLinks(tweet)
            ),
          ),
        );
        $('#mainTweet').html(k);
      };


     
  
    
    
});



