const searchInput = document.querySelector('#search-input');
const categorySelect = document.querySelector('#category-select');
const searchButton = document.querySelector('#search-button');
const clearButton = document.querySelector('#clear-search');
const cards = [...document.querySelectorAll('.item-card')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function filterItems() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  let visible = 0;

  cards.forEach((card) => {
    const matchesTerm = !term || card.dataset.name.includes(term);
    const matchesCategory = category === 'todos' || card.dataset.category === category;
    const isVisible = matchesTerm && matchesCategory;
    card.hidden = !isVisible;
    if (isVisible) visible += 1;
  });

  resultCount.textContent = `${visible} ${visible === 1 ? 'item encontrado' : 'itens encontrados'}`;
  emptyState.hidden = visible !== 0;
}

searchButton.addEventListener('click', filterItems);
searchInput.addEventListener('input', filterItems);
categorySelect.addEventListener('change', filterItems);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'todos';
  filterItems();
});

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
