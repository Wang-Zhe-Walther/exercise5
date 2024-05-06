// Author: Wang Zhe Walther

document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on to decide which functionality to initialize
    const currentPage = window.location.href.split('/').pop().split('.')[0];
    const actionMessageElement = document.getElementById('actionMessage'); // Feedback message container

    if(currentPage === 'index.html' || currentPage === 'login.html') { 
        // Common setup for both login and registration
        const formId = currentPage === 'index.html' ? 'registrationForm' : 'loginForm';
        const submitButtonName = currentPage === 'index.html' ? 'Register' : 'Login';
        
        const form = document.getElementById(formId);
        if(form && actionMessageElement) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const username = document.getElementById('usernameInput').value;
                const password = document.getElementById('passwordInput').value;
        
                actionMessageElement.textContent = ""; // Clear any previous messages
        
                if(username === "" || password === "") {
                    actionMessageElement.textContent = "Username and Password cannot be empty.";
                    return;
                }
        
                // Simulate registration success
                document.cookie = `username=${encodeURIComponent(username)}; expires=${getCookieExpirationDate()}; path=/`;
        
                // Add a more visible success message (simulating the existence of #registrationStatus in HTML)
                let statusMessage = document.createElement('p');
                statusMessage.id = 'registrationStatus';
                statusMessage.className = 'status-message success';
                statusMessage.textContent = `${submitButtonName} successful! Please log in.`;
                form.parentNode.insertBefore(statusMessage, form.nextSibling); // Insert after the form
        
                // In a real-world scenario, you'd want to show this message in an existing element defined in your HTML.
            });
        }
    } else if(currentPage === 'details.html') {
        // Load and handle user details
        loadCookieData();
    }
});

function getCookieExpirationDate(days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date.toUTCString();
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Deleted successfully.'); 
}

function loadCookieData() {
    let cookieList = document.getElementById('cookieList');
    if (!cookieList) return; 

    cookieList.innerHTML = ''; 

    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        let cookiePair = cookie.trim().split('=');
        let name = decodeURIComponent(cookiePair[0]);
        let value = name.startsWith('username') ? '*****' : ''; 

        if (name.startsWith('username')) {
            let listItem = document.createElement('li');
            listItem.textContent = `${name.substring(9)}: ${value}`; // Show username without 'username=' prefix
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                try {
                    deleteCookie(name);
                    loadCookieData(); 
                } catch (e) {
                    alert('Error deleting cookie.'); 
                }
            });
            listItem.appendChild(deleteButton);
            cookieList.appendChild(listItem);
        }
    });

    let deleteAllButton = document.getElementById('deleteAllButton');
    if (deleteAllButton) {
        deleteAllButton.addEventListener('click', function() {
            try {
                let cookies = document.cookie.split(';');
                cookies.forEach(cookie => {
                    let cookiePair = cookie.trim().split('=');
                    let name = decodeURIComponent(cookiePair[0]);
                    if (name.startsWith('username')) {
                        deleteCookie(name);
                    }
                });
                loadCookieData(); 
                alert('All entries deleted successfully.');
            } catch (e) {
                alert('Error deleting all cookies.'); 
            }
        });
    }
}