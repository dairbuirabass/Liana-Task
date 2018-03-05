$(document).ready(function () {
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
          console.log(newDate)

        // Setting title
        var title = current.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        title = title.replace(/\[.*?\]/g, ""); // Remove extra tag
        $( ".news-card > a >.card-text" ).eq( index )
          .html(title);
          console.log(title)

        //Setting link
        var link  = current.getElementsByTagName("link")[0].childNodes[0].nodeValue + "";
        $( ".news-card > a" ).eq( index )
          .attr("href", link);
      })
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  });
