import emotionTree from '@/constants/emotions.json';

export const getEmotionList = () => {
  const result = [];
  const recurse = (currentObj) => {
    if (currentObj.name !== 'none') result.push(currentObj);
    if (currentObj.children && Array.isArray(currentObj.children)) {
      currentObj.children.forEach((child) => recurse(child));
    }
  };
  recurse(emotionTree);
  return result;
};

export const getEmotionMap = () => {
  const result = {};
  const recurse = (currentObj) => {
    if (currentObj.name !== 'none') result[currentObj.name] = currentObj;
    if (currentObj.children && Array.isArray(currentObj.children)) {
      currentObj.children.forEach((child) => recurse(child));
    }
  };
  recurse(emotionTree);
  return result;
};

export const getTooltipText = (emotion, level) =>
  emotion.level > level
    ? `\nNote: You need level ${emotion.level} to unlock this emotion`
    : '';

export const getEmotionsDetails = (emotions) => {
  return getEmotionList().filter(emotion => emotions.includes(emotion.name));
};

