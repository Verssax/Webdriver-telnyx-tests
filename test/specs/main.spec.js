import mainPage from "../pages/main.page"; 
import socials from "../testData/socialLinks.json"

describe('Main page tests',() => {
    beforeEach( async () => {
        await mainPage.openPage()        
    });  
    
    it(`Products dropdown menu opens and at least 1 option is visible`, async () => {               
        await expect(mainPage.navBar.menuElements).toBeElementsArrayOfSize(6);
        await mainPage.clickProductsBtn()
        await expect(mainPage.navBar.menuDropdownOpened).toBeDisplayedInViewport();
    });

    it('Changing value', async () => {
        await mainPage.clickComposeYourStackBtn();
        await expect(browser).toHaveUrl('#price-your-workload', { containing: true }); 
        let priceText = await mainPage.perMonthValue.getText();
        await mainPage.setComposeCalculatorValues();
        await expect(priceText).not.toEqual(await mainPage.perMonthValue.getText())
    });

    it('products Select 1 prod', async () =>{
        await expect(mainPage.primitivesStandartLink[1]).toBeDisplayed();

        await mainPage.chooseWebRTCProduct();
        await expect(mainPage.webRTCProductBtn).toHaveAttribute('aria-pressed', 'true');
        await expect(mainPage.webRTCLink[1]).toBeDisplayed();
    });

    it('SELECT USE CASE products', async () =>{
        await expect(mainPage.primitivesStandartLink[1]).toBeDisplayed();

        await mainPage.chooseWebRTCProduct();
        await expect(mainPage.webRTCProductBtn).toHaveAttribute('aria-pressed', 'true');
        await expect(mainPage.webRTCLink[1]).toBeDisplayed();
    });





    it('Footer social icons are visible and link to correct URLs', async () => {

        await expect(mainPage.footer.facebookIcon).toBeDisplayed();
        await expect(mainPage.footer.facebookIcon).toHaveAttribute('href', socials.facebook);

        await expect(mainPage.footer.twitterIcon).toBeDisplayed();
        await expect(mainPage.footer.twitterIcon).toHaveAttribute('href', socials.twitter);

        await expect(mainPage.footer.linkedInIcon).toBeDisplayed();
        await expect(mainPage.footer.linkedInIcon).toHaveAttribute('href', socials.linkedIn);
    });

})