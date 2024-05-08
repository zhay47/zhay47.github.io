// Initialize posts with some dummy data
let posts = [
    { username: 'user1', content: 'This is the first post.', likes: 5, comments: [] },
    { username: 'user2', content: 'Another post here!', likes: 10, comments: [] }
];

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${post.username}</strong>: ${post.content}</p>
            <button class="like-btn" data-id="${index}">Like (${post.likes})</button>
            <form class="comment-form">
                <input type="text" class="comment-input" placeholder="Add a comment">
                <button type="submit">Comment</button>
            </form>
            <div class="comments-container"></div>
        `;
        post.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = `${comment.username}: ${comment.content}`;
            postElement.querySelector('.comments-container').appendChild(commentElement);
        });
        postsContainer.appendChild(postElement);
    });
}

// Display posts when the page loads
window.onload = displayPosts;

// Handle post submission
document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postContent = document.getElementById('post-content').value;
    if (postContent.trim() !== '') {
        posts.push({ username: 'current_user', content: postContent, likes: 0, comments: [] });
        displayPosts();
        document.getElementById('post-content').value = '';
    }
});

// Handle comment submission
document.addEventListener('submit', function(event) {
    if (event.target.matches('.comment-form')) {
        event.preventDefault();
        const postId = event.target.closest('.post').querySelector('.like-btn').getAttribute('data-id');
        const commentInput = event.target.querySelector('.comment-input');
        const commentContent = commentInput.value;
        if (commentContent.trim() !== '') {
            posts[postId].comments.push({ username: 'current_user', content: commentContent });
            displayPosts();
            commentInput.value = '';
        }
    }
});

// Handle like button click
document.addEventListener('click', function(event) {
    if (event.target.matches('.like-btn')) {
        const postId = event.target.getAttribute('data-id');
        posts[postId].likes++;
        displayPosts();
    }
});

