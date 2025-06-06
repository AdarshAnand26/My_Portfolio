
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header style change on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Function to set the theme
    function setTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);

        // Update the toggle button icon
        if (themeName === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Function to toggle between light and dark themes
    function toggleTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');

    // If there's a saved theme, apply it
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check for OS-level dark mode preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Add event listener to the theme toggle button
    themeToggle.addEventListener('click', toggleTheme);

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    // Set the current URL as the redirect URL after form submission
    const currentUrl = window.location.href.split('#')[0]; // Remove any hash/fragment
    const redirectUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'message=success';

    // Set the _next hidden field
    const nextInput = document.querySelector('input[name="_next"]');
    if (nextInput) {
        nextInput.value = redirectUrl;
    }

    // Check for success message in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === 'success') {
        showToast('Message sent successfully!', 'success');

        // Remove the query parameter from URL
        const url = new URL(window.location);
        url.searchParams.delete('message');
        window.history.replaceState({}, '', url);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Get form inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Simple validation
            let isValid = true;

            if (name.value.trim() === '') {
                setError(name, 'Name cannot be blank');
                isValid = false;
                e.preventDefault();
            } else {
                setSuccess(name);
            }

            if (email.value.trim() === '') {
                setError(email, 'Email cannot be blank');
                isValid = false;
                e.preventDefault();
            } else if (!isValidEmail(email.value.trim())) {
                setError(email, 'Please enter a valid email');
                isValid = false;
                e.preventDefault();
            } else {
                setSuccess(email);
            }

            if (message.value.trim() === '') {
                setError(message, 'Message cannot be blank');
                isValid = false;
                e.preventDefault();
            } else {
                setSuccess(message);
            }

            if (isValid) {
                // Show sending state on button
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Let the form submit naturally to FormSubmit.co
                // The page will redirect to the _next URL after submission
            }
        });
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const formMessage = formGroup.querySelector('.form-message');

        formGroup.className = 'form-group error';
        formMessage.className = 'form-message error';
        formMessage.innerText = message;
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.className = 'form-group success';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function showToast(message, type = 'success') {
        // Set toast content
        const toastMessage = document.querySelector('.toast-message');
        const toastIcon = document.querySelector('.toast-icon i');

        toastMessage.textContent = message;

        if (type === 'success') {
            toast.className = 'toast show';
            toastIcon.className = 'fas fa-check-circle';
        } else {
            toast.className = 'toast show error';
            toastIcon.className = 'fas fa-exclamation-circle';
        }

        // Auto hide after 5 seconds
        setTimeout(function () {
            toast.className = 'toast';
        }, 5000);
    }
});
