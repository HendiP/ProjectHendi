/**
 * Fungsi untuk melakukan smooth scroll ke elemen target dan menampilkan pesan.
 * @param {string} targetId - ID dari elemen tujuan scroll (misalnya '#registrationSection').
 * @param {string} [message=null] - Pesan opsional yang akan ditampilkan di `regMessage`.
 */
function smoothScrollTo(targetId, message = null) {
    const targetElement = document.querySelector(targetId);
    const regMessage = document.getElementById('regMessage');

    if (targetElement) {
        // Melakukan scroll dengan animasi halus
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Scroll ke bagian atas elemen
        });

        // Menampilkan pesan jika ada
        if (message && regMessage) {
            regMessage.textContent = message;
            regMessage.style.display = 'block'; // Tampilkan pesan
            // Sembunyikan pesan setelah 5 detik
            setTimeout(() => {
                regMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Event Listener untuk tombol "Lihat Koleksi & Dapatkan Promo!" di Hero Section
document.getElementById('scrollToRegisterHero').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default link (lompat langsung)
    smoothScrollTo(this.getAttribute('href'));
});

// Event Listener untuk semua tombol "Beli Sekarang" di Product Card
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Mencegah perilaku default link
        const productName = this.dataset.productName; // Mengambil nama produk dari data-attribute
        const targetId = this.getAttribute('href'); // Mengambil target scroll
        // Scroll ke bagian registrasi dan tampilkan pesan spesifik
        smoothScrollTo(targetId, `Anda perlu mendaftar untuk membeli ${productName}. Silakan isi formulir di bawah ini!`);
    });
});

// Event Listener untuk formulir Kalkulator Cicilan
document.getElementById('loanCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    // Mengambil nilai input dan mengkonversinya ke angka
    const price = parseFloat(document.getElementById('price').value);
    // downPayment bisa kosong, default ke 0
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    // Bunga dibagi 100 untuk persen, dan dibagi 12 untuk bunga bulanan
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value); // Jangka waktu dalam bulan

    const loanResultDiv = document.getElementById('loanResult');

    // Validasi input
    if (isNaN(price) || isNaN(interestRate) || isNaN(loanTerm) || price <= 0 || interestRate < 0 || loanTerm <= 0) {
        loanResultDiv.innerHTML = '<p style="color: red;">Mohon masukkan nilai yang valid untuk semua kolom yang wajib diisi.</p>';
        return; // Hentikan fungsi jika input tidak valid
    }

    const principal = price - downPayment; // Jumlah pinjaman pokok
    let monthlyPayment;

    // Perhitungan cicilan bulanan
    if (interestRate === 0) {
        // Jika bunga 0%, cicilan pokok dibagi rata
        monthlyPayment = principal / loanTerm;
    } else {
        // Rumus cicilan annuitas
        monthlyPayment = principal * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    }

    const totalPayment = monthlyPayment * loanTerm; // Total pembayaran keseluruhan
    const totalInterest = totalPayment - principal; // Total bunga yang dibayarkan

    // Menampilkan hasil kalkulasi ke elemen div 'loanResult'
    const resultHTML = `
        <p><strong>Jumlah Pinjaman Pokok:</strong> Rp ${principal.toLocaleString('id-ID')}</p>
        <p><strong>Cicilan Bulanan:</strong> Rp ${monthlyPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Total Pembayaran:</strong> Rp ${totalPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Total Bunga:</strong> Rp ${totalInterest.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    `;
    loanResultDiv.innerHTML = resultHTML;
});

// Catatan: Formulir registrasi saat ini tidak memiliki event listener untuk submit.
// Jika Anda ingin memproses pengiriman data (misalnya ke server),
// Anda perlu menambahkan event listener untuk form tersebut.