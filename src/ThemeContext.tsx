import React from 'react';

const themeColours = {
	light: {
		backgroundColor: '#eeeeee',
		linkColor: '#0066cc',
		textColor: '#282c34',
		navBackgroundColor: '#d7dadd',
		navBorder: '1px solid #a6aaac',
		hoverFilter: 'brightness(0.95)',
		navShadow: '0px 0px 10px 2px #77777788',
		scrollbarColor: '#ff00008f',
		color: '#fff',
	},
	dark: {
		backgroundColor: '#282c34',
		linkColor: '#61dafb',
		textColor: '#eeeeee',
		navBackgroundColor: '#161921',
		navBorder: '1px solid #333842',
		hoverFilter: 'brightness(1.15)',
		navShadow: '0px 0px 10px 2px #00000088',
		scrollbarColor: '#ff007f8f',
		color: '#000',
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
