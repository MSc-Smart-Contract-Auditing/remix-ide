export enum SpinnerMessage {
    compiling = 'Compiling contracts...',
    starting = 'Starting analysis...',
    analyzing = 'Looking for vulnerabilities...',
    empty = '',
}

export interface SpinnerState {
    active: boolean;
    message: SpinnerMessage;
}

export const emptySpinnerState: SpinnerState = {
    active: false,
    message: SpinnerMessage.empty,
};