import { getEmotionMap } from "./emotions";
import { useTheme } from "@mui/material";

const emotions = getEmotionMap()

export const getEventNeonBorderStyle = (event) => {
  const [primaryColor, secondaryColor] = getEventEmotionColors(event, 'transparent');
  const { palette } = useTheme();
  const transparency = palette.mode === 'light' ? '#FFFFFFAA, #FFF' : '#000000AF, #000'

  return {
    border: 'double 6px transparent',
    borderRadius: '12px',
    backgroundImage: `linear-gradient(${transparency}), linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    "WebkitTransition": "border 200ms ease-out",
    "MozTransition": "border 200ms ease-out",
    "OTransition": "border 200ms ease-out",
    "transition": "border 200ms ease-out"
  }
}

export const getEventEmotionColors = (event, defaultColor = 'white') => {
  const colors = event.emotions.map((emotion) => emotions[emotion].color ?? defaultColor);
  if (colors.length < 2) return [...colors, colors[0]];
  return colors;
}