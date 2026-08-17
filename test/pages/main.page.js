import BasePage from "./base.page";
import { randomInt } from "../utils/utils";

class MainPage extends BasePage{

    get composeYourStackBtn () {
        return $('[data-content="COMPOSE YOUR STACK"]');
    }

    get talkToAnExpertBtn () {
        return $('[data-content="TALK TO AN EXPERT"]');
    }

    get perMonthValue () {
        return $('//dt[text()="Telnyx per month"]/following-sibling::dd');
    }

    get primitivesStandartLink () {
        return $$('span*=curl api.telnyx.com/v2/ai/assistants'); 
    }
 
    get webRTCLink () {
        return $$('//span[text()="telnyx.com/products/webrtc"]')
    }

    get webRTCProductBtn () {
        return $('button*=WebRTC');
    }

    get connectedFleetBtn () {
        return $('button*=Agent backend, on net');   
    }

    get connectedFleetLink () {
        return $$('span*=curl api.telnyx.com/v2/edge/functions'); 
    }

    get composeConvAmountInputField () {
        return $("#workload-conversations");
    }
    get composeMinutesInputField () {
        return $("#workload-minutes");
    }
    get composeSmsInputField () {
        return $("#workload-smsFollowUps");
    }


    async setComposeCalculatorValues () {
        await this.composeConvAmountInputField.setValue(randomInt(80000, 800000));
        await this.composeMinutesInputField.setValue(randomInt(1, 15));
        await this.composeSmsInputField.setValue(randomInt(1, 5));
    }


    async clickComposeYourStackBtn() {
       await this.composeYourStackBtn.scrollIntoView();
       await this.composeYourStackBtn.click();
    };

    async clickTalkToExpert() {
      await this.talkToAnExpertBtn.click();
    };

    async clickProductsBtn() {
        await this.navBar.menuElements[0].click();
    }

    async openMobileBurgerMenu() {
        await this.navBar.mobileBurgerMenu().click();
    }

    async chooseWebRTCProduct() {
        await this.webRTCProductBtn.scrollIntoView();
        await this.webRTCProductBtn.click();
    }

    async chooseConnectedFleet () {
        await this.connectedFleetBtn.scrollIntoView();
        await this.connectedFleetBtn.click();
    }

    
}
export default new MainPage;