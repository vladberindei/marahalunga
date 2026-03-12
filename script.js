// script.js for Mara Halunga website

(function () {
  // Detect language from the current page filename
  var lang = 'en';
  if (location.pathname.indexOf('index-pt') !== -1) lang = 'pt';

  var labels = {
    en: {
      upcoming: 'Upcoming Concerts',
      past: 'Past Concerts',
      noUpcoming: 'New dates coming soon — stay tuned!'
    },
    pt: {
      upcoming: 'Próximos Concertos',
      past: 'Concertos Anteriores',
      noUpcoming: 'Novas datas em breve — fique ligado!'
    }
  };

  function formatConcert(c) {
    var loc = c.location[lang] || c.location.en;
    var text = c.name;
    if (loc) text += ' - ' + loc;
    text += ' (' + c.years + ')';
    return text;
  }

  function buildList(concerts) {
    var ul = document.createElement('ul');
    ul.className = 'achievements';
    concerts.forEach(function (c) {
      var li = document.createElement('li');
      li.textContent = formatConcert(c);
      ul.appendChild(li);
    });
    return ul;
  }

  function render(data) {
    var container = document.getElementById('concerts-data');
    if (!container) return;

    var l = labels[lang];

    // Upcoming section
    var upSection = document.createElement('div');
    upSection.className = 'concerts-subsection';
    var upTitle = document.createElement('h3');
    upTitle.className = 'concerts-subsection-title';
    upTitle.textContent = l.upcoming;
    upSection.appendChild(upTitle);

    var upGrid = document.createElement('div');
    upGrid.className = 'performance-grid';
    var upCard = document.createElement('div');
    upCard.className = 'performance-card';

    if (data.upcoming.length === 0) {
      var msg = document.createElement('p');
      msg.className = 'no-concerts-message';
      msg.textContent = l.noUpcoming;
      upCard.appendChild(msg);
    } else {
      upCard.appendChild(buildList(data.upcoming));
    }
    upGrid.appendChild(upCard);
    upSection.appendChild(upGrid);
    container.appendChild(upSection);

    // Past section
    if (data.past.length === 0) return;

    var pastSection = document.createElement('div');
    pastSection.className = 'concerts-subsection';
    var pastTitle = document.createElement('h3');
    pastTitle.className = 'concerts-subsection-title';
    pastTitle.textContent = l.past;
    pastSection.appendChild(pastTitle);

    var pastGrid = document.createElement('div');
    pastGrid.className = 'performance-grid';

    // Split into two cards for visual balance (same as the original layout)
    var mid = Math.ceil(data.past.length / 2);
    var firstHalf = data.past.slice(0, mid);
    var secondHalf = data.past.slice(mid);

    var card1 = document.createElement('div');
    card1.className = 'performance-card';
    card1.appendChild(buildList(firstHalf));
    pastGrid.appendChild(card1);

    if (secondHalf.length > 0) {
      var card2 = document.createElement('div');
      card2.className = 'performance-card';
      card2.appendChild(buildList(secondHalf));
      pastGrid.appendChild(card2);
    }

    pastSection.appendChild(pastGrid);
    container.appendChild(pastSection);
  }

  // Fetch and render
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'assets/data/concerts.json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      render(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
})();
