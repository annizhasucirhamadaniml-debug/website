// === SCRIPT UNTUK FORM PEMESANAN (VERSI MULTI MENU) ===

// Ambil elemen form
const form = document.getElementById("orderForm");
const orderResult = document.getElementById("orderResult");

// Ambil tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Event listener saat form dikirim
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil semua data dari form
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const qty = document.getElementById("qty").value;
  const note = document.getElementById("note").value.trim();

  // Ambil semua checkbox menu yang dicentang
  const selectedMenus = Array.from(document.querySelectorAll('input[name="menu"]:checked'))
    .map(menu => menu.value);

  // Validasi
  if (!name || !phone || selectedMenus.length === 0 || qty <= 0) {
    alert("Harap isi semua data dan pilih minimal 1 menu ya ☕");
    return;
  }

  // Format menu jadi teks
  const menuList = selectedMenus.map(m => `• ${m}`).join("%0A");

  // Format pesan WhatsApp
  const pesan = `Halo Arizha Coffee! ☕%0A%0ASaya ingin memesan:%0A` +
    `Nama: ${name}%0A` +
    `Nomor HP: ${phone}%0A` +
    `Menu:%0A${menuList}%0A` +
    `Jumlah: ${qty}%0A` +
    `Catatan: ${note ? note : '-'}%0A%0A` +
    `Terima kasih!`;

  // Nomor WhatsApp tujuan
  const nomorWA = "6282348169583";

  // Buka link WhatsApp
  const url = `https://wa.me/${nomorWA}?text=${pesan}`;
  window.open(url, "_blank");

  // Tampilkan hasil di halaman (opsional)
  orderResult.classList.remove("hidden");
  orderResult.innerHTML = `
    <p>Pesanan kamu siap dikirim ke <strong>WhatsApp Arizha Coffee</strong> ☕🌿</p>
    <p>Kalau belum otomatis terbuka, <a href="${url}" target="_blank">klik di sini</a>.</p>
  `;

  // Reset form
  form.reset();
});

// === ANIMASI SCROLL & NAV ===

// Navbar berubah saat di-scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("header");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Tombol scroll to top
const toTop = document.createElement("button");
toTop.textContent = "↑";
toTop.className = "to-top";
document.body.appendChild(toTop);

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// Animasi elemen muncul saat di-scroll
const hiddenEls = document.querySelectorAll(".hidden");
window.addEventListener("scroll", () => {
  hiddenEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
