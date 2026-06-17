// 패키지 선택

const buttons = document.querySelectorAll('.paket-filter button');
const cards = document.querySelectorAll('.paket-card');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        cards.forEach(card => {
            if (filter === 'semua' || card.getAttribute('data-kategori') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 결제 페이지 - 패키지 선택

const orderCards = document.querySelectorAll('.order-card');

orderCards.forEach(card => {
    card.addEventListener('click', () => {
        const paket = card.getAttribute('data-paket');
        const nama = card.querySelector('h2').textContent;
        const harga = card.querySelector('p').textContent;
        orderCards.forEach(c => c.classList.remove('selected'));
        // 클릭한 카드에 selected 추가
        card.classList.add('selected');

        localStorage.setItem('selected-paket', paket);
        localStorage.setItem('selected-nama', nama);
        localStorage.setItem('selected-harga', harga);
    });
});

const nama = localStorage.getItem('selected-nama');
const harga = localStorage.getItem('selected-harga');

if (nama) document.getElementById('nama-paket').textContent = nama;
if (harga) document.getElementById('harga-paket').textContent = harga;

const transferPrice = document.getElementById('transfer-price')
if (transferPrice && harga){
    const onlyharga = harga.match(/[\d,]+원/);
    transferPrice.textContent = onlyharga ? onlyharga[0] : harga;
}
// 결제 방법 토글
const methodBtns = document.querySelectorAll('.method-btn');
const transferInfo = document.querySelector('.transfer-info');
const cardInfo = document.querySelector('.card-info');

methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        methodBtns.forEach(b => b.classList.remove('active-method'));
        btn.classList.add('active-method');

        if (btn.textContent === '신용카드') {
            transferInfo.style.display = 'none';
            cardInfo.style.display = 'block';   
        } else {
            transferInfo.style.display = 'block';
            cardInfo.style.display = 'none';
        }
    });
});

// 결제 팝업 창

const payBtn = document.querySelector('.pay-btn')
const popupOverlay = document.getElementById('popup-overlay');
const popupClose = document.getElementById('popup-close');

payBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('popup-paket').textContent = localStorage.getItem('selected-nama') || '이슬라믹 투어';
    document.getElementById('popup-harga').textContent = localStorage.getItem('selected-harga') || '320,000원';
    document.getElementById('popup-method').textContent = document.querySelector('.method-btn.active-method').textContent;
    popupOverlay.classList.add('active');
});

popupClose.addEventListener('click', () => {
    window.location.href = 'itinerary.html';
});