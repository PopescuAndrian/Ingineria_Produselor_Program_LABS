document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button[data-subreddit]");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const subreddit = button.getAttribute("data-subreddit");
            window.location.href = `threads.html?subreddit=${subreddit}`; // Redirect to threads page with subreddit parameter
        });
    });

    if (window.location.pathname.includes("threads.html")) {
        fetchRedditThreads();
    }
});

function fetchRedditThreads() {
    console.log("Fetching Reddit threads...");
    
    const subreddit = new URLSearchParams(window.location.search).get("subreddit");
    if (!subreddit) {
        console.error("No subreddit specified.");
        return;
    }

    const url = `https://www.reddit.com/r/${subreddit}.json`;

    fetch(url)  
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            const posts = data.data.children;
            const threadsList = document.getElementById("threads");
            threadsList.innerHTML = ""; // Clear previous results

            if (posts.length === 0) {
                threadsList.innerHTML = "<li>No threads found.</li>";
                return;
            }

            posts.forEach(post => {
                const title = post.data.title || "No title available";
                const author = post.data.author || "Unknown author";
                const permalink = `https://www.reddit.com${post.data.permalink}`;

                console.log(`Title: ${title}, Author: ${author}`); // Debugging

                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <a href="${permalink}" target="_blank"><strong>${title}</strong></a>
                    <span> - Posted by: <em>${author}</em></span>
                `;
                threadsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}
