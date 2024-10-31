$(document).ready(function(){
    $(".hamburger").click(function(){
        $(".top-menu").css("right", "0");
    });

    $(".close").click(function(){
        $(".top-menu").css("right", "-100vw");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let modalBox = document.getElementById("modal-box");

    function showModal() {
        modalBox.style.display = "block";
    }

    function closeModal() {
        modalBox.style.display = "none";
    }

    document.querySelector(".user img").onclick = showModal;
    document.querySelector(".close-modal-btn").onclick = closeModal;
});

// Fungsi untuk mengambil daftar favorit dari localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Fungsi untuk menyimpan daftar favorit ke localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Fungsi untuk menambah item ke daftar favorit dengan nama dan gambar lokal
function addToFavorites(name, imageUrl) {
    let favorites = getFavorites();
    const item = { name, imageUrl };
    
    // Cek apakah item sudah ada di favorit
    if (!favorites.some(fav => fav.name === name)) {
        favorites.push(item);
        saveFavorites(favorites);
        showNotification(`${name} has been added to Like!`); // Tampilkan notifikasi
    } else {
        alert(`${name} is already in your favorites!`);
    }
}

// Fungsi untuk menampilkan notifikasi sementara
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show'); // Tampilkan notifikasi

    // Sembunyikan notifikasi setelah 2 detik
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Fungsi untuk menghapus item dari daftar favorit
function removeFromFavorites(name) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.name !== name);
    saveFavorites(favorites);
    showNotification(`${name} has been removed from favorites!`); // Tampilkan notifikasi
    displayFavorites(); // Perbarui tampilan daftar
}

// Fungsi untuk menampilkan daftar favorit di halaman favorites.html
function displayFavorites() {
    const favoriteList = document.getElementById('favorite-list');
    if (!favoriteList) return; // Keluar jika bukan di halaman favorites.html

    favoriteList.innerHTML = '';
    let favorites = getFavorites();
    favorites.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('favorite-item');

        // Tambahkan gambar dan nama
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        
        const nameText = document.createElement('span');
        nameText.textContent = item.name;

        // Tambahkan tombol hapus
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => removeFromFavorites(item.name);

        li.appendChild(img);
        li.appendChild(nameText);
        li.appendChild(removeBtn);
        favoriteList.appendChild(li);
    });
}

// Memuat daftar favorit saat halaman favorites.html dimuat
window.onload = displayFavorites;
