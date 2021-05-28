class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector = selector;

    this.start();
  }

  start() {
    const targetDate = new Date(this.targetDate);
    let timeLefted = 0;

    const intervalID = setInterval(() => {
      const currentTime = new Date();
      timeLefted = targetDate - currentTime;

      this.addTextContent(timeLefted);

      if (timeLefted <= 0) {
        clearInterval(intervalID);
        this.addTextContent(0);
      }
    }, 1000);
  }

  addTextContent(time) {
    const htmlElements = Object.values(this.selectorHTML());
    const timeComponents = Object.values(this.getTimeComponents(time));

    htmlElements.forEach((el, i) => {
      el.textContent = timeComponents[i];
    });
  }

  selectorHTML() {
    const days = document.querySelector(`${this.selector} [data-value="days"]`);
    const hours = document.querySelector(
      `${this.selector} [data-value="hours"]`,
    );
    const mins = document.querySelector(`${this.selector} [data-value="mins"]`);
    const secs = document.querySelector(`${this.selector} [data-value="secs"]`);

    return { days, hours, mins, secs };
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});
