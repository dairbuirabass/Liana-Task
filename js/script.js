$(document).ready(function () {
  var animationIsFinished_clients = false;
  var animationIsFinished_employees = false;
  var animationIsFinished_users = false;
  animateNumbers();
  $( window ).scroll(function() {
      animateNumbers();
  })

  function animateNumbers() {
    if (isScrolledIntoView( $("#clients")) && !animationIsFinished_clients) {
      $("#clients").animateNumber({ number: 3000 }, 1500);
      animationIsFinished_clients = true;
    }
    if (isScrolledIntoView( $("#employees")) && !animationIsFinished_employees) {
      $("#employees").animateNumber({ number: 180 }, 1000);
      animationIsFinished_employees = true;
    }
    if (isScrolledIntoView( $("#users")) && !animationIsFinished_users) {
      $("#users").animateNumber({ number: 10000 }, 2000);
      animationIsFinished_users = true;
    }
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  // Heroku app that prepends Allow-Origin policy
  const proxyurl = "https://cors-allow-origin-policy.herokuapp.com/";
  const url = "https://www.lianatech.com/news/all-news.rss";
  fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => {
      var xmlDoc = $.parseXML(contents);
      var items = $("item", xmlDoc);
      var curHeight = $(".card-container").height();
      var autoHeight = 0;
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

        if (autoHeight < $(".card-container").eq(index).height()) {
          autoHeight = $(".card-container").eq(index).height();
        }
      })
      $(".card-container").height(curHeight).animate({height: autoHeight}, 1000, function () { $(".card-container").height('auto'); })
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
