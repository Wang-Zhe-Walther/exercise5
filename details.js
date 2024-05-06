document.addEventListener('DOMContentLoaded', function() {
    displayUserDataFromCookie();
    document.getElementById('deleteAllButton').addEventListener('click', deleteAllUserData);
});

function displayUserDataFromCookie() {
    const userList = document.getElementById('cookieList');
    userList.innerHTML = ''; // 清空现有列表内容

    const cookies = document.cookie.split(';');
    let foundUserData = false;
    cookies.forEach(cookie => {
        let cookiePair = cookie.trim().split('=');
        if (cookiePair[0] === 'userDetails') {
            foundUserData = true;
            let userDataJSON = decodeURIComponent(cookiePair[1]);
            let userData = JSON.parse(userDataJSON);

            let listItem = document.createElement('li');
            listItem.textContent = `Username: ${userData.username}, Password: ${userData.password}`;
            userList.appendChild(listItem);
        }
    });

    if (!foundUserData) {
        userList.innerHTML = '<li>No user data stored.</li>';
    }
}

function deleteAllUserData() {
    document.cookie = 'userDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    displayUserDataFromCookie();
    alert('All user data has been deleted.');
}