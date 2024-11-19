(function() {
  // Funzione per portare un elemento al centro dello schermo
  function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // 1. Cercare e cliccare "VEDI SU BACK OFFICE"
  let foundBackoffice = false;
  const elements = document.querySelectorAll('a, button, span, div');
  elements.forEach(el => {
    if (el.textContent.includes('VEDI SU BACK OFFICE')) {
      scrollToElement(el);
      el.click();
      foundBackoffice = true;
    }
  });

  // 2. Se non trovato, cercare e usare un'email
  if (!foundBackoffice) {
    const bodyText = document.body.innerText;
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const emails = bodyText.match(emailRegex);
    if (emails && emails.length > 0) {
      const email = emails[0];
      const url = `https://app.fiscozen.it/backoffice/utenti?searchString=${encodeURIComponent(email)}`;
      window.open(url, '_blank');
    } else {
      // 3. Se nessuna email trovata, evidenziare "CLIENTE" o "BASE"
      let foundClienteBase = false;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeValue.includes('CLIENTE') || node.nodeValue.includes('BASE')) {
          const span = document.createElement('span');
          span.style.backgroundColor = 'yellow';
          span.style.color = 'black'; // Assicurarsi che il testo sia visibile
          span.textContent = node.nodeValue;
          node.parentNode.replaceChild(span, node);
          scrollToElement(span);
          foundClienteBase = true;
          break;
        }
      }
    }
  }
})();
