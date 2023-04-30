//funcion progreso barra scroll
window.addEventListener('load', () => {
  const progress = document.getElementById('progress');
  requestAnimationFrame(Unpdate);
});

//funcion carrusel tipo glider
window.addEventListener('load', function () {
  new Glider(this.document.querySelector('.carrusel__lista'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: '.carrusel__indicadores',
    draggable: true,
    arrows: {
      prev: '.carrusel__anterior',
      next: '.carrusel__siguiente',
    },
    responsive: [
      {
        // screens greater than >= 480px
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 720px
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });
});

function Unpdate() {
  progress.style.width = `${
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  }%`;
  requestAnimationFrame(Unpdate);
}

//Funcion que oculta o muestra el Menu
function MostrarOcultarMenu() {
  if (MenuVisible) {
    document.getElementById('nav').classList = '';
    MenuVisible = false;
  } else {
    document.getElementById('nav').classList = 'responsive';
    MenuVisible = true;
  }
}

//Funcion para cuando se selecciona el menu, no se muestre
function seleccionar() {
  document.getElementById('nav').classList = '';
  MenuVisible = false;
}

//Detecto el Scroll para aplicar la animacion en la barra//
window.onscroll = function () {
  efectoHabilidades();
};
