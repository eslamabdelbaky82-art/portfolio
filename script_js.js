document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
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

function showNotification(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-bg-${type} border-0 show shadow-lg mb-2`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fa-solid fa-circle-check me-2"></i> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toastEl);
    setTimeout(() => {
        toastEl.remove();
    }, 4000);
}

function getFormData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields before sending.', 'warning');
        return null;
    }
    return { name, email, subject, message };
}

function sendViaWhatsApp() {
    const data = getFormData();
    if (!data) return;

    const text = `Hello Islam,\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/201090119018?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    showNotification('Opening WhatsApp...', 'success');
}

function sendViaEmail() {
    const data = getFormData();
    if (!data) return;

    const mailRecipient = 'eslamabdelbaky82@gmail.com';
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject}`);
    const body = encodeURIComponent(
        `Hello Islam,\n\nYou received a new message from your portfolio website:\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Subject: ${data.subject}\n\n` +
        `Message:\n${data.message}\n\n` +
        `---\nSent via Islam Abdelbaqy Portfolio Contact Form`
    );

    const mailtoUrl = `mailto:${mailRecipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    showNotification('Opening mail client...', 'success');
}

function showProjectDemo() {
    showNotification('GizaStay Demo Loaded.', 'info');
}

function showCodeSnippet() {
    showNotification('GizaStay HTML5/JS Architecture.', 'info');
}