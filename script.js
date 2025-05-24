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

// --- GoFundMe and AI Fundraiser Features ---

// Mock GoFundMe data
const gofundmeFundraisers = [
    {
        id: 1,
        title: "Help Sarah Beat Cancer",
        description: "Sarah is battling leukemia and needs support for her treatment and recovery.",
        amount: "$12,500 raised of $20,000",
        link: "https://www.gofundme.com/f/help-sarah-beat-cancer",
        category: "medical",
        location: "Austin, TX"
    },
    {
        id: 2,
        title: "Rent Relief for the Johnson Family",
        description: "The Johnsons are facing eviction and need urgent help to cover rent and utilities.",
        amount: "$3,200 raised of $5,000",
        link: "https://www.gofundme.com/f/rent-relief-johnson-family",
        category: "rent",
        location: "Detroit, MI"
    },
    {
        id: 3,
        title: "Support Maria's College Dream",
        description: "Maria is a first-generation student raising funds for her college tuition.",
        amount: "$7,800 raised of $10,000",
        link: "https://www.gofundme.com/f/support-maria-college",
        category: "education",
        location: "Los Angeles, CA"
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

    // Add dark mode toggle with custom class for styling
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    document.body.appendChild(darkModeToggle);

    let darkMode = false;
    darkModeToggle.onclick = function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        darkModeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
    };

    // GoFundMe search functionality
    const gfmSearch = document.getElementById('gfm-search');
    const gfmSearchBtn = document.getElementById('gfm-search-btn');
    const gfmResultsList = document.getElementById('gfm-results-list');
    const gfmAICreateBtn = document.getElementById('gfm-ai-create-btn');

    if (gfmSearchBtn) {
        gfmSearchBtn.addEventListener('click', () => {
            const query = gfmSearch.value.trim().toLowerCase();
            const results = gofundmeFundraisers.filter(f =>
                f.title.toLowerCase().includes(query) ||
                f.description.toLowerCase().includes(query) ||
                f.category.toLowerCase().includes(query)
            );
            displayGoFundMeResults(results);
        });
    }

    // AI Create Fundraiser (mocked)
    if (gfmAICreateBtn) {
        gfmAICreateBtn.addEventListener('click', () => {
            const aiFundraiser = {
                title: "AI-Generated: Help Alex Recover from Surgery",
                description: "Alex needs urgent support for post-surgery care and rehabilitation. Every contribution helps!",
                amount: "$0 raised of $8,000",
                link: "#",
                category: "medical",
                location: "Chicago, IL"
            };
            displayGoFundMeResults([aiFundraiser, ...gofundmeFundraisers]);
        });
    }
}

// AI Promotion Feature (moved outside setupEventListeners for clarity)
const aiGenerateBtn = document.getElementById('ai-generate-btn');
const aiFundraiserDesc = document.getElementById('ai-fundraiser-desc');
const aiPromoOutput = document.getElementById('ai-promo-output');

if (aiGenerateBtn) {
    aiGenerateBtn.addEventListener('click', () => {
        const userDesc = aiFundraiserDesc.value.trim();
        const aiText = userDesc
            ? `🌟 Support Needed! 🌟\n${userDesc}\nEvery donation, big or small, makes a difference. Please share and help us reach our goal! #Fundraiser #Support #Community`
            : `🌟 Support Needed! 🌟\nI'm raising funds for an urgent cause. Every donation, big or small, makes a difference. Please share and help us reach our goal! #Fundraiser #Support #Community`;
        aiPromoOutput.textContent = aiText;
    });
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

    // Display GoFundMe results if GoFundMe section is shown
    if (sectionName === 'gofundme') {
        displayGoFundMeResults(gofundmeFundraisers);
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

// GoFundMe results display
function displayGoFundMeResults(results) {
    const gfmResultsList = document.getElementById('gfm-results-list');
    if (!gfmResultsList) return;
    if (results.length === 0) {
        gfmResultsList.innerHTML = '<div class="no-results"><i class="fas fa-search" style="font-size:2rem;color:#ccc;"></i><h4>No fundraisers found</h4></div>';
        return;
    }
    gfmResultsList.innerHTML = results.map(f => `
        <div class="gfm-card fade-in-up">
            <div class="gfm-title">${f.title}</div>
            <div class="gfm-meta"><i class="fas fa-map-marker-alt"></i> ${f.location} &nbsp; <span>${f.amount}</span></div>
            <div class="gfm-desc">${f.description}</div>
            <div class="gfm-actions">
                <a href="${f.link}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> View Fundraiser</a>
                <button class="btn btn-outline" onclick="copyLink('${f.link}')"><i class="fas fa-copy"></i> Copy Link</button>
                <button class="btn btn-outline apply-btn" data-id="${f.id}"><i class="fas fa-paper-plane"></i> Apply/Contact</button>
            </div>
        </div>
    `).join('');
    // Add event listeners for apply buttons
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showApplyModal();
        });
    });
}

// Apply/Contact Modal (mocked)
function showApplyModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.4)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10001';
    modal.innerHTML = `
        <div style="background:#fff;padding:32px 24px;border-radius:16px;max-width:350px;width:100%;box-shadow:0 8px 32px rgba(31,38,135,0.18);text-align:center;">
            <h4>Apply/Contact</h4>
            <p>To apply or contact the fundraiser, please visit the GoFundMe page and use their contact form or donation button.</p>
            <button class="btn btn-primary" id="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => modal.remove();
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

    .dark-mode {
        background-color: #121212;
        color: #e0e0e0;
    }

    .dark-mode .result-item {
        background-color: #1e1e1e;
        border: 1px solid #333;
    }

    .dark-mode .btn-primary {
        background-color: #667eea;
        color: white;
    }

    .dark-mode .btn-outline {
        background-color: transparent;
        color: #667eea;
        border: 1px solid #667eea;
    }

    .dark-mode .tag {
        background: #333;
        color: #fff;
    }

    .dark-mode .nav-menu {
        background: #1e1e1e;
        border-top: 1px solid #333;
    }

    .dark-mode .nav-link.active {
        color: #667eea;
    }

    .dark-mode .nav-link {
        color: #e0e0e0;
    }

    .dark-mode h3 {
        color: #fff;
    }

    .dark-mode p, .dark-mode span {
        color: #ccc;
    }

    .dark-mode .empty-favorites {
        color: #bbb;
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
