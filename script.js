let progress;

//funcion progreso barra scroll
window.addEventListener('load', () => {
  progress = document.getElementById('progress');
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
  if (progress) {
    progress.style.width = `${
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    }%`;
  }
  requestAnimationFrame(Unpdate);
}

// funcion menu responsive
let MenuVisible = false;

function MostrarOcultarMenu() {
  const nav = document.getElementById('nav');
  if (MenuVisible) {
    nav.classList.remove('responsive');
    MenuVisible = false;
  } else {
    nav.classList.add('responsive');
    MenuVisible = true;
  }
}

// Footer animation con IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});

  reveals.forEach(el => observer.observe(el));
});

// Animaciones al hacer scroll (stagger)
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  document.querySelectorAll('.stagger').forEach((group) => {
    const items = group.querySelectorAll('.reveal');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 80}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
});

// ===== MODAL CONTACTO =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll(
    'a[href="#seguir"], a[href="#contacto"], .hero-button.secondary'
  );

  const closeButton = modal.querySelector('.modal-close');
  const form = document.getElementById('contactForm');

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Envío por WhatsApp (modal)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    alert('Por favor completa tu nombre y el mensaje');
    return;
  }

  const phone = '573014894222';

  const text = encodeURIComponent(
    `Hola 👋, soy ${name}.\n` +
    (email ? `Mi correo es: ${email}\n` : '') +
    `\nMensaje:\n${message}`
  );

  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');

  form.reset();
  closeModal();
});
});

