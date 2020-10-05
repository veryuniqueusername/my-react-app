import React from 'react';

const themeColours = {
	light: {
		textColor: '#282c34',
		backgroundColor: '#eeeeee',
		linkColor: '#0066cc',
	},
	dark: {
		textColor: '#eeeeee',
		backgroundColor: '#282c34',
		linkColor: '#61dafb',
	},
};

type ThemeName = 'light' | 'dark';
type ThemeContextType = {
	theme: ThemeName;
	setTheme: (name: ThemeName) => void;
};
const ThemeContext = React.createContext<ThemeContextType>(undefined!);

type Props = {
	children: React.ReactNode;
};
export const ThemeProvider = ({ children }: Props) => {
	const [themeName, setThemeName] = React.useState<ThemeName>('dark');
	// Change css
	const setTheme = (name: ThemeName) => {
		Object.entries(themeColours[name]).forEach((item) => {
			document.body.style.setProperty('--' + item[0], item[1]);
			console.log(document.body.style.getPropertyValue('--' + item));
		});
		setThemeName(name);

		// Set new theme to localStorage
		localStorage.setItem('theme', name);
	};
	return (
		<ThemeContext.Provider value={{ theme: themeName, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => React.useContext(ThemeContext);
