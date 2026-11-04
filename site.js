(function () {
  var locations = {
    "locations/byron-bay": {
      name: "Byron Bay",
      see: "The lighthouse sits on the most easterly point. On a clear load you can pick out the bay, the hinterland, and the beach you will land on.",
      price: "From $349",
    },
    "locations/cairns": {
      name: "Cairns",
      see: "The reef is on one side of the aircraft and the rainforest ranges are on the other. Morning loads are the ones to ask for.",
      price: "From $329",
    },
    "locations/noosa": {
      name: "Noosa",
      see: "The national park headland, the river mouth, and a long stretch of beach. It is the smallest of the three drop zones.",
      price: "From $309",
    },
  };

  var cards =
    '<div class="grid">' +
    '<article class="card"><h3>Byron Bay</h3><p>Cape Byron, the lighthouse, and a beach landing when the wind allows.</p><p class="price">From $349</p><a class="more" href="locations/byron-bay/">View drop zone</a></article>' +
    '<article class="card"><h3>Cairns</h3><p>Rainforest to the reef. Morning loads usually have the clearest view.</p><p class="price">From $329</p><a class="more" href="locations/cairns/">View drop zone</a></article>' +
    '<article class="card"><h3>Noosa</h3><p>The national park headland on one side and the river mouth on the other.</p><p class="price">From $309</p><a class="more" href="locations/noosa/">View drop zone</a></article>' +
    "</div>";

  function pageKey() {
    var marker = "/tomis-customer-website-test";
    var path = window.location.pathname;
    if (path === marker || path.indexOf(marker + "/") === 0) {
      path = path.slice(marker.length);
    }
    if (path.charAt(0) === "/") {
      path = path.slice(1);
    }
    if (path.length > 0 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    return path;
  }

  function head(crumb, heading) {
    return (
      '<div class="page-head"><div class="wrap"><p class="crumb">' +
      crumb +
      "</p><h1>" +
      heading +
      '</h1><p class="path" id="page-path"></p></div></div>'
    );
  }

  function locationPage(place) {
    return (
      "<p>Tandem jumps from 10,000 and 15,000 feet. You are attached to an instructor for the whole jump. The freefall lasts about 30 to 60 seconds, then the canopy ride back to the beach is several minutes.</p>" +
      "<h2>On the day</h2><ul><li>Arrive 45 minutes before your load.</li><li>Weight limit 100kg for a standard tandem. Ask in chat if you are close to the limit.</li><li>Wear sneakers and clothes you can move in. We provide the jump suit.</li></ul>" +
      "<h2>What you see</h2><p>" +
      place.see +
      '</p><p class="price">' +
      place.price +
      '</p><p><a href="booking/">Book this drop zone</a> · <a href="booking/price/">Compare packages</a></p>'
    );
  }

  function render(key) {
    if (key === "") {
      document.title = "TOMIS Skydives";
      return (
        '<section class="hero"><div class="hero-inner"><h1>Beachfront tandem skydives</h1><p>Three coastal drop zones. An instructor beside you. Sand under your feet at the end.</p><p class="path" id="page-path"></p><div class="actions"><a href="locations/">Choose a location</a><a class="secondary" href="booking/price/">See prices</a></div></div></section>' +
        '<section class="section"><div class="wrap"><h2>Drop zones</h2><p class="lead">Pick the coast you want under the canopy. Each location page has its own packages.</p>' +
        cards +
        "</div></section>" +
        '<section class="section"><div class="wrap"><h2>How a jump works</h2><div class="steps"><div class="step"><strong>1. Check in</strong> Paperwork, a harness, and a short brief on the landing.</div><div class="step"><strong>2. The ride up</strong> About 20 minutes to altitude, with the door open for the view.</div><div class="step"><strong>3. Freefall</strong> Your instructor flies the jump. You look at the coast.</div><div class="step"><strong>4. Beach landing</strong> A canopy ride down, then photos if you added a media package.</div></div></div></section>'
      );
    }

    if (key === "locations") {
      document.title = "Locations | TOMIS Skydives";
      return (
        head('<a href="./">Home</a> / Locations', "Locations") +
        '<main class="section"><div class="wrap prose"><p class="lead">Beach landings in New South Wales and Queensland. Choose a drop zone to see the view, the altitude, and the price.</p>' +
        cards +
        "</div></main>"
      );
    }

    if (locations[key]) {
      var place = locations[key];
      document.title = place.name + " | TOMIS Skydives";
      return (
        head(
          '<a href="./">Home</a> / <a href="locations/">Locations</a> / ' + place.name,
          place.name
        ) +
        '<main class="section"><div class="wrap prose"><p class="lead">Tandem skydives at our ' +
        place.name +
        " drop zone.</p>" +
        locationPage(place) +
        "</div></main>"
      );
    }

    var pages = {
      "what-to-expect": [
        "What to expect | TOMIS Skydives",
        '<a href="./">Home</a> / What to expect',
        "Your first tandem",
        "You do not need to have jumped before. The instructor wears the parachute. You wear a harness that clips to theirs.",
        "<h2>Before you leave home</h2><ul><li>Eat a normal meal. An empty stomach is worse than a small breakfast.</li><li>Leave loose jewellery and hats in the car.</li><li>Bring closed shoes. Thongs stay on the ground.</li></ul><h2>In the air</h2><p>You sit on the floor of the aircraft for the climb. At altitude you shuffle to the door, the instructor counts you out, and the freefall starts. After the canopy opens, the rest of the ride is quiet enough to talk.</p><p><a href=\"booking/price/\">See which altitude is in each package</a></p>",
      ],
      "media-packages": [
        "Photo and video | TOMIS Skydives",
        '<a href="./">Home</a> / Photo and video',
        "Photo and video",
        "Media is filmed during the jump and handed over the same day. It is optional. The skydive price does not include it.",
        '<div class="table-wrap"><table><thead><tr><th>Package</th><th>What you get</th><th>Add-on</th></tr></thead><tbody><tr><td>Handcam</td><td>Your instructor films the freefall and the landing.</td><td>$99</td></tr><tr><td>Outside video</td><td>A second instructor flies beside you with a camera.</td><td>$149</td></tr><tr><td>Photo set</td><td>Edited stills from the freefall, ready to download.</td><td>$79</td></tr></tbody></table></div><p><a href="booking/price/">Add media when you compare jump prices</a></p>',
      ],
      transfers: [
        "Transfers | TOMIS Skydives",
        '<a href="./">Home</a> / Transfers',
        "Transfers",
        "Hotel pickups run on booked jump days. Seats are limited, so add a transfer when you reserve the jump.",
        "<ul><li>Byron Bay: Byron township and Lennox Head.</li><li>Cairns: Cairns CBD and the northern beaches.</li><li>Noosa: Noosa Heads, Noosaville, and Hastings Street.</li></ul><p>Pickup is about two hours before the load. The same vehicle brings you back after the landing.</p>",
      ],
      faq: [
        "FAQ | TOMIS Skydives",
        '<a href="./">Home</a> / FAQ',
        "FAQ",
        "Short answers. The chat button can take a question that is not on this list.",
        "<h2>How old do I have to be?</h2><p>16 or older for a tandem, with a parent or guardian at check-in if you are under 18.</p><h2>Is there a weight limit?</h2><p>100kg in the clothes you will jump in. Above that, ask before you book so we can check the aircraft for that day.</p><h2>What if the weather turns?</h2><p>We move you to the next load or the next day. A weather hold is not a cancellation fee.</p><h2>Can I jump with glasses?</h2><p>Yes. We tape them or give you a strap. Contact lenses are fine.</p>",
      ],
      deals: [
        "Offers | TOMIS Skydives",
        '<a href="./">Home</a> / Offers',
        "Offers",
        "These offers apply when you book on this demo site's prices page. They are sample offers for testing, not a live checkout.",
        '<div class="grid"><article class="card"><h3>Weekday morning</h3><p>Tuesday to Thursday loads before 11am. $40 off a 15,000 foot tandem.</p></article><article class="card"><h3>Groups of four</h3><p>Book four tandems on the same load and each person saves $30.</p></article><article class="card"><h3>Return jump</h3><p>A second tandem within 12 months is $60 off the drop zone price.</p></article></div><p><a href="booking/price/">Apply an offer on the prices page</a></p>',
      ],
      "gift-vouchers": [
        "Gift vouchers | TOMIS Skydives",
        '<a href="./">Home</a> / Gift vouchers',
        "Gift vouchers",
        "A voucher holds a tandem at one drop zone for 12 months. The person who receives it picks the day.",
        "<ul><li>Choose Byron Bay, Cairns, or Noosa when you buy it.</li><li>Media packages can be added later. They are not on the voucher.</li><li>Vouchers on this demo site are not issued and cannot be redeemed.</li></ul><p><a href=\"booking/price/\">Voucher amounts follow the prices page</a></p>",
      ],
      "our-story": [
        "Our story | TOMIS Skydives",
        '<a href="./">Home</a> / Our story',
        "Our story",
        "TOMIS Skydives is a fictional drop zone company used to test the chat widget on a tourism website.",
        "<p>The pages follow the shape of a beachfront skydive operator: a location for each drop zone, a prices page under booking, and separate pages for transfers, media, and vouchers.</p><p>Use the path shown under each heading when you save a page-specific announcement.</p>",
      ],
      "the-crew": [
        "The crew | TOMIS Skydives",
        '<a href="./">Home</a> / The crew',
        "The crew",
        "Instructors, pilots, and manifest staff. These are sample roles for the demo site.",
        "<ul><li>Tandem instructors fly the jump and land the canopy.</li><li>Camera flyers only come on loads that booked outside video.</li><li>Manifest confirms your weight, pickup, and load time.</li></ul>",
      ],
      contact: [
        "Contact | TOMIS Skydives",
        '<a href="./">Home</a> / Contact',
        "Contact",
        "This site does not take phone bookings. Open the chat button to talk to the widget.",
        "<ul><li>Byron Bay manifest: sample desk, on the airfield.</li><li>Cairns manifest: sample desk, on the airfield.</li><li>Noosa manifest: sample desk, on the airfield.</li></ul><p>Hours on every drop zone are 7am to 6pm AEST, seven days.</p>",
      ],
      booking: [
        "Book | TOMIS Skydives",
        '<a href="./">Home</a> / Book',
        "Book a jump",
        "Choose a drop zone first. The next step on a real operator site would be a date and a package. This demo stops at the prices page.",
        '<div class="grid"><article class="card"><h3>1. Location</h3><p>Byron Bay, Cairns, or Noosa. The price changes with the drop zone.</p><a class="more" href="locations/">Choose a location</a></article><article class="card"><h3>2. Package</h3><p>10,000 or 15,000 feet, then handcam or outside video if you want it.</p><a class="more" href="booking/price/">Open prices</a></article><article class="card"><h3>3. Load time</h3><p>Mornings are calmer. A real booking would hold a seat on a load. This page does not.</p></article></div>',
      ],
      "booking/price": [
        "Prices | TOMIS Skydives",
        '<a href="./">Home</a> / Prices',
        "Prices",
        "Tandem prices by drop zone. Photo and video is added on top. These amounts are samples on this demo site.",
        '<div class="table-wrap"><table><thead><tr><th>Drop zone</th><th>10,000 ft</th><th>15,000 ft</th><th>Handcam add-on</th></tr></thead><tbody><tr><td>Byron Bay</td><td>$349</td><td>$429</td><td>$99</td></tr><tr><td>Cairns</td><td>$329</td><td>$409</td><td>$99</td></tr><tr><td>Noosa</td><td>$309</td><td>$389</td><td>$99</td></tr></tbody></table></div><p>Weekday morning and group offers are listed on the <a href="deals/">offers page</a>. To reserve a seat, go back to <a href="booking/">booking</a>.</p>',
      ],
    };

    if (pages[key]) {
      var page = pages[key];
      document.title = page[0];
      return (
        head(page[1], page[2]) +
        '<main class="section"><div class="wrap prose"><p class="lead">' +
        page[3] +
        "</p>" +
        page[4] +
        "</div></main>"
      );
    }

    document.title = "TOMIS Skydives";
    return (
      head('<a href="./">Home</a>', "This path") +
      '<main class="section"><div class="wrap prose"><p class="lead">There is no drop zone page here. The chat button is still the demo widget from the homepage.</p></div></main>'
    );
  }

  function hrefKey(href) {
    var value = href || "";
    if (value === "./" || value === "") {
      return "";
    }
    if (value.charAt(value.length - 1) === "/") {
      value = value.slice(0, -1);
    }
    return value;
  }

  function markCurrent(key) {
    var groups = {
      locations: ["locations/byron-bay", "locations/cairns", "locations/noosa"],
      "what-to-expect": ["media-packages", "transfers", "faq"],
      "our-story": ["the-crew", "contact"],
    };
    var links = document.querySelectorAll(".menu a");
    var index;
    for (index = 0; index < links.length; index += 1) {
      var link = links[index];
      var href = hrefKey(link.getAttribute("href"));
      var current = false;
      if (link.classList.contains("book-link")) {
        current = key === "booking";
      } else if (href === key) {
        current = true;
      } else if (href !== "" && key.indexOf(href + "/") === 0) {
        current = true;
      } else if (groups[href]) {
        var childIndex;
        for (childIndex = 0; childIndex < groups[href].length; childIndex += 1) {
          var child = groups[href][childIndex];
          if (key === child || key.indexOf(child + "/") === 0) {
            current = true;
          }
        }
      }
      if (current) {
        link.classList.add("is-current");
      }
    }
  }

  var key = pageKey();
  var app = document.getElementById("app");
  if (app) {
    app.innerHTML = render(key);
  }
  var pathLabel = document.getElementById("page-path");
  if (pathLabel) {
    pathLabel.textContent = window.location.pathname;
  }
  markCurrent(key);
})();
