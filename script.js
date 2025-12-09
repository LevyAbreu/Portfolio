
// Menu toggle para mobile
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Animação de entrada para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('skill-card')) {
        entry.target.classList.add('animated');
      } else if (entry.target.classList.contains('project-card')) {
        entry.target.classList.add('animated');
      } else if (entry.target.classList.contains('exp-card')) {
        entry.target.classList.add('animated');
      } else if (entry.target.classList.contains('btn-circle')) {
        entry.target.classList.add('animated');
      } else if (entry.target.classList.contains('section-hidden')) {
        entry.target.classList.add('section-visible');
      }
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
document.querySelectorAll('.exp-card').forEach(el => observer.observe(el));
document.querySelectorAll('.btn-circle').forEach(el => observer.observe(el));

// Adicionar efeito de digitação ao título principal
const typedTextSpan = document.querySelector(".intro h1");
if (typedTextSpan) {
  const textArray = ["Sou o Levy Abreu", "Sou Web Dev", "Sou Mobile Dev"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1500;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  // Iniciar o efeito de digitação após a página carregar
  document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
  });
}

// Animação suave para rolagem
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Efeito de partículas no hero (opcional)
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(255, 77, 77, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.zIndex = '-1';
    particle.style.animation = `float ${Math.random() * 3 + 3}s infinite ease-in-out`;
    
    // Adicionar keyframes para animação de flutuação
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(20px); }
        75% { transform: translateY(-30px) translateX(-10px); }
      }
    `;
    document.head.appendChild(style);
    
    hero.appendChild(particle);
  }
}

// Iniciar partículas após carregamento
window.addEventListener('load', createParticles);