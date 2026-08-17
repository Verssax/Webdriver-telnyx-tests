import BasePage from "./base.page";
import communicatinFilter from "../testData/communicationsFilter.json"

class GCommunicationsPage extends BasePage{
    constructor() {
        super();
        this.url = '/global-communications';
    }   

    async getCountryBtn (countryName) {
        return $(`button*=${countryName}`);
    }

    get searchFiled () {
        return $('[type="search"]')
    }

    get networkFilter () {
        return $('[aria-label="Network"]')
    }

    get voiceFilter () {
        return $('[aria-label="Voice coverage"]')
    }
    
    get smsFilter () { 
        return $('[aria-label="SMS coverage"]')
    }

    get numberTypeFilter () { 
        return $('[aria-label="Number type"]')
    }
    
    get numberOfCountries () {  
        return $('p*=countries and territories with inbound calling')
    }

    
    get filteredBySIP (){
        return $$('span*=sip.telnyx.')
    }

    get americasTabFilterBtn() {
        return $('button=Americas')
    }

    async getNumberOfFilteredCountries() {
        const text = await this.numberOfCountries.getText();
        return Number(text.match(/\d+/)[0])
    }

    async chooseSIPSignaling () {
        await this.networkFilter.selectByAttribute('value', communicatinFilter.SIP.value);
    }

    async chooseVoiceFilter () {
        await this.voiceFilter.selectByAttribute('value', communicatinFilter.Porting.value);
    }

    async chooseSmsFilter () {
        await this.smsFilter.selectByAttribute('value', communicatinFilter.twoWaySMS.value);
    }

    async chooseNumberTypeFilter () {
        await this.numberTypeFilter.selectByAttribute('value', communicatinFilter.Mobile.value);
    }

    async chooseTabMenuFilter() {
        await this.americasTabFilterBtn.scrollIntoView();
        await this.americasTabFilterBtn.click();
    }



}

export default new GCommunicationsPage;