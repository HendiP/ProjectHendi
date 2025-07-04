function smoothScrollTo(targetId, message = null) {
    const targetElement = document.querySelector(targetId);
    const regMessage = document.getElementById('regMessage');

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        if (message && regMessage) {
            regMessage.textContent = message;
            regMessage.style.display = 'block';
            setTimeout(() => {
                regMessage.style.display = 'none';
            }, 5000);
        }
    }
}

document.getElementById('scrollToRegisterHero').addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollTo(this.getAttribute('href'));
});

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.dataset.productName;
        const targetId = this.getAttribute('href');
        smoothScrollTo(targetId, `Anda perlu mendaftar untuk membeli ${productName}. Silakan isi formulir di bawah ini!`);
    });
});

document.getElementById('loanCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const price = parseFloat(document.getElementById('price').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    const loanResultDiv = document.getElementById('loanResult');

    if (isNaN(price) || isNaN(interestRate) || isNaN(loanTerm) || price <= 0 || interestRate < 0 || loanTerm <= 0) {
        loanResultDiv.innerHTML = '<p style="color: red;">Mohon masukkan nilai yang valid untuk semua kolom yang wajib diisi.</p>';
        return;
    }

    const principal = price - downPayment;
    let monthlyPayment;

    if (interestRate === 0) {
        monthlyPayment = principal / loanTerm;
    } else {
        monthlyPayment = principal * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    }

    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - principal;

    const resultHTML = `
        <p><strong>Jumlah Pinjaman Pokok:</strong> Rp ${principal.toLocaleString('id-ID')}</p>
        <p><strong>Cicilan Bulanan:</strong> Rp ${monthlyPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Total Pembayaran:</strong> Rp ${totalPayment.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p><strong>Total Bunga:</strong> Rp ${totalInterest.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    `;
    loanResultDiv.innerHTML = resultHTML;
});
