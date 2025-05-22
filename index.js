// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const nameText = "Hello, I'm Your Name";
const nameSpeed = 80;
let nameIndex = 0;

const skills = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Enthusiast",
    "Open Source Contributor"
];
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;
const skillSpeed = 100;
const eraseSpeed = 60;
const pauseBetween = 1500;

const nameElement = document.getElementById("typing-name");
const skillElement = document.getElementById("typing-skill");

// Typing the name (once)
function typeName() {
    if (nameIndex < nameText.length) {
        nameElement.innerHTML += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeName, nameSpeed);
    } else {
        setTimeout(typeSkill, 1000); // Start skill typing after a pause
    }
}

// Typing & Deleting skills (loop)
function typeSkill() {
    const currentSkill = skills[skillIndex];

    if (!isDeleting) {
        skillElement.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex < currentSkill.length) {
            setTimeout(typeSkill, skillSpeed);
        } else {
            isDeleting = true;
            setTimeout(typeSkill, pauseBetween);
        }
    } else {
        skillElement.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex > 0) {
            setTimeout(typeSkill, eraseSpeed);
        } else {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            setTimeout(typeSkill, 300);
        }
    }
}

window.onload = typeName;
