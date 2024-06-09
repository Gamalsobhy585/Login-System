document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const name = form.name.value;
        const email = form.mail.value;
        const message = form.Message.value;

        const contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contactMessages.push({ name, email, message });
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

        swal("Thank you for contacting us!", "We will contact you as soon as possible.", "success");

        form.reset();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    function animateNumbers() {
        const numbers = document.querySelectorAll('.number');
        
        numbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            const duration = 2000; 
            const start = 0;
            const startTime = performance.now();

            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const value = Math.ceil(progress * (target - start) + start);
                
                number.textContent = value;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }

            requestAnimationFrame(updateNumber);
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect(); 
            }
        });
    }, { threshold: 0.5 }); 

    observer.observe(document.querySelector('.stats'));
});


document.addEventListener('DOMContentLoaded', function() {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
    }
});

function isLoggedIn() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser !== null;
}
