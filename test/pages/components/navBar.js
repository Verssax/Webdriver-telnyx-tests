class NavBar {

    get menuElements ()  {
        return $$('#main-menu-content > *');
    }

    get menuDropdownOpened ()  {
        return $('[role="menu"]');
    }

    get mobileBurgerMenu ()  {
        return $('[aria-controls="main-menu-content"]');
    }
    
  
}

export default new NavBar;