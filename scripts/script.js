"use strict";

function getInput() {
  const input = document.getElementById("input").value;
  const deadline = new Date(input);
  return deadline;
}

function leapYear(year) {
  if (year % 4 !== 0) {
    if (year % 400 !== 0 && year % 100 !== 4) {
      return false;
    }
    return false;
  }
  return true;
}

function initializeClock() {
  const deadline = getInput();
  const currentDate = new Date();
  if (deadline < currentDate) {
    const errorPara = document.createElement("p");
    errorPara.textContent = "Sorry; we don't count up from a past event";
    document.querySelector("form").prepend(errorPara);
    errorPara.insertAdjacentHTML("afterend", "<br />");
  } else {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const timeDiff = deadline - now;
      let february = 0;
      if (leapYear(deadline.getFullYear())) {
        february = 29;
      } else {
        february = 28;
      }

      const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      let months = Math.floor(days / daysInMonth[deadline.getMonth()]);
      days %= daysInMonth[deadline.getMonth()];

      if (currentDate.getMonth() < deadline.getMonth() && currentDate.getDate() === deadline.getDate()) {
        days = 0;
        const monthDiff = deadline.getMonth() - currentDate.getMonth();
        months = monthDiff;
      } else if (currentDate.getDate() < deadline.getDate() && currentDate.getMonth() === deadline.getMonth()) {
        const daysDiff = deadline.getDate() - currentDate.getDate();
        days = daysDiff;
        months = 0;
      } else if (currentDate.getMonth() < deadline.getMonth() && currentDate.getDate() < deadline.getDate()) {
        const daysDiff = deadline.getDate() - currentDate.getDate();
        const monthsDiff = deadline.getMonth() - currentDate.getMonth();
        days = daysDiff;
        months = monthsDiff;
      }

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      document.getElementById("day").textContent = days;
      document.getElementById("month").textContent = months;
      document.getElementById("hour").textContent = hours;
      document.getElementById("minute").textContent = minutes;
      document.getElementById("second").textContent = seconds;
      if (timeDiff < 0) {
        clearInterval(timerId);
        const event = document.getElementById("event");
        document.getElementById("is-it-time").textContent = `${event} is here!`;
        document.getElementById("month").textContent = "0";
        document.getElementById("day").textContent = "0";
        document.getElementById("hour").textContent = "0";
        document.getElementById("minute").textContent = "0";
        document.getElementById("second").textContent = "0";
      }

      const stopBtn = document.getElementById("stop-btn");
      stopBtn.addEventListener("click", function() {
        clearInterval(timerId)
      });
    }, 1000);
  }
}

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", initializeClock);
