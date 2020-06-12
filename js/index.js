let offset = 1000;
let duration1 = 2000;
let duration2 = 3000;
let duration3 = 1000;

function start() {
  new CircleType(document.getElementById("text1")).radius(500);
  new CircleType(document.getElementById("text2")).radius(400);
  new CircleType(document.getElementById("text3")).radius(300);

  let circleSection = document.getElementById("scroll1");

  circleSection.style.opacity = 1;

  let video = document.getElementById("gnome-video");
  let video2 = document.getElementById("old-video");
  let video3 = document.getElementById("heart-video");

  video.play();
  video.pause();

  video2.play();
  video2.pause();

  video3.play();
  video3.pause();

  scrollEvent();
}

function scrollEvent() {
  var controller = new ScrollMagic.Controller();

  var scene1 = new ScrollMagic.Scene({
    duration: duration1,
    triggerHook: 0,
  })
    .setPin("#scroll1")
    .on("start", animateText);

  var scene2 = new ScrollMagic.Scene({
    duration: duration2,
    triggerElement: "#scroll2",
    triggerHook: 0,
  })
    .setPin("#scroll2")
    .on("end", animateNames)
    .on("progress", hideNames);

  var scene3 = new ScrollMagic.Scene({
    duration: duration3,
    triggerElement: "#scroll4",
    triggerHook: 0,
  }).setPin("#scroll4");

  controller.addScene([scene1, scene2]);

  window.addEventListener("scroll", function (e) {
    scrollPosition = window.scrollY;
    window.requestAnimationFrame(function () {
      handleScroll(scrollPosition);
    });
  });
}

function animateText() {
  let textCircles = document.getElementsByClassName("circle");
  setTimeout(() => {
    for (let i = 0; i < textCircles.length; i++) {
      const element = textCircles[i];

      element.style.animationDuration = Math.cos(i) + 40 / (i + 5) + "s";
    }
  }, 100);
}

function animateNames() {
  let contents = document.getElementById("scroll4").children;

  setTimeout(() => {
    for (let i = 0; i < contents.length; i++) {
      const element = contents[i];

      element.style.transitionDelay = 100 * i + 200 + "ms";
      element.style.opacity = 1;
    }
  }, 1000);
}

function hideNames() {
  let contents = document.getElementById("scroll4").children;

  for (let i = 0; i < contents.length; i++) {
    const element = contents[i];

    element.style.transitionDelay = 50 * i + "ms";
    element.style.opacity = 0;
  }
}

function animateHeart() {
  const video = document.getElementById("heart-video");
  const videoScale = d3
    .scaleLinear()
    .domain([duration1, duration2])
    .range([0, video.duration]);

  video.currentTime = videoScale(scrollPosition);
}

function handleScroll(scrollPosition) {
  const video = document.getElementById("gnome-video");
  const scale = d3.scaleLinear().domain([-6, duration1]).range([1, 11]);
  const imageScale = d3.scaleLinear().domain([-6, duration1]).range([10, 200]);
  const videoScale = d3
    .scaleLinear()
    .domain([-10, duration1])
    .range([0, video.duration]);

  const circles = document.getElementsByClassName("section-inner");
  //circles[1].style.transform = "scale(" + scale(scrollPosition) + ")";

  video.currentTime = videoScale(scrollPosition);

  if (scrollPosition < duration1) {
    for (let i = 0; i < circles.length; i++) {
      const element = circles[i];
      element.style.transform =
        "scale(" + scale(scrollPosition / (i + 1)) + ")";
    }

    const picture = document.getElementById("gnome-photo");

    picture.style.width = imageScale(scrollPosition) + "px";
    picture.style.height = imageScale(scrollPosition) + "px";
  } else {
  }

  if (
    scrollPosition >= offset + duration1 &&
    scrollPosition < offset + duration1 + duration2
  ) {
    const video2 = document.getElementById("heart-video");

    const videoScale2 = d3
      .scaleLinear()
      .domain([duration1 + offset, offset + duration1 + duration2])
      .range([0, video2.duration]);

    video2.currentTime = videoScale2(scrollPosition);
  }

  if (scrollPosition > offset + duration1 + duration2) {
    const video3 = document.getElementById("old-video");
    const total = document.getElementsByTagName("body")[0].scrollHeight;

    const videoScale3 = d3
      .scaleLinear()
      .domain([offset + duration1 + duration2, total])
      .range([0, video3.duration]);

    video3.currentTime = videoScale3(scrollPosition);
  }

  //Scene 2

  const children = document.getElementById("content").children;

  const height = duration2 / children.length;

  for (let i = 0; i < children.length; i++) {
    const element = children[i];

    element.style.opacity =
      scrollPosition >= duration1 + offset + height * i &&
      scrollPosition <= duration1 + offset + height * (i + 1)
        ? 1
        : 0;
  }
}
