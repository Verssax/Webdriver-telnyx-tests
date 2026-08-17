import BasePage from "./base.page";

class ElasticSip extends BasePage{
    constructor() {
        super()               
        this.url = '/pricing/elastic-sip'   
    }   

    get form() {
        return $('[data-content="Talk to an expert"]')
    }
    get firstNameField () {
        return $('[id="FirstName"]');
    }
    
    get lastNameField () {
        return $('[id="LastName"]');
    }
    
    get emailField () {
        return $('[id="Email"]');
    }
    
    get firstNameErr () {
        return $('#ValidMsgFirstName');
    }

    get submitBtn() {
        return $('button=Submit');
    }

    async scrollToForm() {
        await this.form.waitForExist();
        await this.form.scrollIntoView({ block: 'center', inline: 'center' });
        await this.emailField.waitForDisplayed();
    }

    async submitBtnClick () {
        await this.submitBtn.click();
    }

}

export default new ElasticSip;