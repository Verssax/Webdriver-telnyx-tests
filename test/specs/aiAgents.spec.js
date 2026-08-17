import voiceAIPage from "../pages/voiceAI.page";

describe('Ai block tests on VoiceAi page', () => {
    beforeEach( async () =>{
        await voiceAIPage.openPage()            
    });  

    it('Changing AI model updates pressed state for each available model', async () => {
        const modelsList = await voiceAIPage.getModelLocatorsList();
        await voiceAIPage.hideHeader();
        await modelsList[0].scrollIntoView()
        for (const model of modelsList) {
            await voiceAIPage.changeAiModel(model);
            await expect(model).toHaveAttribute('aria-pressed', 'true');
        };
    })

    it('successfully send a chat message to AI',async () => {
        await expect(voiceAIPage.aiModelDefault).toHaveAttribute('aria-pressed', 'true');
        await voiceAIPage.sendMessageToAi(false);
        await expect(voiceAIPage.aiResponse).toExist();  
    });

    it('Submit an empty AI chat message shows error massage', async () => {
        await expect(voiceAIPage.aiModelDefault).toHaveAttribute('aria-pressed', 'true');
        await voiceAIPage.sendMessageToAi(true);
        await expect(voiceAIPage.aiEmptyMsg).toBeDisplayed();  

    })

    it('Speech To Text option displays 3 model options', async () => {
        await voiceAIPage.clickSpeechToTextBtn();
        await expect(voiceAIPage.aiSpeechToTextBtn).toHaveAttribute('aria-selected', 'true');

        await expect(voiceAIPage.aiSTTFLux).toBeDisplayed();  
        await expect(voiceAIPage.aiSTTNova).toBeDisplayed();  
        await expect(voiceAIPage.aiSTTWhisper).toBeDisplayed();  
    });

});