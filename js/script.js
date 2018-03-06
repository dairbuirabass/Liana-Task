$(document).ready(function () {
  var animationIsFinished = false;
  animateNumbers();
  $( window ).scroll(function() {
      animateNumbers();
  })

  function animateNumbers() {
    if (isScrolledIntoView( $("#clients")) && !animationIsFinished) {
      $("#clients").animateNumber({ number: 3000 }, 1500);
      $("#employees").animateNumber({ number: 180 }, 1000);
      $("#users").animateNumber({ number: 10000 }, 2000);
      animationIsFinished = true;
    }
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://www.lianatech.com/news/all-news.rss"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      var xmlDoc = $.parseXML(contents);
      var items = $("item", xmlDoc);
      $.each( items, function( index, current ) {
        if (index == 3) {
          return false;
        }

        // Setting date
        var date = new Date(current.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue),
        year      = date.getFullYear(),
        month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth() + 1, // 0 to 1
        day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
        newDate = day + '.' + month + '.' + year;
        $( ".news-card > a > .card-title" ).eq( index )
          .html(newDate);

        // Setting title
        var title = current.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        title = title.replace(/\[.*?\]/g, ""); // Remove extra tag
        $( ".news-card > a >.card-text" ).eq( index )
          .html(title);

        //Setting link
        var link  = current.getElementsByTagName("link")[0].childNodes[0].nodeValue + "";
        $( ".news-card > a" ).eq( index )
          .attr("href", link);
      })
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

    $("#subscribeBtn").on('click', function(event) {
      var email = $( "#email" ).val();
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( re.test(String(email).toLowerCase()) ) {
        $("#subscription-msg").html("");
        $("#thankYouModal").modal('show');
      } else {
        $("#subscription-msg")
          .removeClass("text-success")
          .addClass("text-danger")
          .html("Invalid email! Please try again");
      }
    });

    $("#submitSubscribe").on('click', function(event) {
      $("#subscription-msg")
      .removeClass("text-danger")
      .addClass("text-success")
      .html("Thanks! We will keep in touch");
    })
  });
