export enum SpinnerMessage {
    compiling = 'Compiling contracts...',
    starting = 'Starting analysis...',
    building_dt = 'Building dependency tree...',
    analyzing = 'Detecting vulnerabilities...',
    solving = 'Vulnerability detected. Solving...',
    finalizing = 'Finalizing the audit...',
    default = 'Detecting vulnerabilities...',
    empty = '',
}

export interface SpinnerState {
    active: boolean;
    message: SpinnerMessage;
    progress?: Progress;
}

export interface Progress {
    current: number;
    total: number;
}

export const emptySpinnerState: SpinnerState = {
    active: false,
    message: SpinnerMessage.empty,
};