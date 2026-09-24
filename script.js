/* =========================================
   NEWSNEST - SCRIPT.JS
   HTML + CSS + JAVASCRIPT ONLY
========================================= */


/* =========================================
   DEFAULT NEWS ARTICLES
========================================= */

const defaultArticles = [
    {
        id: 1,
        title: "Artificial Intelligence Is Transforming Modern Technology",
        category: "Technology",
        description: "AI continues to change how people work, learn and interact with technology.",
        date: "24 Sep 2026",
        icon: "🤖"
    },

    {
        id: 2,
        title: "New Technologies Are Changing the Future of Education",
        category: "Technology",
        description: "Digital tools and intelligent systems are creating new learning experiences.",
        date: "24 Sep 2026",
        icon: "💻"
    },

    {
        id: 3,
        title: "Major Sporting Events Bring Fans Together",
        category: "Sports",
        description: "Sports continue to bring millions of fans together across the world.",
        date: "23 Sep 2026",
        icon: "⚽"
    },

    {
        id: 4,
        title: "Global Businesses Adapt to a Changing Economy",
        category: "Business",
        description: "Companies are adapting their strategies to respond to changing markets.",
        date: "23 Sep 2026",
        icon: "📈"
    },

    {
        id: 5,
        title: "Scientists Make Progress in Renewable Energy Research",
        category: "Science",
        description: "Researchers continue developing cleaner and more efficient energy solutions.",
        date: "22 Sep 2026",
        icon: "🔬"
    },

    {
        id: 6,
        title: "New Entertainment Releases Attract Global Audiences",
        category: "Entertainment",
        description: "The entertainment industry continues to introduce new movies and music.",
        date: "22 Sep 2026",
        icon: "🎬"
    },

    {
        id: 7,
        title: "Technology Policy Becomes an Important Public Discussion",
        category: "Politics",
        description: "Governments around the world are discussing policies related to technology.",
        date: "21 Sep 2026",
        icon: "🏛️"
    },

    {
        id: 8,
        title: "Innovation Continues to Drive the Startup Ecosystem",
        category: "Business",
        description: "New startups are developing solutions for modern problems.",
        date: "21 Sep 2026",
        icon: "🚀"
    }
];


/* =========================================
   INITIALIZE LOCAL STORAGE
========================================= */

function initializeData() {

    if (!localStorage.getItem("articles")) {
        localStorage.setItem(
            "articles",
            JSON.stringify(defaultArticles)
        );
    }

    if (!localStorage.getItem("users")) {

        const adminUser = [
            {
                name: "Admin",
                email: "admin@newsnest.com",
                password: "admin123",
                role: "admin"
            }
        ];

        localStorage.setItem(
            "users",
            JSON.stringify(adminUser)
        );
    }

    if (!localStorage.getItem("savedArticles")) {

        localStorage.setItem(
            "savedArticles",
            JSON.stringify([])
        );
    }
}


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }

    if (pageId === "userPage") {
        loadUserInformation();
        displayNews();
    }

    if (pageId === "adminPage") {
        displayAdminData();
    }
}


/* =========================================
   SIGN UP
========================================= */

function signupUser(event) {

    event.preventDefault();

    const name = document
        .getElementById("signupName")
        .value
        .trim();

    const email = document
        .getElementById("signupEmail")
        .value
        .trim();

    const password = document
        .getElementById("signupPassword")
        .value;

    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("An account with this email already exists.");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        role: "user"
    };

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Account created successfully!");

    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";

    showPage("loginPage");
}


/* =========================================
   LOGIN
========================================= */

function loginUser(event) {

    event.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const user = users.find(function(user) {

        return (
            user.email === email &&
            user.password === password
        );

    });

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    if (user.role === "admin") {
        showPage("adminPage");
    } else {
        showPage("userPage");
    }
}


/* =========================================
   LOAD USER INFORMATION
========================================= */

function loadUserInformation() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        return;
    }

    document.getElementById("userName").textContent =
        currentUser.name;

    document.getElementById("welcomeUser").textContent =
        currentUser.name;
}


/* =========================================
   DISPLAY NEWS
========================================= */

function displayNews(category = "All", searchText = "") {

    const articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];

    const container =
        document.getElementById("newsContainer");

    container.innerHTML = "";

    const filteredArticles = articles.filter(function(article) {

        const categoryMatch =
            category === "All" ||
            article.category === category;

        const titleMatch =
            article.title
                .toLowerCase()
                .includes(searchText.toLowerCase());

        const descriptionMatch =
            article.description
                .toLowerCase()
                .includes(searchText.toLowerCase());

        return (
            categoryMatch &&
            (titleMatch || descriptionMatch)
        );
    });


    if (filteredArticles.length === 0) {

        container.innerHTML =
            "<p>No articles found.</p>";

        return;
    }


    filteredArticles.forEach(function(article) {

        const card = document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `
            <div class="news-image">
                ${article.icon || "📰"}
            </div>

            <div class="news-content">

                <span class="news-category">
                    ${article.category}
                </span>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.description}
                </p>

                <div class="news-footer">

                    <span class="news-date">
                        ${article.date}
                    </span>

                    <button
                        class="save-btn"
                        onclick="saveArticle(${article.id})">
                        ❤️ Save
                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterNews(category, button) {

    const buttons =
        document.querySelectorAll(
            ".filter-buttons button"
        );

    buttons.forEach(function(btn) {
        btn.classList.remove("active-filter");
    });

    button.classList.add("active-filter");

    const searchText =
        document.getElementById("searchInput").value;

    displayNews(category, searchText);
}


/* =========================================
   SEARCH
========================================= */

function searchNews() {

    const searchText =
        document.getElementById("searchInput").value;

    displayNews("All", searchText);
}


/* =========================================
   SAVE ARTICLE
========================================= */

function saveArticle(articleId) {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    let savedArticles = JSON.parse(
        localStorage.getItem("savedArticles")
    ) || [];

    const alreadySaved = savedArticles.find(function(item) {

        return (
            item.articleId === articleId &&
            item.userEmail === currentUser.email
        );
    });

    if (alreadySaved) {
        alert("Article is already saved.");
        return;
    }

    savedArticles.push({
        articleId: articleId,
        userEmail: currentUser.email
    });

    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );

    alert("Article saved successfully!");
}


/* =========================================
   SHOW SAVED ARTICLES
========================================= */

function showSavedArticles() {

    showPage("savedPage");

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];

    const savedArticles = JSON.parse(
        localStorage.getItem("savedArticles")
    ) || [];

    const container =
        document.getElementById("savedContainer");

    container.innerHTML = "";

    const userSavedArticles =
        savedArticles.filter(function(item) {

            return item.userEmail === currentUser.email;

        });


    if (userSavedArticles.length === 0) {

        container.innerHTML =
            "<p>You haven't saved any articles yet.</p>";

        return;
    }


    userSavedArticles.forEach(function(savedItem) {

        const article = articles.find(function(item) {

            return item.id === savedItem.articleId;

        });

        if (!article) {
            return;
        }

        const card = document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `
            <div class="news-image">
                ${article.icon || "📰"}
            </div>

            <div class="news-content">

                <span class="news-category">
                    ${article.category}
                </span>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.description}
                </p>

                <div class="news-footer">

                    <span class="news-date">
                        ${article.date}
                    </span>

                    <button
                        class="save-btn saved"
                        onclick="removeSavedArticle(${article.id})">
                        ❤️ Saved
                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);
    });
}


/* =========================================
   REMOVE SAVED ARTICLE
========================================= */

function removeSavedArticle(articleId) {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    let savedArticles = JSON.parse(
        localStorage.getItem("savedArticles")
    ) || [];

    savedArticles = savedArticles.filter(function(item) {

        return !(
            item.articleId === articleId &&
            item.userEmail === currentUser.email
        );

    });

    localStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
    );

    showSavedArticles();
}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function displayAdminData() {

    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];

    const savedArticles = JSON.parse(
        localStorage.getItem("savedArticles")
    ) || [];


    const normalUsers = users.filter(function(user) {

        return user.role === "user";

    });


    document.getElementById("totalUsers").textContent =
        normalUsers.length;

    document.getElementById("totalArticles").textContent =
        articles.length;

    document.getElementById("totalSaved").textContent =
        savedArticles.length;


    displayAdminArticles();

    displayUsers();
}


/* =========================================
   DISPLAY ADMIN ARTICLES
========================================= */

function displayAdminArticles() {

    const articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];

    const container =
        document.getElementById("adminArticles");

    container.innerHTML = "";


    articles.forEach(function(article) {

        const row = document.createElement("div");

        row.className = "admin-article";

        row.innerHTML = `
            <div>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.category}
                </p>

            </div>

            <button
                class="delete-btn"
                onclick="deleteArticle(${article.id})">
                Delete
            </button>
        `;

        container.appendChild(row);
    });
}


/* =========================================
   ADD ARTICLE
========================================= */

function addArticle(event) {

    event.preventDefault();

    const title =
        document.getElementById("articleTitle").value.trim();

    const category =
        document.getElementById("articleCategory").value;

    const description =
        document
            .getElementById("articleDescription")
            .value
            .trim();


    const articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];


    const newArticle = {

        id: Date.now(),

        title: title,

        category: category,

        description: description,

        date: "24 Sep 2026",

        icon: getCategoryIcon(category)

    };


    articles.push(newArticle);


    localStorage.setItem(
        "articles",
        JSON.stringify(articles)
    );


    alert("Article added successfully!");


    document.getElementById("articleTitle").value = "";

    document.getElementById("articleCategory").value = "";

    document.getElementById("articleDescription").value = "";


    displayAdminData();
}


/* =========================================
   DELETE ARTICLE
========================================= */

function deleteArticle(articleId) {

    const answer = confirm(
        "Are you sure you want to delete this article?"
    );

    if (!answer) {
        return;
    }


    let articles = JSON.parse(
        localStorage.getItem("articles")
    ) || [];


    articles = articles.filter(function(article) {

        return article.id !== articleId;

    });


    localStorage.setItem(
        "articles",
        JSON.stringify(articles)
    );


    displayAdminData();
}


/* =========================================
   CATEGORY ICON
========================================= */

function getCategoryIcon(category) {

    const icons = {

        Technology: "💻",

        Sports: "⚽",

        Business: "📈",

        Science: "🔬",

        Entertainment: "🎬",

        Politics: "🏛️"

    };

    return icons[category] || "📰";
}


/* =========================================
   DISPLAY USERS
========================================= */

function displayUsers() {

    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const container =
        document.getElementById("usersList");

    container.innerHTML = "";


    users.forEach(function(user) {

        const row = document.createElement("div");

        row.className = "user-row";

        row.innerHTML = `
            <div>

                <strong>
                    ${user.name}
                </strong>

                <p>
                    ${user.email}
                </p>

            </div>

            <span class="user-role">
                ${user.role}
            </span>
        `;

        container.appendChild(row);
    });
}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem("currentUser");

    showPage("landingPage");
}


/* =========================================
   RESET PROJECT
========================================= */

function resetProject() {

    const answer = confirm(
        "This will delete all users, saved articles and added articles. Start completely fresh?"
    );

    if (!answer) {
        return;
    }

    localStorage.clear();

    alert("Project data has been reset!");

    location.reload();
}


/* =========================================
   START APPLICATION
========================================= */

initializeData();

showPage("landingPage");