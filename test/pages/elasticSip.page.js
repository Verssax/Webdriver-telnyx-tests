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
        const formEl = await this.form;
        await browser.execute((el) => {
            el.scrollIntoView({ block: 'center', inline: 'center' });
        }, formEl);
        await this.emailField.waitForDisplayed();
    }

    async submitBtnClick () {
        await this.submitBtn.click();
    }

    async fillsUserData (userData) {
        await this.firstNameField.setValue(userData.firstName);
        await this.lastNameField.setValue(userData.lastName);
        await this.emailField.setValue(userData.email);
    }

}

export default new ElasticSip;