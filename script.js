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

  // Determine if a concert date is in the future.
  // Supports "2025", "2025-07", "2025-07-15", and optional "time" field.
  function isUpcoming(concert) {
    var now = new Date();
    var parts = concert.date.split('-');
    var year = parseInt(parts[0], 10);
    var month = parts[1] ? parseInt(parts[1], 10) : null;
    var day = parts[2] ? parseInt(parts[2], 10) : null;

    if (day && concert.time) {
      // Full date + time: compare against exact moment
      var dt = new Date(concert.date + 'T' + concert.time);
      return dt >= now;
    }
    if (day) {
      // Full date, no time: upcoming if the date hasn't passed yet
      // Use end of day so a concert today still shows as upcoming
      var endOfDay = new Date(year, month - 1, day, 23, 59, 59);
      return endOfDay >= now;
    }
    if (month) {
      // Year-month only: upcoming if we haven't finished that month
      var endOfMonth = new Date(year, month, 0, 23, 59, 59);
      return endOfMonth >= now;
    }
    // Year only: upcoming if we're still in or before that year
    return year >= now.getFullYear();
  }

  // Format a concert's date for display
  function formatDate(concert) {
    var parts = concert.date.split('-');
    if (parts.length === 1) return parts[0]; // year only

    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var monthNames = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
           'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    };
    var mName = (monthNames[lang] || monthNames.en)[month - 1];

    if (parts.length === 2) return mName + ' ' + year;

    var day = parseInt(parts[2], 10);
    var dateStr = day + ' ' + mName + ' ' + year;
    if (concert.time) dateStr += ', ' + concert.time;
    return dateStr;
  }

  function formatConcert(c) {
    var loc = (c.location && (c.location[lang] || c.location.en)) || '';
    var text = c.name;
    if (loc) text += ' - ' + loc;
    text += ' (' + formatDate(c) + ')';
    return text;
  }

  var ticketLabel = { en: 'Tickets', pt: 'Ingressos' };

  function buildList(concerts) {
    var ul = document.createElement('ul');
    ul.className = 'achievements';
    concerts.forEach(function (c) {
      var li = document.createElement('li');
      li.textContent = formatConcert(c);
      if (c.url) {
        var link = document.createElement('a');
        link.href = c.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.className = 'ticket-link';
        link.textContent = ticketLabel[lang] || ticketLabel.en;
        li.appendChild(document.createTextNode(' — '));
        li.appendChild(link);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  // Sort comparator by date (descending for past, ascending for upcoming)
  function dateValue(concert) {
    var parts = concert.date.split('-');
    // Pad to full date for consistent sorting
    var y = parts[0];
    var m = parts[1] || '01';
    var d = parts[2] || '01';
    return y + '-' + m + '-' + d;
  }

  function buildSection(title, concerts, emptyMessage) {
    var section = document.createElement('div');
    section.className = 'concerts-subsection';
    var h3 = document.createElement('h3');
    h3.className = 'concerts-subsection-title';
    h3.textContent = title;
    section.appendChild(h3);

    var grid = document.createElement('div');
    grid.className = 'performance-grid';

    if (concerts.length === 0) {
      var card = document.createElement('div');
      card.className = 'performance-card';
      var msg = document.createElement('p');
      msg.className = 'no-concerts-message';
      msg.textContent = emptyMessage;
      card.appendChild(msg);
      grid.appendChild(card);
    } else {
      // Split into two cards for visual balance
      var mid = Math.ceil(concerts.length / 2);
      var firstHalf = concerts.slice(0, mid);
      var secondHalf = concerts.slice(mid);

      var card1 = document.createElement('div');
      card1.className = 'performance-card';
      card1.appendChild(buildList(firstHalf));
      grid.appendChild(card1);

      if (secondHalf.length > 0) {
        var card2 = document.createElement('div');
        card2.className = 'performance-card';
        card2.appendChild(buildList(secondHalf));
        grid.appendChild(card2);
      }
    }

    section.appendChild(grid);
    return section;
  }

  function render(concerts) {
    var container = document.getElementById('concerts-data');
    if (!container) return;

    var l = labels[lang];
    var upcoming = [];
    var past = [];

    concerts.forEach(function (c) {
      if (isUpcoming(c)) {
        upcoming.push(c);
      } else {
        past.push(c);
      }
    });

    // Sort upcoming by date ascending (soonest first)
    upcoming.sort(function (a, b) {
      return dateValue(a) < dateValue(b) ? -1 : dateValue(a) > dateValue(b) ? 1 : 0;
    });

    // Sort past by date descending (most recent first)
    past.sort(function (a, b) {
      return dateValue(a) > dateValue(b) ? -1 : dateValue(a) < dateValue(b) ? 1 : 0;
    });

    // Group past concerts that share the same name+location into a single entry
    var grouped = [];
    var seen = {};
    past.forEach(function (c) {
      var loc = (c.location && (c.location[lang] || c.location.en)) || '';
      var key = c.name + '|' + loc;
      if (seen[key] !== undefined) {
        grouped[seen[key]].years.push(formatDate(c));
      } else {
        seen[key] = grouped.length;
        grouped.push({ name: c.name, location: c.location, years: [formatDate(c)] });
      }
    });
    var groupedPast = grouped.map(function (g) {
      return { name: g.name, location: g.location, date: g.years.join(', '), _formatted: true };
    });

    container.appendChild(buildSection(l.upcoming, upcoming, l.noUpcoming));
    if (groupedPast.length > 0) {
      container.appendChild(buildSection(l.past, groupedPast, ''));
    }
  }

  // Override formatConcert for pre-grouped entries
  var origFormatConcert = formatConcert;
  formatConcert = function (c) {
    if (c._formatted) {
      var loc = (c.location && (c.location[lang] || c.location.en)) || '';
      var text = c.name;
      if (loc) text += ' - ' + loc;
      text += ' (' + c.date + ')';
      return text;
    }
    return origFormatConcert(c);
  };

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
