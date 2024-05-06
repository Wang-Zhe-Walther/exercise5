document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 获取存储在Cookie中的用户凭证
        const userCredentials = getCookie('userCredentials');
        if (userCredentials) {
            try {
                const credentials = JSON.parse(userCredentials);

                // 验证用户名和密码
                if (username === credentials.username && password === credentials.password) {
                    alert('Login successful!');
                    window.location.href = 'shopping.html';
                } else {
                    alert('Invalid username or password.');
                    window.location.href = 'index.html';
                }
            } catch (e) {
                console.error('Error parsing cookie data:', e);
                alert('Error in user credentials format.');
            }
        } else {
            alert('No user registered yet.');
            window.location.href = 'index.html';
        }
    });
});

// 函数用于从Cookie中获取指定名称的值
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}