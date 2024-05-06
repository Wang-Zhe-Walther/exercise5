document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const actionMessageElement = document.getElementById('loginStatus'); // 假设有一个元素用于显示登录状态信息

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value; // 确保表单字段ID与这里的匹配
        const password = document.getElementById('password').value;

        // 从Cookie中获取已存储的用户信息
        const userDetailsCookie = document.cookie.split('; ').find(row => row.startsWith('userDetails='));

        if (userDetailsCookie) {
            const userDataJSON = decodeURIComponent(userDetailsCookie.split('=')[1]);
            try {
                const storedUserData = JSON.parse(userDataJSON);

                // 验证用户名和密码是否与存储的匹配
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
