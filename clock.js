function CountdownTracker(label, value) {
    var el = document.createElement('span');
    el.className = 'flip-clock__piece';
    el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
      '<span class="flip-clock__slot">' + label + '</span>';
    this.el = el;
  
    var top = el.querySelector('.card__top'),
        bottom = el.querySelector('.card__bottom'),
        back = el.querySelector('.card__back'),
        backBottom = el.querySelector('.card__back .card__bottom');
  
    this.update = function(val) {
      val = ('0' + val).slice(-2);
      if (val !== this.currentValue) {
        if (this.currentValue >= 0) {
          back.setAttribute('data-value', this.currentValue);
          bottom.setAttribute('data-value', this.currentValue);
        }
        this.currentValue = val;
        top.innerText = this.currentValue;
        backBottom.setAttribute('data-value', this.currentValue);
        this.el.classList.remove('flip');
        void this.el.offsetWidth;
        this.el.classList.add('flip');
      }
    }
    this.update(value);
}

function getTimeElapsed(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Adjust for negative values by borrowing from higher units
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return {
        'Years': years,
        'Months': months,
        'Days': days,
        'Hours': hours,
        'Minutes': minutes,
        'Seconds': seconds
    };
}

function Clock(startDate) {
    this.el = document.getElementById('countup-clock');
    var trackers = {}, timeInterval;
    var t = getTimeElapsed(startDate), key;

    for (key in t) {
        trackers[key] = new CountdownTracker(key, t[key]);
        this.el.appendChild(trackers[key].el);
    }

    function updateClock() {
        var t = getTimeElapsed(startDate);
        for (key in trackers) {
            trackers[key].update(t[key]);
        }
        requestAnimationFrame(updateClock);
    }
    updateClock();
}

var startDate = new Date("2021-11-06T19:30:00");
new Clock(startDate);
