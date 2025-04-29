window.addEventListener('scroll', () => {
    document.querySelector('.arrow').style.opacity = 
      window.scrollY > 0 ? 0 : 1;
  });