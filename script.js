// Dark Mode functionality
function initDarkMode() {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
  
  // Toggle function
  function toggleDarkMode() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    
    // Add a subtle animation effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }
  
  // Add event listeners to both toggle buttons
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleDesktop = document.getElementById('darkModeToggleDesktop');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (darkModeToggleDesktop) {
    darkModeToggleDesktop.addEventListener('click', toggleDarkMode);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}

// Language colors mapping
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#239120",
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Angular: "#DD0031",
  "Node.js": "#339933",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#F18E33",
  Dart: "#00B4AB",
  Shell: "#89e051",
  PowerShell: "#012456",
  Dockerfile: "#384d54",
};

// Function to get language color
function getLanguageColor(language) {
  return languageColors[language] || "#6e7681";
}

// Function to format number (1000 -> 1k)
function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

// Function to create repository card with Tailwind CSS
function createRepoCard(repo) {
  const description = repo.description || "Không có mô tả";
  const language = repo.language || "Unknown";
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const isPublic = !repo.private;

  return `
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-gray-700 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <a href="${
                  repo.html_url
                }" target="_blank" class="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <i class="fas fa-book"></i>
                    <span class="font-semibold truncate">${repo.name}</span>
                </a>
                <span class="px-2 py-1 text-xs font-medium rounded-full ${
                  isPublic
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                }">${isPublic ? "Public" : "Private"}</span>
            </div>
            
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${description}</p>
            
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-500"></i>
                        <span>${formatNumber(stars)}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-code-branch text-blue-500"></i>
                        <span>${formatNumber(forks)}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${getLanguageColor(
                      language
                    )}"></div>
                    <span class="text-gray-600">${language}</span>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <a href="${
                  repo.html_url
                }" target="_blank" class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-md hover:shadow-lg">
                    <i class="fas fa-eye"></i>
                    <span>Xem</span>
                </a>
                ${
                  repo.homepage
                    ? `<a href="${repo.homepage}" target="_blank" class="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-1">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Demo</span>
                </a>`
                    : ""
                }
            </div>
        </div>
    `;
}

// Function to load GitHub repositories
async function loadGitHubRepos() {
  try {
    const response = await fetch(
      "https://api.github.com/users/DalatCoder/repos?sort=updated&per_page=6"
    );
    const repos = await response.json();

    if (response.ok) {
      const reposGrid = document.getElementById("reposGrid");
      const loadingDiv = document.getElementById("reposLoading");

      // Filter out forked repositories and get the most relevant ones
      const filteredRepos = repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => {
          // Sort by stars first, then by updated date
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 6);

      // Generate HTML for repositories
      reposGrid.innerHTML = filteredRepos
        .map((repo) => createRepoCard(repo))
        .join("");

      // Hide loading and show repos
      loadingDiv.style.display = "none";
      reposGrid.classList.remove("hidden");
    } else {
      throw new Error("Failed to fetch repositories");
    }
  } catch (error) {
    console.error("Error loading GitHub repositories:", error);
    const loadingDiv = document.getElementById("reposLoading");
    loadingDiv.innerHTML = `
            <div class="flex items-center justify-center space-x-3">
                <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                <p class="text-blue-700">Không thể tải repository từ GitHub. Vui lòng thử lại sau.</p>
            </div>
        `;
  }
}

// Load repositories when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Delay loading slightly to improve page load performance
  setTimeout(loadGitHubRepos, 1000);
});

// QR Code Action Functions
function downloadQR() {
  const link = document.createElement("a");
  link.href = "assets/QR.jpg";
  link.download = "Zalo-QR-NguyenTrongHieu.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show success feedback
  showNotification("📥 Đã tải xuống mã QR thành công!", "success");
}

function shareQR() {
  if (navigator.share) {
    navigator
      .share({
        title: "Kết nối với Nguyễn Trọng Hiếu qua Zalo",
        text: "Quét mã QR này để chat với tôi trên Zalo",
        url: window.location.href,
      })
      .then(() => {
        showNotification("📤 Đã chia sẻ thành công!", "success");
      })
      .catch((error) => {
        console.log("Error sharing:", error);
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
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showNotification("🔗 Đã sao chép link website!", "success");
      })
      .catch(() => {
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
    const successful = document.execCommand("copy");
    if (successful) {
      showNotification("🔗 Đã sao chép link website!", "success");
    } else {
      showNotification(
        "❌ Không thể sao chép. Vui lòng sao chép thủ công.",
        "error"
      );
    }
  } catch (err) {
    showNotification(
      "❌ Không thể sao chép. Vui lòng sao chép thủ công.",
      "error"
    );
  }

  document.body.removeChild(textArea);
}

function showNotification(message, type = "info") {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification fixed top-4 right-4 max-w-sm bg-white rounded-xl p-4 shadow-lg border border-blue-200 z-50 transition-all duration-300 transform translate-x-full`;

  const borderColor =
    type === "success"
      ? "border-l-4 border-green-500"
      : type === "error"
      ? "border-l-4 border-red-500"
      : "border-l-4 border-blue-500";

  notification.className += ` ${borderColor}`;

  notification.innerHTML = `
        <div class="flex items-center justify-between space-x-3">
            <span class="text-gray-900 font-medium text-sm flex-1">${message}</span>
            <button class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-blue-50" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times text-sm"></i>
            </button>
        </div>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 10);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, 4000);
}

// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize dark mode first
  initDarkMode();
  
  // Get navigation elements
  const nav = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTopBtn = document.getElementById("backToTop");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    const spans = navToggle.querySelectorAll("span");
    mobileMenu.classList.toggle("hidden");

    // Animate hamburger menu
    if (mobileMenu.classList.contains("hidden")) {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    } else {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    }
  });

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });

  // Smooth scrolling for all navigation links
  [...navLinks, ...mobileLinks].forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to top button functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Handle scroll events
  let ticking = false;

  function updateNavigation() {
    const scrollY = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / documentHeight) * 100;

    // Update scroll progress indicator
    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    // Show/hide back to top button
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.remove("opacity-0", "invisible");
        backToTopBtn.classList.add("opacity-100", "visible");
      } else {
        backToTopBtn.classList.add("opacity-0", "invisible");
        backToTopBtn.classList.remove("opacity-100", "visible");
      }
    }

    // Add scrolled class to navigation
    if (scrollY > 50) {
      nav.classList.add("bg-white/98");
      nav.classList.remove("bg-white/95");
    } else {
      nav.classList.remove("bg-white/98");
      nav.classList.add("bg-white/95");
    }

    // Update active navigation link
    const sections = document.querySelectorAll("section[id]");
    let currentActive = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActive = sectionId;
      }
    });

    // Update active link
    navLinks.forEach((link) => {
      const underline = link.querySelector("span");
      if (link.getAttribute("href") === `#${currentActive}`) {
        if (underline) underline.style.width = "100%";
      } else {
        if (underline) underline.style.width = "0%";
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavigation);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Initial call to set correct active state
  updateNavigation();
});

// Initialize Simple Animations with modern approach
document.addEventListener("DOMContentLoaded", function () {
  // Simple fade-in animation for main elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  document.querySelectorAll("section").forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.4s ease-out";
    section.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(section);
  });

  // Add animation classes dynamically
  const style = document.createElement("style");
  style.textContent = `
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
