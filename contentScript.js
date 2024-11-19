(function() {
  // Funzione per portare un elemento al centro dello schermo
  function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // 1. Evidenziare "CLIENTE" o "BASE"
  let foundClienteBase = false;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeValue.includes('CLIENTE') || node.nodeValue.includes('BASE')) {
      const span = document.createElement('span');
      span.style.backgroundColor = 'yellow';
      span.textContent = node.nodeValue;
      node.parentNode.replaceChild(span, node);
      scrollToElement(span);
      foundClienteBase = true;
      break;
    }
  }

  // 2. Cercare e cliccare "VEDI SU BACKOFFICE"
  const elements = document.querySelectorAll('a, button, span, div');
  let foundBackoffice = false;
  elements.forEach(el => {
    if (el.textContent.includes('VEDI SU BACKOFFICE')) {
      scrollToElement(el);
      el.click();
      foundBackoffice = true;
    }
  });

  // 3. Cercare e usare un'email
  if (!foundBackoffice) {
    const bodyText = document.body.innerText;
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const emails = bodyText.match(emailRegex);
    if (emails && emails.length > 0) {
      const email = emails[0];
      const url = `https://app.fiscozen.it/backoffice/utenti?searchString=${encodeURIComponent(email)}`;
      window.open(url, '_blank');
    }
  }
})();
