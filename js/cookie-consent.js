(function() {
    var CONSENT_KEY = 'obaid_cookie_consent';
    var choice = localStorage.getItem(CONSENT_KEY);
    if (choice) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML =
        '<div class="cookie-content">' +
            '<div class="cookie-text">' +
                '<strong style="color:#ff2a2a;">Cookie Consent</strong>' +
                '<p>We use cookies to improve your experience, analyze traffic, and serve personalized ads (AdSense). By clicking "Accept All", you consent to all cookies. <a href="privacy-policy.html" style="color:#ff2a2a;text-decoration:underline;">Learn more</a></p>' +
            '</div>' +
            '<div class="cookie-buttons">' +
                '<button id="cookie-reject" class="cookie-btn cookie-btn-reject">Reject All</button>' +
                '<button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accept All</button>' +
            '</div>' +
        '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function() {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        banner.classList.add('cookie-hidden');
        setTimeout(function() { banner.remove(); }, 400);
    });

    document.getElementById('cookie-reject').addEventListener('click', function() {
        localStorage.setItem(CONSENT_KEY, 'rejected');
        banner.classList.add('cookie-hidden');
        setTimeout(function() { banner.remove(); }, 400);
    });

    setTimeout(function() { banner.classList.add('cookie-show'); }, 300);
})();