//English name: Walther
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const actionMessageElement = document.getElementById('loginStatus'); // Let's say you have an element that displays login status information


    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value; // Make sure the form field ID matches here

        const password = document.getElementById('password').value;

        // Obtain stored user information from cookies

        const userDetailsCookie = document.cookie.split('; ').find(row => row.startsWith('userDetails='));

        if (userDetailsCookie) {
            const userDataJSON = decodeURIComponent(userDetailsCookie.split('=')[1]);
            try {
                const storedUserData = JSON.parse(userDataJSON);

                // Obtain stored user information from cookies

                if (username === storedUserData.username && password === storedUserData.password) {
                    alert('Login successful!');
                    window.location.href = 'shopping.html';
                } else {
                    actionMessageElement.textContent = "Invalid username or password.";
                }
            } catch (e) {
                console.error('Error parsing cookie data:', e);
                actionMessageElement.textContent = "Error in user credentials format.";
            }
        } else {
            actionMessageElement.textContent = "No user registered yet.";
        }
    });
});
