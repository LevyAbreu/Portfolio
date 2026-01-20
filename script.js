import { BIO_DATA, SKILLS_DATA, PROJECTS_DATA, CAREER_DATA } from './data.js';

const typedTextSpan = document.getElementById("typewriter");
const projectsGrid = document.querySelector('.projects-grid');
const skillsContainer = document.querySelector('.skills-container');
const timeline = document.querySelector('.timeline');
const aboutSection = document.querySelector('#about-content');

let charIndex = 0;
function typeEffect() {
    if (typedTextSpan && charIndex < BIO_DATA.name.length) {
        typedTextSpan.textContent += BIO_DATA.name.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 150);
    }
}

function renderAbout() {
    if (!aboutSection) return;
    aboutSection.innerHTML = `
        <p>${BIO_DATA.description}</p>
        <blockquote>"${BIO_DATA.quote}" <br><span>- ${BIO_DATA.quoteAuthor}</span></blockquote>
    `;
}

function renderSkills() {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = SKILLS_DATA.map(group => `
        <div class="skills-group">
            <h3>${group.category}</h3>
            <div class="skills-grid">
                ${group.items.map(skill => `
                    <div class="skill-card">
                        <img src="${skill.icon}" alt="${skill.name}">
                        <p>${skill.name}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Localize a função renderProjects e substitua por esta:
function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = PROJECTS_DATA.map(project => `
        <div class="project-card">
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <div class="project-actions">
                    <a href="${project.deploy}" target="_blank" class="btn-primary">Deploy</a>
                    <a href="${project.repository}" target="_blank" class="btn-secondary">GitHub</a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderExperience() {
    if (!timeline) return;
    timeline.innerHTML = CAREER_DATA.map(exp => `
        <div class="exp-card">
            <h3>${exp.title}</h3>
            <span>${exp.period} | ${exp.at}</span>
        </div>
    `).join('');
}

// Lógica de Partículas Interativas
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Ajusta o tamanho do canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 77, 77, 0.5)'; // Cor primária do seu site
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        const amount = 80; // Quantidade de partículas
        for (let i = 0; i < amount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawLines();
        requestAnimationFrame(animate);
    }

    // Desenha linhas entre partículas próximas (efeito rede)
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(255, 77, 77, ${0.15 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    createParticles();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    initParticles();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("section-visible");
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(el => {
        el.classList.add('section-hidden');
        observer.observe(el);
    });

    setTimeout(typeEffect, 1000);
});