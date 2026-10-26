class Countdown {
  constructor(options) {
    this.targetDate = new Date(options.targetDate);
    this.style = options.style || 'HH:mm:ss';
    this.callback = options.callback || (() => {});
    this.interval = options.interval || 1000;
    this.isDescending = options.isDescending || false;

    this.start();
  }

  start() {
    this.timer = setInterval(() => {
      const now = new Date();
      const timeDifference = this.isDescending
        ? this.targetDate - now
        : now - this.targetDate;

      const formattedTime = this.formatTime(timeDifference);

      this.callback(formattedTime);

      if ((this.isDescending && now >= this.targetDate) || (!this.isDescending && now <= this.targetDate)) {
        this.stop();
      }
    }, this.interval);
  }

  stop() {
    clearInterval(this.timer);
  }

  formatTime(timeDifference) {
    const totalSeconds = Math.floor(timeDifference / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return this.style
      .replace('HH', this.padZero(hours))
      .replace('mm', this.padZero(minutes))
      .replace('ss', this.padZero(seconds));
  }

  padZero(num) {
    return num.toString().padStart(2, '0');
  }
}

// module.exports = Countdown;

/////

// const Countdown = require('path-to-countdown');

// Example usage
const options = {
  targetDate: '2023-12-31T23:59:59', // Replace with your desired target date and time
  style: 'DD HH:mm:ss', // Replace with your desired time format
  callback: (formattedTime) => {
    console.log(`Time remaining: ${formattedTime}`);
  },
  isDescending: true, // Set to true for countdown, false for count up
};

const countdown = new Countdown(options);
console.log(countdown);
