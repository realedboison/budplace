function handleScroll() {
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
  }
  
window.addEventListener("scroll", handleScroll);
  