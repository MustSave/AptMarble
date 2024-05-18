import { Client, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.js";
import { ref, type Ref } from "vue";
import axios, { type AxiosInstance } from "axios";
import { type MatchingResultMessage, type StompMessage } from "@/types.d";

const serverUrl = 'http://localhost:8080/ws';

export class GameClient {
    private stompClient:    Client;
    private subscription?:  StompSubscription;
    private roomId?:        string;
    private sessionId?:     string;
    private axiosInstance:  AxiosInstance;
    private connected:              Ref<Boolean> = ref(false);

    constructor() {
        this.stompClient = new Client({
            webSocketFactory: () => new SockJS(serverUrl),
            onConnect: (frame) => {
                console.log("Connected");
                if (!this.roomId) return;

                this.connected.value = true;
                this.subscribeToRoom(this.roomId);
            },
            onDisconnect: (frame) => {
                console.log("Disconnected");
                this.connected.value = false;
            },
        });
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:8080',
        });
    }

    isConnected = () => this.connected.value
    isDisconnected = () => !this.connected.value

    match = async () => {
        const result = await this.axiosInstance.get<MatchingResultMessage>("/game/join");
        const matchingResult = result.data;
        if (matchingResult.responseResult === 'SUCCESS') {
            this.roomId = matchingResult.chatRoomId;
            this.sessionId = matchingResult.sessionId;
            this.stompClient.connectHeaders = {
                chatRoomId: this.roomId!,
            }
            this.stompClient.activate();
        }
        return matchingResult;
    }

    private subscribeToRoom = (roomId: string) => {
        console.log(`try subscribe room ${roomId}`);
        if (this.isDisconnected()) return;

        if (this.subscription !== undefined) {
            console.error("Subscription already exists");
            return;
        }

        this.subscription = this.stompClient!.subscribe(`/topic/room/${roomId}`, (message) => {
            const msg:StompMessage = JSON.parse(message.body);
            console.log(`Got Message: ${msg.message}`);
        });
    }

    sendMessage = (payload:string) => {
        if (this.isDisconnected()) return;

        if (!this.subscription || !this.roomId) {
            console.error(`subscription(${this.subscription}) or roomId(${this.roomId}) is undefined`);
            return;
        }

        const body:StompMessage = {
            message: payload,
            messageType: 'CHAT',
            senderSessionId: this.sessionId!,
        };

        this.stompClient?.publish({
            destination: `/app/game.message/${this.roomId}`,
            body: JSON.stringify(body),
        });
    }
}
