import { ReactElement } from 'react';

export interface ISystemMessage {
	message: string | ReactElement;
	status: 'error' | 'success';
}

export interface IKeyedSystemMessage extends ISystemMessage {
	key: number;
}
