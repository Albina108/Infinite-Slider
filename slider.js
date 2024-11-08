const images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
let activeImage = 0;
let flag = true;


const sliderPlace = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').clientWidth;

sliderPlace.style.width = `${3 * widthOffset}px`;
sliderPlace.style.height = `${widthOffset}px`;
sliderPlace.style.left = `-${widthOffset}px`;

window.addEventListener('resize', () => {
  const newWidthOffset = document.querySelector('.slider').clientWidth;
  sliderPlace.style.width = `${3 * newWidthOffset}px`;
  sliderPlace.style.height = `${newWidthOffset}px`;
  sliderPlace.style.left = `-${newWidthOffset}px`;
});




const generateImage = (index, prepend = false, width = 0) => {
  const img = document.createElement('img');
  img.alt = '';
  img.src = `./images/${images[index]}`;
  if (width) img.style.width = `${width}px`;
  prepend ? sliderPlace.prepend(img) : sliderPlace.append(img);
  return img;
};


const initSlider = () => {
  generateImage(activeImage);
  generateImage((activeImage + 1) % images.length);
  generateImage((activeImage - 1 + images.length) % images.length, true);
};


const animate = ({ duration, draw, removeElement }) => {
  const start = performance.now();
  requestAnimationFrame(function step(time) {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;
    draw(progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      removeElement.remove();
      flag = true;
    }
  });
};


const nextSlide = () => {
  if (!flag) return;
  flag = false;

  activeImage = (activeImage + 1) % images.length;
  generateImage((activeImage + 1) % images.length);

  animate({
    duration: 1000,
    draw: (progress) => {
      const img = sliderPlace.querySelector('img');
      img.style.width = `${widthOffset * (1 - progress)}px`;
    },
    removeElement: sliderPlace.querySelector('img'),
  });
};

const prevSlide = () => {
  if (!flag) return;
  flag = false;

  activeImage = (activeImage - 1 + images.length) % images.length;
  generateImage((activeImage - 1 + images.length) % images.length, true, widthOffset);

  animate({
    duration: 1000,
    draw: (progress) => {
      const img = sliderPlace.querySelector('img');
      img.style.width = `${widthOffset * progress}px`;
    },
    removeElement: sliderPlace.querySelector('img:last-child'),
  });
};


initSlider();


document.querySelector('.slider').addEventListener('click', (event) => {
  if (event.target.closest('.next-button')) {
    nextSlide();
  } else if (event.target.closest('.prev-button')) {
    prevSlide();
  }
});



