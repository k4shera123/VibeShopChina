// Открытие/закрытие мобильного меню
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.site-nav').classList.toggle('open');
});

// Функции избранного
const favButtons = document.querySelectorAll('.favorite-toggle');
favButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    let favs = JSON.parse(localStorage.getItem('vibeFavs') || '[]');
    if (favs.includes(id)) {
      favs = favs.filter(x => x !== id);
      btn.textContent = '♡';
    } else {
      favs.push(id);
      btn.textContent = '❤';
    }
    localStorage.setItem('vibeFavs', JSON.stringify(favs));
    renderFavorites();
  });
});

// Рендер избранного на favorites.html
function renderFavorites() {
  if (!window.location.pathname.includes('favorites.html')) return;
  const list = document.getElementById('favorites-list');
  const emptyMsg = document.getElementById('empty-msg');
  list.innerHTML = '';
  const favs = JSON.parse(localStorage.getItem('vibeFavs') || '[]');
  if (favs.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';
  favs.forEach(id => {
    // для примера — жестко прописанные товары
    const product = {
      1: { title:'Футболка Brand X', price:'29 BYN' },
      2: { title:'Худи Brand Y', price:'49 BYN' }
    }[id];
    if (!product) return;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.price}</p>
      <a href="https://t.me/YourTelegram" class="btn">Купить</a>
    `;
    list.append(card);
  });
}

// При загрузке страницы favorites
window.addEventListener('DOMContentLoaded', renderFavorites);
