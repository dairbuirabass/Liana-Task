$(document).ready(function () {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://www.lianatech.com/news/all-news.rss"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
      var xmlDoc = $.parseXML(contents);
      console.log(xmlDoc)
      var items = $("item", xmlDoc);
      console.log(items)
      $.each( items, function( index, current ) {
        if (index == 3) {
          return false;
        }
        $( ".card-title" ).eq( index )
          .html(current.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue.substring(5, 17));
        $( ".card-text" ).eq( index )
          .html(current.getElementsByTagName("title")[0].childNodes[0].nodeValue);
      })
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  });
