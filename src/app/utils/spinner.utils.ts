import { SpinnerMessage } from "../models/spinner-state.model";

export function stringToMessage(message: string): SpinnerMessage {
    if (Object.keys(SpinnerMessage).includes(message)) {
        return SpinnerMessage[message as keyof typeof SpinnerMessage];
    }

    return SpinnerMessage.default;
}