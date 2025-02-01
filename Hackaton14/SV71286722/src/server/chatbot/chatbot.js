import dotenv from 'dotenv'
import { GoogleGenerativeAI } from "@google/generative-ai"
import db from '../models/index.js'

dotenv.config()

const settings = { 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a Spanish shop assistant in the industry of care products for pets. You only talk Spanish."
}

export class GoogleChatbot{

    constructor(){
        this.genAI = new GoogleGenerativeAI(process.env.BERT_API);
        this.model = this.genAI.getGenerativeModel(settings);
        this.history = [];
        this.setHistory()
    }

    addContext(role, message){
        const prompt = {
            role: role,
            parts: [{ text:message }]
        };
        this.history.push(prompt);
    }

    setHistory(){
        this.chat = this.model.startChat( {history: this.history} );
    }

    async sendMessage(message){
        const result = await this.chat.sendMessage(message);
        return result.response.text();
    }

    printHistory(){
        this.chat._history.forEach((message)=>{
            console.log(`Rol :  ${message.role}`)
            console.log(`Mensaje : ${message.parts[0].text}`)
            console.log("-------------------------------")
        })
    }

    async recoverFromDB(){
        const messages = await db.Messages.getMessages()
        messages.forEach((message)=>{
            this.addContext(message.role, message.message)
        })
        this.setHistory()
    }
}
