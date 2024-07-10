import { Message} from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    iAcceptingMessages ? : boolean;
    messages ? : Array<Message>
}