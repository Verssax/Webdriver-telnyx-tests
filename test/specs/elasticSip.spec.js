import elasticSipPage from "../pages/elasticSip.page";


describe('Elastic SIP page test: ', () => {
    beforeEach( async () =>{
        await elasticSipPage.openPage()            
    });    
    
    it('Submiting empty Download pricing form shows an error', async ()=>{      
        await elasticSipPage.scrollToForm();
        await expect(elasticSipPage.emailField).toBeDisplayed();
        await expect(elasticSipPage.firstNameField).toBeDisplayed();
        await expect(elasticSipPage.lastNameField).toBeDisplayed();
        await elasticSipPage.submitBtnClick();
        await expect(elasticSipPage.firstNameErr).toBeDisplayed();
    });
})