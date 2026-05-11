// Înregistrare utilizator
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const postForm = document.getElementById('postForm');
const chatForm = document.getElementById('chatForm');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        
        // Stocăm utilizatorul în LocalStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (!existingUser) {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Utilizator înregistrat cu succes!');
        } else {
            alert('Numele de utilizator există deja!');
        }
    });
}

// Autentificare utilizator
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'home.html';
        } else {
            alert('Date de autentificare incorecte!');
        }
    });
}

// Afișare nume utilizator pe pagina principală
if (document.getElementById('usernameDisplay')) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('usernameDisplay').innerText = loggedInUser;

    // Gestionare postări
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { username: loggedInUser, fileUrl: URL.createObjectURL(file) };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        displayPosts();
    });

    function displayPosts() {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<strong>${post.username}:</strong> <br> <img src="${post.fileUrl}" width="200">`;
            postsContainer.appendChild(postElement);
        });
    }

    displayPosts();
}

// Chat simplu
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('chatMessage').value;

        const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const newMessage = { username: localStorage.getItem('loggedInUser'), message };
        chatMessages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));

        displayChatMessages();
        document.getElementById('chatMessage').value = '';
    });

    function displayChatMessages() {
        const


if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('chatMessage').value;

        if (message.trim()) {
            const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
            const newMessage = { username: localStorage.getItem('loggedInUser'), message };
            chatMessages.push(newMessage);
            localStorage.setItem('chatMessages', JSON.stringify(chatMessages));

            displayChatMessages(); // Reîncarcă mesajele de chat pentru a include mesajul nou
            document.getElementById('chatMessage').value = ''; // Șterge câmpul de text
        }
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('chatMessage').value;

        if (message.trim()) {
            const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
            const newMessage = { username: localStorage.getItem('loggedInUser'), message };
            chatMessages.push(newMessage);
            localStorage.setItem('chatMessages', JSON.stringify(chatMessages));

            displayChatMessages(); // Reîncarcă mesajele de chat pentru a include mesajul nou
            document.getElementById('chatMessage').value = ''; // Șterge câmpul de text
        }
    });
}