import BasePage from "./base.page";

class IntegrationsPage extends BasePage{
    constructor() {
        super()               
        this.url = '/integrations'   
    }   

    get asanaBtn () {
        return $('a[href="/integrations/asana"]');
    }
    get accountingFinanceFilter () {
        return $('#7');
    }
    get searchField () {
        return $('[placeholder="Search integrations"]');
    }
    get quickBooksBtn () {
        return $('a[href="/integrations/quickbooks-online"]');
    }
    get backToIntegrationsBtn () {
        return $('a[href="/integrations"]');
    }

    clickAsanaBtn() {
        this.asanaBtn.click();
    }
    
    chooseAccountingFilter() {
        this.accountingFinanceFilter.click()
    }

    typeInSerchField(text) {
        this.searchField.setValue(text)
    }
}

export default new IntegrationsPage;