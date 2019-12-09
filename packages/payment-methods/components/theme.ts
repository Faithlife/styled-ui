export interface IDefaultTheme {
	thickness1: string;
	thickness2: string;
	thickness3: string;
	thickness4: string;
	thickness5: string;
	thickness6: string;
	thickness7: string;
	thickness8: string;
	thickness9: string;

	smallViewportWidth: string;

	// from https://git.faithlife.dev/Logos/Faithlife/blob/d5ae782a09924e60397fde95db32657a0aa9f5fd/src/Faithlife.Web/Content/Styles/common/common.variables.less#L1
	/* BASE COLORS */
	shade0: string;
	shade3: string;
	shade5: string;
	shade7: string;
	shade10: string;
	shade15: string;
	shade20: string;
	shade25: string;
	shade30: string;
	shade35: string;
	shade40: string;
	shade50: string;
	shade60: string;
	shade70: string;
	shade80: string;
	shade90: string;
	shade100: string;

	red: string;

	bold: number;
	semibold: number;
	normal: number;
	light: number;
}

const defaultTheme: IDefaultTheme = {
	thickness1: '4px',
	thickness2: '8px',
	thickness3: '12px',
	thickness4: '16px',
	thickness5: '24px',
	thickness6: '32px',
	thickness7: '48px',
	thickness8: '64px',
	thickness9: '96px',

	smallViewportWidth: '769px',

	// from https://git.faithlife.dev/Logos/Faithlife/blob/d5ae782a09924e60397fde95db32657a0aa9f5fd/src/Faithlife.Web/Content/Styles/common/common.variables.less#L1
	/* BASE COLORS */
	shade0: '#ffffff',
	shade3: '#fcfcfc',
	shade5: '#fafafa',
	shade7: '#f2f2f2',
	shade10: '#eeeeee',
	shade15: '#e6e6e6',
	shade20: '#dddddd',
	shade25: '#d8d8d8',
	shade30: '#cccccc',
	shade35: '#c8c8c8',
	shade40: '#bbbbbb',
	shade50: '#a8a8a8',
	shade60: '#888888',
	shade70: '#7a7a7a',
	shade80: '#575251',
	shade90: '#3d3d3d',
	shade100: '#000000',

	red: '#d94848',

	bold: 800,
	semibold: 600,
	normal: 400,
	light: 200,
};

export default defaultTheme;
