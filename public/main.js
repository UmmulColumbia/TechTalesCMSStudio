// Check if the document is fully loaded before executing any script
document.addEventListener('DOMContentLoaded', function() {
    console.log("The Tech Blog is now interactive!");

    // Example of adding an event listener to a logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Perform logout operation, typically an AJAX request
            fetch('/logout', {
                method: 'POST'
            }).then(response => {
                if (response.ok) {
                    console.log('Logged out successfully');
                    window.location.href = '/login';  // Redirect to login page after logout
                } else {
                    console.error('Failed to log out');
                }
            }).catch(error => {
                console.error('Error logging out:', error);
            });
        });
    }

    // Example of AJAX request to fetch dashboard data
    if (document.querySelector('.dashboard')) {
        fetch('/api/dashboard')
            .then(response => response.json())
            .then(data => {
                console.log('Dashboard data:', data);
                displayDashboardData(data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }

    // Function to display dashboard data dynamically
    function displayDashboardData(data) {
        const dashboardDiv = document.querySelector('.dashboard-data');
        if (dashboardDiv) {
            dashboardDiv.innerHTML = '';  // Clear existing content
            data.forEach(item => {
                const dataElement = document.createElement('div');
                dataElement.textContent = item.content;  // Assume 'item' has a 'content' field
                dashboardDiv.appendChild(dataElement);
            });
        }
    }
});
