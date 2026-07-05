// Header background on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Mobile menu toggle — controlado 100% via classe CSS (.nav-open),
// sem estilos inline. Isso evita conflito entre JS e CSS quando a
// tela é redimensionada ou o dispositivo é rotacionado.
const menuToggle = document.getElementById('menuToggle');
const navClose = document.getElementById('navClose');
const nav = document.querySelector('nav');

function openMenu() {
  nav.classList.add('nav-open');
  menuToggle.textContent = '✕';
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('nav-open');
  menuToggle.textContent = '☰';
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function abrirModal(id) {
  document.getElementById('modal-' + id).classList.add('modal-aberto');
  document.body.style.overflow = 'hidden';
}

function fecharModal(id) {
  document.getElementById('modal-' + id) .classList.remove('modal-aberto');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) =>{
  if (e.target.classList.contains('modal-galeria')) {
      e.target.classList.remove('modal-aberto');
      document.body.style.overflow = '';
      
    }});

menuToggle.addEventListener('click', () => {
  if (nav.classList.contains('nav-open')) closeMenu();
  else openMenu();
});

navClose.addEventListener('click', closeMenu);

document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// Fecha também ao tocar fora dos links (no fundo escuro do menu)
nav.addEventListener('click', (e) => {
  if (e.target === nav) closeMenu();
});

// Fecha o menu automaticamente se a tela passar para o layout desktop
// (ex: usuário gira o celular ou redimensiona a janela do navegador).
const desktopQuery = window.matchMedia('(min-width: 981px)');
function handleViewportChange(e) {
  if (e.matches) closeMenu();
}
if (desktopQuery.addEventListener) {
  desktopQuery.addEventListener('change', handleViewportChange);
} else {
  // fallback para navegadores antigos
  desktopQuery.addListener(handleViewportChange);
}

// Fecha o menu com a tecla Esc (acessibilidade)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeMenu();
});

// Carrossel
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideAtual = 0;

function irParaSlide(n) {
  slides[slideAtual].classList.remove('active');
  dots[slideAtual].classList.remove('active');
  slideAtual = n;
  slides[slideAtual].classList.add('active');
  dots[slideAtual].classList.add('active');
}

setInterval(() => {
  irParaSlide((slideAtual + 1) % slides.length);
}, 4000);