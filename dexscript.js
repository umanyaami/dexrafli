async function fetchTokenData() {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens');
    const data = await response.json();

    const tokenList = document.getElementById('tokenList');
    tokenList.innerHTML = '';

    // Ambil 10 token teratas saja biar ringan
    const tokens = data.pairs.slice(0, 10);

    tokens.forEach(token => {
      const card = document.createElement('div');
      card.className = 'token-card';
      card.innerHTML = `
        <h2>${token.baseToken.name} (${token.baseToken.symbol})</h2>
        <p>Price: $${parseFloat(token.priceUsd).toFixed(4)}</p>
        <p>DEX: ${token.dexId}</p>
      `;
      tokenList.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching token data:', error);
    document.getElementById('tokenList').innerText = 'Gagal mengambil data';
  }
}

// Jalankan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', fetchTokenData);
