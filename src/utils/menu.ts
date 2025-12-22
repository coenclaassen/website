export function initMenu(): void {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopMenu = document.getElementById('desktop-menu');

  if (!menuToggle) return;

  const header = menuToggle.closest('header');
  const isMobile = (): boolean => window.innerWidth < 768;

  const updateIcon = (isActive: boolean): void => {
    menuToggle.textContent = isActive ? '✕' : '☰';
  };

  const closeMenus = (): void => {
    mobileMenu?.classList.remove('active');
    desktopMenu?.classList.remove('active');
    updateIcon(false);
    header?.classList.remove('menu-open');
  };

  const toggleMenu = (): void => {
    const targetMenu = isMobile() ? mobileMenu : desktopMenu;
    if (!targetMenu) return;

    const isActive = targetMenu.classList.toggle('active');
    updateIcon(isActive);
    if (isMobile()) {
      header?.classList.toggle('menu-open', isActive);
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  let wasMobile = isMobile();
  window.addEventListener('resize', () => {
    const isMobileNow = isMobile();
    if (isMobileNow !== wasMobile) {
      closeMenus();
      wasMobile = isMobileNow;
    }
  });
}

