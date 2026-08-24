/* Shared light/dark theme for the whole site.
   Load this in <head> WITHOUT defer/async so the saved theme is applied
   before first paint -- otherwise dark-mode readers get a white flash. */
(function () {
    var STORAGE_KEY = 'theme';
    var root = document.documentElement;

    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
    } catch (e) {}

    function current() {
        var set = root.getAttribute('data-theme');
        if (set === 'dark' || set === 'light') return set;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function build() {
        if (document.querySelector('.theme-toggle')) return;

        var btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.title = 'Toggle theme';
        btn.setAttribute('aria-label', 'Toggle light or dark theme');
        btn.innerHTML =
            '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" focusable="false">' +
            '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"></circle>' +
            '<path d="M12 3.9 A8.1 8.1 0 0 1 12 20.1 Z" fill="currentColor"></path>' +
            '</svg>';

        btn.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
        });

        document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
