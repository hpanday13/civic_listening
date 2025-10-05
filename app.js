// Civic Listening Project JavaScript

// Team data from the provided JSON
const teamData = [
    {
        "name": "Shoko Takemoto",
        "role": "Project Lead, Urban Planning & Design",
        "organization": "Urban Analytics Assistant Manager, Woven by Toyota",
        "email": "stakemoto@gmail.com"
    },
    {
        "name": "Himanshu Panday", 
        "role": "Project Co-Lead, Data Analysis and Platform Development",
        "organization": "Co-founder, Dignity in Difference",
        "email": "himanshu@dignityindifference.org"
    },
    {
        "name": "Roli Mahajan",
        "role": "Project Member, Knowledge Management and Communication", 
        "organization": "Independent Journalist and Consultant, Development and Cooperation Magazine",
        "email": "Roli.undp@gmail.com"
    },
    {
        "name": "Noriko Suzuki",
        "role": "Project Member, Business Strategy and Visibility", 
        "organization": "Auto, Energy & Electronics Leader, IBM Institute for Business Value",
        "email": "suzuki@smanagement.net"
    },
    {
        "name": "Daisuke Masabuchi",
        "role": "Project Member, Data Analysis and Platform Development",
        "organization": "CTO, Nobishiro", 
        "email": "dmasubuchi@gmail.com"
    },
    {
        "name": "Kana Kitaoka",
        "role": "Project Member, Ethnographic and Human Behavior Analysis",
        "organization": "Partner / Independent Researcher, Dukana Solutions LLP",
        "email": "dukanallp@gmail.com"
    },
    {
        "name": "Naomi Hatanaka",
        "role": "Project Member, Research Methods",
        "organization": "Assistant Professor at National University of Singapore",
        "email": "hanakata@nus.edu.sg"
    },
    {
        "name": "Atoka Jo",
        "role": "Project Member, Safety, Security and Wellbeing Analysis", 
        "organization": "Himeji Jogakuin Liberal Arts Summer Program",
        "email": "atokajo@gmail.com"
    }
];


// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide && typeof lucide.createIcons === 'function') { lucide.createIcons(); }
    initializeNavigation();
    populateTeamMembers();
    initializeCounters();
    initializeNewsletter();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle scroll events for navbar styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Populate team members
function populateTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = '';

    teamData.forEach(member => {
        const initials = member.name.split(' ').map(n => n.charAt(0)).join('');
        
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.innerHTML = `
            <div class="member-avatar">${initials}</div>
            <h3 class="member-name">${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <p class="member-org">${member.organization}</p>
            <a href="mailto:${member.email}" class="member-email">
                <i data-lucide="mail" class="icon"></i> Contact
            </a>
        `;

        teamGrid.appendChild(memberCard);
    });
}

// Create accessibility chart
function createAccessibilityChart() {
    const chartCanvas = document.getElementById('accessibilityChart');
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: parkData.map(park => park.name),
            datasets: [{
                label: 'Accessibility Rating',
                data: parkData.map(park => park.accessibility),
                backgroundColor: [
                    '#1FB8CD',
                    '#FFC185', 
                    '#B4413C',
                    '#ECEBD5',
                    '#5D878F'
                ],
                borderColor: [
                    '#1FB8CD',
                    '#FFC185',
                    '#B4413C', 
                    '#ECEBD5',
                    '#5D878F'
                ],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Park Accessibility Ratings (Out of 5)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#134252'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 0.5,
                        color: '#626C71'
                    },
                    grid: {
                        color: 'rgba(98, 108, 113, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#626C71',
                        maxRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize map points
function initializeMapPoints() {
    const mapPoints = document.getElementById('map-points');
    if (!mapPoints) return;

    parkData.forEach((park, index) => {
        const point = document.createElement('div');
        point.className = 'map-point';
        point.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${park.accessibility >= 4 ? '#21808D' : park.accessibility >= 3.5 ? '#A84B2F' : '#C0152F'};
            top: ${20 + Math.random() * 60}%;
            left: ${20 + Math.random() * 60}%;
            animation: pulse 2s infinite ease-in-out;
            animation-delay: ${index * 0.3}s;
            cursor: pointer;
            box-shadow: 0 0 0 0 rgba(33, 128, 141, 0.7);
        `;
        
        point.title = `${park.name}: ${park.accessibility}/5.0 - ${park.improvements}`;
        
        point.addEventListener('click', function() {
            showParkDetails(park);
        });

        mapPoints.appendChild(point);
    });
}

// Show park details (mock functionality)
function showParkDetails(park) {
    alert(`${park.name}\n\nAccessibility Rating: ${park.accessibility}/5.0\nRecent Improvements: ${park.improvements}`);
}

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Initialize newsletter form
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (emailInput && emailInput.value) {
            // Simulate subscription process
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Subscribed!';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1000);
        }
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .outcome-card, .team-member, .methodology-step, .vision-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide && typeof lucide.createIcons === 'function') { lucide.createIcons(); }
    initializeScrollAnimations();
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate positions if needed
    updateActiveNavLink();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.log('Resource loading error:', e.target.src || e.target.href);
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
    }
});

if (window.PerformanceObserver) {
    perfObserver.observe({entryTypes: ['measure']});
}

// Theme detection and handling
function handleThemePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    prefersDark.addListener((e) => {
        if (e.matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
    });
    
    // Set initial theme
    if (prefersDark.matches) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
}

// Initialize theme handling
handleThemePreference();

// Utility functions for enhanced interactivity
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Analytics and interaction tracking (mock)
function trackInteraction(eventName, details = {}) {
    console.log('Interaction tracked:', eventName, details);
    // In a real application, this would send data to analytics service
}

// Track important interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackInteraction('button_click', {
            button_text: e.target.textContent,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
    
    if (e.target.matches('.nav-link')) {
        trackInteraction('navigation_click', {
            link_target: e.target.getAttribute('href'),
            link_text: e.target.textContent
        });
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        teamData,
        initializeNavigation,
        populateTeamMembers,
        updateActiveNavLink
    };
}
