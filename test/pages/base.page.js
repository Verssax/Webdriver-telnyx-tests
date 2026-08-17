import Footer from "./components/footer";
import NavBar from "./components/navBar";

class BasePage{
    constructor() {
        this.url = '/';
        this.navBar = NavBar;
        this.footer=  Footer;
    };    
    

    async openPage () {
      await browser.url(this.url);
    };
}

export default BasePage;