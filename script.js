// FundMe Application JavaScript

// Sample data for assistance resources
const assistanceResources = [
    {
        id: 1,
        title: "r/Assistance",
        platform: "Reddit",
        category: "reddit",
        description: "A community for people who need help and are willing to help others. No strings attached.",
        link: "https://www.reddit.com/r/Assistance/",
        members: "320k",
        rules: "Must have 400+ karma and 60-day account age",
        tags: ["general help", "emergency", "bills", "food"]
    },
    {
        id: 2,
        title: "r/borrow",
        platform: "Reddit",
        category: "reddit",
        description: "A community for monetary loans between redditors. All loans must be paid back.",
        link: "https://www.reddit.com/r/borrow/",
        members: "180k",
        rules: "Must have good Reddit history and follow strict lending protocols",
        tags: ["loans", "emergency", "bills"]
    },
    {
        id: 3,
        title: "r/Random_Acts_Of_Pizza",
        platform: "Reddit",
        category: "reddit",
        description: "A place where people can request pizza and generous redditors can fulfill those requests.",
        link: "https://www.reddit.com/r/Random_Acts_Of_Pizza/",
        members: "155k",
        rules: "Must have 90-day account age",
        tags: ["food", "pizza", "kindness"]
    },
    {
        id: 4,
        title: "CashApp Blessings Community",
        platform: "Facebook",
        category: "cashapp",
        description: "A Facebook group where members share CashApp blessings and help each other financially.",
        link: "#",
        members: "45k",
        rules: "No begging, must participate in community discussions",
        tags: ["cashapp", "blessings", "financial help"]
    },
    {
        id: 5,
        title: "PayPal Blessings Network",
        platform: "Facebook",
        category: "paypal",
        description: "Connect with generous people who offer PayPal assistance and financial blessings.",
        link: "#",
        members: "38k",
        rules: "Verified PayPal accounts only, no scams tolerated",
        tags: ["paypal", "blessings", "financial assistance"]
    },
    {
        id: 6,
        title: "r/CashAppBlessings",
        platform: "Reddit",
        category: "cashapp",
        description: "Reddit community for CashApp blessing requests and generous giving.",
        link: "https://www.reddit.com/r/CashAppBlessings/",
        members: "25k",
        rules: "Must have verified CashApp and good Reddit standing",
        tags: ["cashapp", "blessings", "financial help"]
    },
    {
        id: 7,
        title: "Emergency Financial Help",
        platform: "Facebook",
        category: "emergency",
        description: "Immediate assistance for urgent financial situations like medical bills, eviction, utilities.",
        link: "#",
        members: "67k",
        rules: "Must provide proof of emergency situation",
        tags: ["emergency", "medical", "bills", "urgent"]
    },
    {
        id: 8,
        title: "r/personalfinance",
        platform: "Reddit",
        category: "bills",
        description: "Financial advice and assistance resources for managing bills and debt.",
        link: "https://www.reddit.com/r/personalfinance/",
        members: "15M",
        rules: "Follow subreddit guidelines for financial advice",
        tags: ["financial advice", "bills", "debt", "budgeting"]
    },
    {
        id: 9,
        title: "Utility Bill Assistance Network",
        platform: "Facebook",
        category: "bills",
        description: "Help with electricity, water, gas, and other utility bills for families in need.",
        link: "#",
        members: "23k",
        rules: "Must show utility disconnect notice or past due bill",
        tags: ["utilities", "bills", "electricity", "water", "gas"]
    },
    {
        id: 10,
        title: "r/food_pantry",
        platform: "Reddit",
        category: "reddit",
        description: "Request and offer food assistance, including groceries and restaurant gift cards.",
        link: "https://www.reddit.com/r/food_pantry/",
        members: "89k",
        rules: "Must have 90-day account age and provide proof of need",
        tags: ["food", "groceries", "gift cards", "meals"]
    }
];

// Application state
let currentView = 'home';
let searchResults = [];
let favorites = JSON.parse(localStorage.getItem('fundme-favorites')) || [];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const mainSearch = document.getElementById('main-search');
const searchBtn = document.getElementById('search-btn');
const categoryCards = document.querySelectorAll('.category-card');
const searchResultsSection = document.getElementById('search-results');
const resultsContainer = document.getElementById('results-list');
const loadingElement = document.querySelector('.loading');
const favoritesSection = document.getElementById('favorites');
const favoritesList = document.getElementById('favorites-list');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateFavoritesDisplay();
    showSection('home');
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            showSection(target);
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    mainSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            searchByCategory(category);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Navigation
function showSection(sectionName) {
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionName}`) {
            link.classList.add('active');
        }
    });

    // Show/hide sections
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('fade-in-up');
    }

    currentView = sectionName;

    // Update favorites display when favorites section is shown
    if (sectionName === 'favorites') {
        updateFavoritesDisplay();
    }
}

// Search functionality
function performSearch() {
    const query = mainSearch.value.trim().toLowerCase();
    if (!query) return;

    showSection('search-results');
    showLoading();

    // Simulate AI processing time
    setTimeout(() => {
        const results = searchResources(query);
        displaySearchResults(results, query);
        hideLoading();
    }, 1500);
}

function searchByCategory(category) {
    showSection('search-results');
    showLoading();

    setTimeout(() => {
        const results = assistanceResources.filter(resource => 
            resource.category === category
        );
        displaySearchResults(results, `${category} resources`);
        hideLoading();
    }, 1000);
}

function searchResources(query) {
    const queryTerms = query.split(' ').map(term => term.toLowerCase());
    
    return assistanceResources.filter(resource => {
        const searchText = `
            ${resource.title} 
            ${resource.description} 
            ${resource.platform} 
            ${resource.tags.join(' ')} 
            ${resource.category}
        `.toLowerCase();

        return queryTerms.some(term => searchText.includes(term));
    }).sort((a, b) => {
        // Sort by relevance (simple scoring based on title matches)
        const aScore = queryTerms.reduce((score, term) => {
            return score + (a.title.toLowerCase().includes(term) ? 10 : 0) +
                   (a.description.toLowerCase().includes(term) ? 5 : 0) +
                   (a.tags.some(tag => tag.includes(term)) ? 3 : 0);
        }, 0);
        
        const bScore = queryTerms.reduce((score, term) => {
            return score + (b.title.toLowerCase().includes(term) ? 10 : 0) +
                   (b.description.toLowerCase().includes(term) ? 5 : 0) +
                   (b.tags.some(tag => tag.includes(term)) ? 3 : 0);
        }, 0);
        
        return bScore - aScore;
    });
}

function displaySearchResults(results, searchTerm) {
    const resultsHeader = document.querySelector('.search-results h3');
    resultsHeader.textContent = `Search Results for "${searchTerm}" (${results.length} found)`;

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h4>No results found</h4>
                <p>Try searching with different keywords or browse our categories.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.map(resource => createResourceCard(resource)).join('');

    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceId = parseInt(btn.getAttribute('data-id'));
            toggleFavorite(resourceId);
        });
    });
}

function createResourceCard(resource) {
    const isFavorited = favorites.includes(resource.id);
    const platformIcon = getPlatformIcon(resource.platform);
    
    return `
        <div class="result-item fade-in-up">
            <div class="result-header">
                <div>
                    <div class="result-title">${resource.title}</div>
                    <div class="result-platform">${platformIcon} ${resource.platform}</div>
                </div>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-id="${resource.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="result-description">${resource.description}</div>
            <div class="result-meta">
                <span><i class="fas fa-users"></i> ${resource.members} members</span>
                <span><i class="fas fa-info-circle"></i> ${resource.rules}</span>
            </div>
            <div class="result-tags">
                ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="result-actions">
                <a href="${resource.link}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i>
                    Visit Community
                </a>
                <button class="btn btn-outline" onclick="copyLink('${resource.link}')">
                    <i class="fas fa-copy"></i>
                    Copy Link
                </button>
            </div>
        </div>
    `;
}

function getPlatformIcon(platform) {
    const icons = {
        'Reddit': '<i class="fab fa-reddit"></i>',
        'Facebook': '<i class="fab fa-facebook"></i>',
        'Discord': '<i class="fab fa-discord"></i>',
        'Telegram': '<i class="fab fa-telegram"></i>'
    };
    return icons[platform] || '<i class="fas fa-globe"></i>';
}

// Favorites functionality
function toggleFavorite(resourceId) {
    const index = favorites.indexOf(resourceId);
    
    if (index === -1) {
        favorites.push(resourceId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('fundme-favorites', JSON.stringify(favorites));
    
    // Update UI
    updateFavoriteButtons();
    if (currentView === 'favorites') {
        updateFavoritesDisplay();
    }
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const resourceId = parseInt(btn.getAttribute('data-id'));
        const isFavorited = favorites.includes(resourceId);
        
        btn.classList.toggle('favorited', isFavorited);
    });
}

function updateFavoritesDisplay() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-favorites">No saved resources yet. Start browsing to add favorites!</p>';
        return;
    }

    const favoriteResources = assistanceResources.filter(resource => 
        favorites.includes(resource.id)
    );

    favoritesList.innerHTML = favoriteResources.map(resource => createResourceCard(resource)).join('');

    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceId = parseInt(btn.getAttribute('data-id'));
            toggleFavorite(resourceId);
        });
    });
}

// Utility functions
function showLoading() {
    loadingElement.classList.remove('hidden');
    resultsContainer.innerHTML = '';
}

function hideLoading() {
    loadingElement.classList.add('hidden');
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        // Show temporary success message
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Link copied to clipboard!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }).catch(() => {
        alert('Failed to copy link. Please copy it manually.');
    });
}

// Add CSS for tags and additional styles
const additionalCSS = `
    .result-meta {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
        font-size: 0.9rem;
        color: #666;
    }
    
    .result-meta span {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .result-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
    }
    
    .tag {
        background: #f0f0f0;
        color: #555;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .no-results {
        text-align: center;
        padding: 80px 20px;
        color: #666;
    }
    
    .no-results h4 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .toast {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #667eea;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Add sample search suggestions
const searchSuggestions = [
    "emergency rent help",
    "food assistance",
    "utility bill help",
    "medical expenses",
    "cashapp blessings",
    "paypal assistance",
    "reddit help communities",
    "facebook assistance groups"
];

// Add search suggestions functionality
mainSearch.addEventListener('focus', () => {
    if (!mainSearch.value) {
        const randomSuggestion = searchSuggestions[Math.floor(Math.random() * searchSuggestions.length)];
        mainSearch.placeholder = `e.g., "${randomSuggestion}"`;
    }
});

mainSearch.addEventListener('blur', () => {
    mainSearch.placeholder = "What kind of assistance do you need?";
});

// Analytics and user engagement (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Here you would integrate with analytics services like Google Analytics
}

// Track user interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-card')) {
        trackEvent('category_clicked', { category: e.target.getAttribute('data-category') });
    }
    
    if (e.target.closest('.btn-primary')) {
        trackEvent('resource_visited', { link: e.target.closest('a')?.href });
    }
});
