async function fetchNewTokens() {
    const url = "https://api.dexscreener.com/latest/dex/pairs";

    try {
        const response = await fetch(url);
        const data = await response.json();

        const list = document.getElementById('tokenList');
        list.innerHTML = '';

        if (data && data.pairs && data.pairs.length > 0) {
            data.pairs.slice(0, 10).forEach(token => {
                const div = document.createElement('div');
                div.className = 'token-item';
                div.innerHTML = `
                    <strong>${token.baseToken.name}</strong> (${token.baseToken.symbol})<br>
                    Pair: ${token.baseToken.address} / ${token.quoteToken.symbol}<br>
                    DEX: ${token.dexId}
                `;
                list.appendChild(div);
            });
        } else {
            list.innerHTML = "Tidak ada token baru ditemukan.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('tokenList').innerHTML = "Gagal mengambil data.";
    }
}

// Load pertama
fetchNewTokens();

// Update tiap 30 detik
setInterval(fetchNewTokens, 30000);
