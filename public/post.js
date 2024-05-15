const postButton = document.getElementById('postButton');
const title=document.getElementById('title');
const content=document.getElementById('content');
if (postButton) {
    postButton.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log(title.value);
        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                window.location.href = '/dashboard';  // Redirect on successful login
            } else {
                // Display error message directly on the form
                displayLoginError(result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    });
}