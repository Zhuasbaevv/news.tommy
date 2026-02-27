const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const postsContainer = document.getElementById('postsContainer');

// Показать/скрыть админку
adminBtn.addEventListener('click', () => {
    adminPanel.classList.toggle('hidden');
});

// Функция добавления новости
function addNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;

    if(title && content) {
        const post = { id: Date.now(), title, content };
        savePost(post);
        renderPosts();
    }
}

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('news')) || [];
    posts.unshift(post);
    localStorage.setItem('news', JSON.stringify(posts));
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('news'));
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('news', JSON.stringify(posts));
    renderPosts();
}

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem('news')) || [];
    postsContainer.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="delete-btn" onclick="deletePost(${post.id})">Удалить</button>
        </div>
    `).join('');
}

// Загрузить новости при старте
renderPosts();
