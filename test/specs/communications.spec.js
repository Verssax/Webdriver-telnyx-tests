import gCommunicationsPage from "../pages/globalCommunications.page";
import communicationFilter from "../testData/communicationsFilter.json"


describe('Communication page tests', () => {
        beforeEach( async () =>{
            await gCommunicationsPage.openPage()            
        });    
    
    it('SIP filter works', async ()=>{        
        await gCommunicationsPage.chooseSIPSignaling();

        const filtered = await gCommunicationsPage.filteredBySIP
        await expect(filtered.length).toBe(communicationFilter.SIP.CountrisAfterFilter)
        let contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.SIP.HiddenContries)
        await expect(contryLocator).not.toBeDisplayed();
    })

    it('SMS Filter works', async () => {
        await gCommunicationsPage.chooseSmsFilter();

        const filtered = await gCommunicationsPage.getNumberOfFilteredCountries();
        await expect(filtered).toBe(communicationFilter.twoWaySMS.CountrisAfterFilter);

        let contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.twoWaySMS.HiddenContries)
        await expect(contryLocator).not.toBeDisplayed();

        contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.twoWaySMS.VisibleCountries)
        await expect(contryLocator).toBeDisplayed();


    });
    
    it('Voice Filter works', async () => {
        await gCommunicationsPage.chooseVoiceFilter();

        const filtered = await gCommunicationsPage.getNumberOfFilteredCountries();
        await expect(filtered).toBe(communicationFilter.Porting.CountrisAfterFilter);

        let contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Porting.HiddenContries)
        await expect(contryLocator).not.toBeDisplayed();

        contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Porting.VisibleCountries)
        await expect(contryLocator).toBeDisplayed();

    });

    it('Number type Filter', async () => {
        await gCommunicationsPage.chooseNumberTypeFilter();

        const filtered = await gCommunicationsPage.getNumberOfFilteredCountries();
        await expect(filtered).toBe(communicationFilter.Mobile.CountrisAfterFilter);

        let contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Mobile.HiddenContries)
        await expect(contryLocator).not.toBeDisplayed();

        contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Mobile.VisibleCountries)
        await expect(contryLocator).toBeDisplayed();

    });

    it('Tab menu filter', async () => {
        await gCommunicationsPage.chooseTabMenuFilter();
        await expect(gCommunicationsPage.americasTabFilterBtn).toHaveAttribute('aria-selected', 'true');

        const filtered = await gCommunicationsPage.getNumberOfFilteredCountries();
        await expect(filtered).toBe(communicationFilter.Americas.CountrisAfterFilter);

        let contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Americas.HiddenContries)
        await expect(contryLocator).not.toBeDisplayed();

        contryLocator = await gCommunicationsPage.getCountryBtn(communicationFilter.Americas.VisibleCountries)
        await expect(contryLocator).toBeDisplayed();

    });

    

})