document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (username.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
            errorPopup.innerText = "Please fill in all fields.";
            errorPopup.style.display = "block";

            setTimeout(function() {
                errorPopup.style.display = "none";
            }, 3000);

            return;
        }

        // Simulate successful form submission
        successPopup.innerText = "Submission successful!";
        successPopup.style.display = "block";

        setTimeout(function() {
            successPopup.style.display = "none";
        }, 3000);
    });
});