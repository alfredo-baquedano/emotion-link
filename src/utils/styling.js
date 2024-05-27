import { getEmotionMap } from "./emotions";
import { useTheme } from "@mui/material";

export const getEventNeonBorderStyle = (event) => {
  const emotions = getEmotionMap()
  const primaryColor = emotions[event?.emotions?.[0]]?.color ?? 'transparent';
  const secondaryColor = emotions[event?.emotions?.[1]]?.color ?? primaryColor;
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
