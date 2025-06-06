// Language colors mapping
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C#': '#239120',
    'C++': '#f34b7d',
    'C': '#555555',
    'PHP': '#4F5D95',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#4FC08D',
    'React': '#61DAFB',
    'Angular': '#DD0031',
    'Node.js': '#339933',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#fa7343',
    'Kotlin': '#F18E33',
    'Dart': '#00B4AB',
    'Shell': '#89e051',
    'PowerShell': '#012456',
    'Dockerfile': '#384d54'
};

// Function to get language color
function getLanguageColor(language) {
    return languageColors[language] || '#6e7681';
}

// Function to format number (1000 -> 1k)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Function to create repository card
function createRepoCard(repo) {
    const description = repo.description || 'Không có mô tả';
    const language = repo.language || 'Unknown';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const isPublic = !repo.private;

    return `
        <div class="repo-card">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" class="repo-name">
                    <i class="fas fa-book"></i>
                    ${repo.name}
                </a>
                <span class="repo-visibility">${isPublic ? 'Public' : 'Private'}</span>
            </div>
            <div class="repo-description">${description}</div>
            <div class="repo-stats">
                <div class="repo-stat">
                    <i class="fas fa-star"></i>
                    ${formatNumber(stars)}
                </div>
                <div class="repo-stat">
                    <i class="fas fa-code-branch"></i>
                    ${formatNumber(forks)}
                </div>
                <div class="repo-language">
                    <span class="language-color" style="background-color: ${getLanguageColor(language)}"></span>
                    ${language}
                </div>
            </div>
            <div class="repo-links">
                <a href="${repo.html_url}" target="_blank" class="repo-link">
                    <i class="fas fa-eye"></i>
                    Xem
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="repo-link">
                    <i class="fas fa-external-link-alt"></i>
                    Demo
                </a>` : ''}
            </div>
        </div>
    `;
}

// Function to load GitHub repositories
async function loadGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/DalatCoder/repos?sort=updated&per_page=6');
        const repos = await response.json();

        if (response.ok) {
            const reposGrid = document.getElementById('reposGrid');
            const loadingDiv = document.querySelector('.repos-loading');

            // Filter out forked repositories and get the most relevant ones
            const filteredRepos = repos
                .filter(repo => !repo.fork)
                .sort((a, b) => {
                    // Sort by stars first, then by updated date
                    if (b.stargazers_count !== a.stargazers_count) {
                        return b.stargazers_count - a.stargazers_count;
                    }
                    return new Date(b.updated_at) - new Date(a.updated_at);
                })
                .slice(0, 6);

            // Generate HTML for repositories
            reposGrid.innerHTML = filteredRepos.map(repo => createRepoCard(repo)).join('');

            // Hide loading and show repos
            loadingDiv.style.display = 'none';
            reposGrid.style.display = 'grid';
        } else {
            throw new Error('Failed to fetch repositories');
        }
    } catch (error) {
        console.error('Error loading GitHub repositories:', error);
        const loadingDiv = document.querySelector('.repos-loading');
        loadingDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Không thể tải repository từ GitHub. Vui lòng thử lại sau.</p>
        `;
    }
}

// Load repositories when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Delay loading slightly to improve page load performance
    setTimeout(loadGitHubRepos, 1000);
});

// QR Code Action Functions
function downloadQR() {
    const link = document.createElement('a');
    link.href = 'assets/QR.jpg';
    link.download = 'Zalo-QR-NguyenTrongHieu.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success feedback
    showNotification('📥 Đã tải xuống mã QR thành công!', 'success');
}

function shareQR() {
    if (navigator.share) {
        navigator.share({
            title: 'Kết nối với Nguyễn Trọng Hiếu qua Zalo',
            text: 'Quét mã QR này để chat với tôi trên Zalo',
            url: window.location.href
        }).then(() => {
            showNotification('📤 Đã chia sẻ thành công!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            copyLink(); // Fallback to copy link
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyLink();
    }
}

function copyLink() {
    const textToCopy = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('🔗 Đã sao chép link website!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(textToCopy);
        });
    } else {
        fallbackCopyTextToClipboard(textToCopy);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('🔗 Đã sao chép link website!', 'success');
        } else {
            showNotification('❌ Không thể sao chép. Vui lòng sao chép thủ công.', 'error');
        }
    } catch (err) {
        showNotification('❌ Không thể sao chép. Vui lòng sao chép thủ công.', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 15px;
                padding: 15px 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideInFromRight 0.3s ease-out;
                max-width: 350px;
                min-width: 300px;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
            }
            
            .notification-message {
                color: #333;
                font-weight: 500;
                font-size: 0.9em;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #333;
            }
            
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}
