//use strict;
import thankYouIllustration from "./assets/illustration-thank-you.svg";
import spinnerGif from "./assets/spinner.gif";

const submitButton = document.querySelector(".card__btn");
const ratingCard = document.querySelector(".card--rating");
const cardNumberWrapper = document.querySelector(".card__numbers");
const cardNumbers = document.querySelectorAll(".card__numbers__number");
let rateNumber;

const alertCard = `
 <!-- Thank you state start -->

    <section class="card card--alert">
      <section class="card--alert__img--wrapper">
        <img
          src="${thankYouIllustration}"
          alt=""
          class="card--alert__img"
        />
      </section>

      <section class="card--alert__section">
        <p class="card__par card__par--orange">
          You selected
          <span class="card__par__span"></span>
          out of
          <span class="card__par__span--total"></span>
        </p>
      </section>

      <section class="card--alert__body">
        <h2 class="card__title">Thank you!</h2>
        <p class="card__par">
          We appreciate you taking the time to give a rating. If you ever need
          more support, don’t hesitate to get in touch!
        </p>
      </section>
    </section>

    <!-- Thank you state end -->`;

cardNumberWrapper.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked || clicked.classList.contains("card__numbers")) return;

  cardNumbers.forEach((el) => {
    // console.log(el);
    if (el !== clicked) {
      el.classList.remove("active");
    }
  });
  clicked.classList.add("active");

  rateNumber = clicked.textContent;
});

submitButton.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked) return;
  ratingCard.classList.toggle("no-display");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<img class="spinner" src="${spinnerGif}" alt="loading spinner gif">`
  );

  setTimeout(() => {
    document.querySelector(".spinner").remove();
    document.body.insertAdjacentHTML("afterbegin", alertCard);
    document.querySelector(".card__par__span--total").textContent =
      cardNumbers.length;
    document.querySelector(".card__par__span").textContent = rateNumber;
  }, 750);

  cardNumbers.forEach((el) => {
    el.classList.remove("active");
  });

  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          document.querySelector(".card--alert").classList.add("no-opacity")
        ),
      4000
    );
  }).then(() =>
    setTimeout(() => {
      document.querySelector(".card--alert").remove();
      ratingCard.classList.toggle("no-display");
    }, 500)
  );
});

const callback = ([entry]) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("transform");
  observer.unobserve(entry.target);
};

const configObject = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(callback, configObject);
observer.observe(card);