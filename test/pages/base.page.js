import Footer from "./components/footer";
import NavBar from "./components/navBar";

class BasePage{
    constructor() {
        this.url = '/';
        this.navBar = NavBar;
        this.footer=  Footer;
    };    
    
    get oneTrustBanner () {        
        return $('.onetrust-banner-sdk')
    }

    async hideTrustBanner () {
        await browser.execute(() => {
            const banner = document.querySelector('.onetrust-banner-sdk');
            if (banner) banner.style.display = 'none';
        });
    }

    async openPage () {
      await browser.url(this.url);
    };
}

export default BasePage;