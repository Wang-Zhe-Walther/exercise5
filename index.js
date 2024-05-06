document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const actionMessageElement = document.getElementById('registrationStatus');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        if(username === "" || password === "") {
            actionMessageElement.textContent = "Username and Password cannot be empty.";
            return;
        }

        // 将用户名和密码存储到cookie（注意：实际应用中不应如此处理密码）
        const userData = { username: username, password: password };
        const userDataJSON = JSON.stringify(userData);
        document.cookie = `userDetails=${encodeURIComponent(userDataJSON)}; expires=${getCookieExpirationDate()}; path=/;`;

        // 假设成功存储（此处仅为示例，实际应用中应有更准确的确认逻辑）
        alert('User created successfully!');
    });
});

function getCookieExpirationDate(days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date.toUTCString();
}