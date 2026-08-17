import integrationsPage from '../pages/integrations.page'

describe('Integrations page tests', () => {
    beforeEach( async () =>{
        await integrationsPage.openPage();   
        if (integrationsPage.oneTrustBanner) {
            await integrationsPage.hideTrustBanner();
        }           
    });    
    
    it('Clicking Asana opens Asana article', async () => {
        await integrationsPage.clickAsanaBtn();
        await integrationsPage.backToIntegrationsBtn.waitForExist();
        await expect(integrationsPage.backToIntegrationsBtn).toBeDisplayed();
        await expect(browser).toHaveUrl('asana', { containing: true });
    });

    it('Search Asana in a search field', async () => {
        await integrationsPage.typeInSerchField('asana');
        await expect(integrationsPage.quickBooksBtn).not.toExist();
        await expect(integrationsPage.asanaBtn).toBeDisplayed();
    });

    it('Select Accounting and Finance filter option', async () => {
        await integrationsPage.chooseAccountingFilter();
        await expect(integrationsPage.quickBooksBtn).toBeDisplayed();
        await expect(integrationsPage.asanaBtn).not.toBeDisplayedInViewport();
    });
});