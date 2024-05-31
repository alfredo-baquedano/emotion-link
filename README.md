# Emotion Link

Emotional Link, is a tool designed to help people organize and understand their emotions by providing a visual representation of life events.

It lets you add the most meaningful life events and select the emotions you felt during those events, along with other useful information like the date, level of impact and display a connected node graph view with color-coded events based on the emotions you selected. This allows you to have a really good visual representation of your emotions on main events of your life and also be able to filter and sort that information as you like so you can try to understand yourself by viewing your emotions from another perspective.

## Setup

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/alfredo-baquedano/emotion-linking.git
```

2. Navigate to the project directory:

```bash
cd emotion-linking
```

3. Install dependencies using npm or yarn:

```bash
npm install
```

## Usage
Once you've set up the project, you can start the development server:

```bash
npm run dev
```

This will run the app in development mode. Open http://localhost:5173/ to view it in your browser.

## Configuration

### Theme Configuration
The theme for this project is located in src/theme/theme.js. You can customize the theme by modifying this file. MUI's createMuiTheme function is used to create the theme, allowing you to adjust various aspects such as colors, typography, and spacing.

## Dependencies
This project relies on the following dependencies:

- [React](https://react.dev/)
- [Material-UI](https://mui.com/) - for UI components
- [D3](https://d3js.org/getting-started) - for rendering dynamic charts
- [Day.js](https://day.js.org/) - for date manipulation
- [Vite](https://vitejs.dev/) - for fast development server and build tool

## License

This project is licensed under the GPL-3.0 license. See the [LICENSE](LICENSE.md) file for more details.
