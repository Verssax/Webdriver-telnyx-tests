import BasePage from "./base.page";

class VoiceAiPage extends BasePage{
    constructor() {
        super()               
        this.url = '/products/voice-ai-agents'   
    }   

    get aiModelDefault () {
        return $('button*=MiniMax M3 MXFP8');
    }
    get aiModelKimi () {
        return $('button*=Kimi K2.5');
    }
    get aiModelQwen () {
        return $('button*=Qwen3 235B A22B');
    }
    get aiModelGLM () {
        return $('button*=GLM 5.2');
    }

    get aiTextInput () {
        return $('[placeholder="Type message here"]');
    }
    get aiSendBtn () {
        return $('button[type="submit"]*=SEND MESSAGE');
    }
    get aiResponse () {
        return $('.bg-transparent');
    }
    get aiEmptyMsg () {
        return $('span*=Please enter a message');
    }

    get aiSpeechToTextBtn () {
        return $('button[role="tab"]*=Speech to Text');
    }
    get aiSTTFLux () {
        return $('button*=Deepgram Flux');
    }
    get aiSTTNova () {
        return $('button*=Deepgram Nova 3');
    }
    get aiSTTWhisper () {
        return $('button*=Whisper Large v3 Turbo');
    }
    
    async changeAiModel(AiModelLocator) {
        await AiModelLocator.click();
    }

    async sendMessageToAi(isEmpty) {
        if (isEmpty) {
            await this.aiSendBtn.click()
        } else {
            await this.aiTextInput.setValue('Hello')
            await this.aiSendBtn.click()
        }
    }
    
    getModelLocatorsList() {
        return [this.aiModelKimi,this.aiModelQwen,this.aiModelGLM];
    }

    async clickSpeechToTextBtn() {
        await this.aiSpeechToTextBtn.scrollIntoView();
        await this.aiSpeechToTextBtn.click();
    }

    async hideHeader() {
    await browser.execute(() => {
        const header = document.querySelector('#main-menu-content');
        if (header) header.style.display = 'none';
    });
    }
}

export default new VoiceAiPage;