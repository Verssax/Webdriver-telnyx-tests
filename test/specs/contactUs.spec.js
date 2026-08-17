import generateUser from "../utils/userGenerator";
import contuctUsPage from "../pages/contuctUs.page";


describe('Contuct us page tests', () => {
        beforeEach( async () =>{
            await contuctUsPage.openPage()            
        });    
    
    it('Submit empty form shows validation error', async ()=>{        
        await contuctUsPage.clickSubmitBtn()
        await expect(browser).toHaveUrl('contact-us', { containing: true }); 
        await expect(contuctUsPage.errSelectMsg).toBeDisplayedInViewport();
    })

    it('Submit form with valid data submited without an error', async () => {
        const userData = await generateUser();
        await contuctUsPage.fillUserData(userData);
        await expect(contuctUsPage.firstName).toHaveValue(userData.firstName);
        await expect(contuctUsPage.lastName).toHaveValue(userData.lastName);
        await expect(contuctUsPage.email).toHaveValue(userData.email);
        await expect(contuctUsPage.phone).toHaveValue(userData.phone);
        await expect(contuctUsPage.additionalInfo).toHaveValue(userData.text);
    });
})