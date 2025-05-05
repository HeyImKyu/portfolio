function copy_text(buttonElement) {
    let next = buttonElement.parentElement?.nextElementSibling;
  
    while (next) {
      const code = next.querySelector?.('code');
      if (next.tagName === 'PRE' && code) {
        navigator.clipboard.writeText(code.innerText)
          .then(() => showCopyBubble(buttonElement, 'Text copied!'))
          .catch(err => alert('Failed to copy: ' + err));
        return;
      }
      next = next.nextElementSibling;
    }
  
    alert('No code block found after the button');
  }
  
  function showCopyBubble(referenceEl, message) {
    const bubble = document.createElement('div');
    bubble.className = 'copy-bubble';
    bubble.innerText = message;
  
    // Position above the button
    const rect = referenceEl.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
  
    document.body.appendChild(bubble);
  
    bubble.style.left = `${scrollX + rect.left + rect.width / 2 - bubble.offsetWidth / 2}px`;
    bubble.style.top = `${scrollY + rect.top - bubble.offsetHeight - 4}px`;
  
    // Fade out and remove
    setTimeout(() => {
      bubble.style.opacity = '0';
      setTimeout(() => bubble.remove(), 300);
    }, 1200);
  }
  