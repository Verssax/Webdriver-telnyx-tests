import elasticSipPage from "../pages/elasticSip.page";
import generateUser from "../utils/userGenerator";

describe('Elastic SIP page test: ', () => {
    beforeEach( async () =>{
        await elasticSipPage.openPage();
        if (await elasticSipPage.oneTrustBanner.isExisting()) {
            await elasticSipPage.hideTrustBanner();
        }          
    });    
    
    it('Submiting empty Download pricing form shows an error', async ()=> {      
        await elasticSipPage.scrollToForm();
        await expect(elasticSipPage.emailField).toBeDisplayed();
        await expect(elasticSipPage.firstNameField).toBeDisplayed();
        await expect(elasticSipPage.lastNameField).toBeDisplayed();
        await elasticSipPage.submitBtnClick();
        await expect(elasticSipPage.firstNameErr).toBeDisplayed();
    });

    it('Submiting valid data in form, successfully send form', async ()=> {      
        await elasticSipPage.scrollToForm();
        await expect(elasticSipPage.emailField).toBeDisplayed();
        await expect(elasticSipPage.firstNameField).toBeDisplayed();
        await expect(elasticSipPage.lastNameField).toBeDisplayed();

        const userdata = await generateUser()
        await elasticSipPage.fillsUserData(userdata);
        // should submit form and validate submiting, but since it's a test project i don't submit anything

    });
})