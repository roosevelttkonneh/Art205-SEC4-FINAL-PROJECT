// Modal helper
function openModal(modal){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus the first focusable button if present
    const btn = modal.querySelector('button, [href], input, textarea');
    if(btn) btn.focus();
}
function closeModal(modal){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
}

// Photo modal triggers (works across pages)
document.querySelectorAll('.photo-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = document.getElementById('photoModal');
        openModal(modal);
    });
});

// Generic close handlers for elements with [data-close]
document.addEventListener('click', e => {
    if(e.target.matches('[data-close]') || e.target.closest('[data-close]')){
        const modal = e.target.closest('.modal');
        closeModal(modal);
    }
});

// Close when clicking outside modal-content
document.addEventListener('click', e => {
    if(e.target.classList && e.target.classList.contains('modal')){
        closeModal(e.target);
    }
});

// Keyboard ESC to close any open modal
document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
        document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m => closeModal(m));
    }
});

// Contact form confirmation flow
const contactForm = document.getElementById('contactForm');
const confirmModal = document.getElementById('confirmModal');
if(contactForm){
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        openModal(confirmModal);
    });
}

const confirmSubmit = document.getElementById('confirmSubmit');
const cancelSubmit = document.getElementById('cancelSubmit');
if(confirmSubmit){
    confirmSubmit.addEventListener('click', () => {
        // Simulate submission and show a success message
        closeModal(confirmModal);
        if(contactForm){
            contactForm.reset();
            alert('Thanks — your message has been submitted (simulated).');
        }
    });
}
if(cancelSubmit){
    cancelSubmit.addEventListener('click', () => closeModal(confirmModal));
}

// ensure modal aria-hidden defaults to true if not set
document.querySelectorAll('.modal').forEach(m => {
    if(!m.hasAttribute('aria-hidden')) m.setAttribute('aria-hidden','true');
});