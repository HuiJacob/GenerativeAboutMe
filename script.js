// ===== Dark/Light Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// ===== Intersection Observer for Progress Bars =====
const progressBars = document.querySelectorAll('.progress-bar');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const proficiency = entry.target.getAttribute('data-proficiency');
            entry.target.classList.add('animated');
            entry.target.style.setProperty('--proficiency', proficiency + '%');
            entry.target.style.width = proficiency + '%';
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    observerObserver.observe(bar);
});

// ===== Experience Items - Toast Notification =====
const experienceItems = document.querySelectorAll('.experience-item');
const toast = document.getElementById('toast');

experienceItems.forEach(item => {
    item.addEventListener('click', () => {
        const company = item.getAttribute('data-company');
        showToast(`Learn more about my role at ${company}`);
    });
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Download PDF =====
const downloadPdfBtn = document.getElementById('download-pdf');

downloadPdfBtn.addEventListener('click', () => {
    const element = document.querySelector('.container');
    const opt = {
        margin: 10,
        filename: 'Jacob-Hui-Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    // Temporarily hide certain elements
    const navBar = document.querySelector('.navbar');
    const themeButton = document.querySelector('.theme-toggle');
    navBar.style.display = 'none';
    themeButton.style.display = 'none';
    
    html2pdf().set(opt).fromElement(element).save().then(() => {
        // Restore hidden elements
        navBar.style.display = 'flex';
        themeButton.style.display = 'flex';
    });
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formError = document.getElementById('form-error');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    formError.classList.remove('show');
    formError.textContent = '';
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showFormError('Name field cannot be empty.');
        return false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        showFormError('Email field cannot be empty.');
        return false;
    }
    
    if (!emailRegex.test(emailInput.value)) {
        showFormError('Please enter a valid email address.');
        return false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        showFormError('Message field cannot be empty.');
        return false;
    }
    
    if (messageInput.value.trim().length < 10) {
        showFormError('Message must be at least 10 characters long.');
        return false;
    }
    
    return true;
}

function showFormError(message) {
    formError.textContent = message;
    formError.classList.add('show');
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        alert('Message sent successfully!');
        contactForm.reset();
        formError.classList.remove('show');
    }
});

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Add Active Navigation Link =====
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottomColor = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#1e90ff';
            link.style.borderBottomColor = '#1e90ff';
        }
    });
});

// ===== Fade In Animation on Scroll =====
const observerFade = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, { threshold: 0.1 });

// Apply fade-in animation to sections
sections.forEach((section, index) => {
    section.style.opacity = '0';
    observerFade.observe(section);
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);