document.addEventListener('DOMContentLoaded', () => {
    // Înregistrare utilizator
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const postForm = document.getElementById('postForm');
    const chatForm = document.getElementById('chatForm');
    const logoutButton = document.getElementById('logoutButton');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
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

    if (document.getElementById('usernameDisplay')) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        document.getElementById('usernameDisplay').innerText = loggedInUser;

        // Afișare postări
        function displayPosts() {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                const mediaElement = document.createElement(post.fileUrl.endsWith('.mp4') ? 'video' : 'img');
                mediaElement.src = post.fileUrl;
                if (post.fileUrl.endsWith('.mp4')) {
                    mediaElement.controls = true;
                }
                postElement.innerHTML = `<strong>${post.username}:</strong><br>`;
                postElement.appendChild(mediaElement);
                
                // Adaugă buton de ștergere
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Șterge';
                deleteButton.addEventListener('click', () => {
                    deletePost(index);
                });
                postElement.appendChild(deleteButton);

                postsContainer.appendChild(postElement);
            });
        }

        function deletePost(index) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.splice(index, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts(); // Reîncarcă lista de postări
        }

        displayPosts();

        displayPosts();

        // Gestionare postări
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (file) {
                const posts = JSON.parse(localStorage.getItem('posts')) || [];
                const newPost = { username: loggedInUser, fileUrl: URL.createObjectURL(file) };
                posts.push(newPost);
                localStorage.setItem('posts', JSON.stringify(posts));
                displayPosts();
            }
        });

        // Gestionare chat
        function displayChatMessages() {
            const chatContainer = document.getElementById('chatContainer');
            chatContainer.innerHTML = '';
            const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
            chatMessages.forEach((msg, index) => {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = `<strong>${msg.username}:</strong> <p>${msg.message}</p>`;
                
                // Adaugă buton de ștergere
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Șterge';
                deleteButton.addEventListener('click', () => {
                    deleteChatMessage(index);
                });
                messageElement.appendChild(deleteButton);

                chatContainer.appendChild(messageElement);
            });
        }

        function deleteChatMessage(index) {
            const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
            chatMessages.splice(index, 1);
            localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
            displayChatMessages(); // Reîncarcă lista de mesaje
        }

        displayChatMessages();

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('chatMessage').value;

            if (message.trim()) {
                const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
                const newMessage = { username: loggedInUser, message };
                chatMessages.push(newMessage);
                localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
                displayChatMessages();
                document.getElementById('chatMessage').value = '';
            }
        });

        // Deconectare utilizator
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                window.location.href = 'index.html';
            });
        }
    }
});
 