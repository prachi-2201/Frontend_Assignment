function updateClocks() {
    const newYorkTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    document.getElementById('new-york').textContent = `New York: ${newYorkTime}`;
  
    const londonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
    document.getElementById('london').textContent = `London: ${londonTime}`;
  
    const tokyoTime = new Date().toLocaleString('en-JP', { timeZone: 'Asia/Tokyo' });
    document.getElementById('tokyo').textContent = `Tokyo: ${tokyoTime}`;
  }
  
  updateClocks();
  setInterval(updateClocks, 1000);
  