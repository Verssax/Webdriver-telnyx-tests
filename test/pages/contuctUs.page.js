import BasePage from "./base.page";
import contuctForm from "../testData/contuctForm.json";
import { pickRandom } from "../utils/utils";

class contactUsPage extends BasePage{
    constructor() {
        super()               
        this.url = '/contact-us'   
    }

    get contactReasonSelect () {
        return $('#Reason_for_Contact__c');
    }

    get firstName () {
        return $('#FirstName');
    }

    get lastName () {
        return $('#LastName');
    }

    get email () {
        return $('#Email');
    }

    get phone () {
        return $('#Phone_Number_Base__c');
    }

    get phoneCountry () {
        return $('#Phone_Number_Extension__c');
    }

    get companySite () {
        return $('#Website');
    }

    get howDidYouField () {
        return $('#How_did_you_hear_about_Telnyx_Open__c');
    }

    get additionalInfo () {
        return $('#Form_Additional_Information__c');
    }

    get primaryProd () {
        return $('#Form_Product__c');
    }

    get estimatedSpend () {
        return $('#Form_Budget__c');
    }

    get errSelectMsg () {
        return $('#ValidMsgReason_for_Contact__c');
    }

    get submitBtn () {
        return $('button[type="submit"]');
    }


    async fillUserData(userData) {       
        await this.contactReasonSelect.selectByAttribute('value', contuctForm.reasons.salesInquiry);
        await this.primaryProd.selectByAttribute('value', pickRandom(contuctForm.products));
        await this.phoneCountry.selectByVisibleText(pickRandom(contuctForm.phoneCountries));
        await this.estimatedSpend.selectByAttribute('value',pickRandom(contuctForm.budgets));

        await this.firstName.setValue(userData.firstName);
        await this.lastName.setValue(userData.lastName);
        await this.email.setValue(userData.email);
        await this.phone.setValue(userData.phone);
        await this.companySite.setValue(`${userData.firstName}.com`);
        await this.howDidYouField.setValue(userData.text);
        await this.additionalInfo.setValue(userData.text);
    }

    async clickSubmitBtn() {
        await this.submitBtn.click()
    }

}

export default new contactUsPage;