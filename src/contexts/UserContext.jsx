import { useEffect, useState } from 'react';
import missions from './../pages/EmotionalGraphPage/missions.json';

const useUser = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userData')) ?? {
      experience: 0,
      preferedTheme: 'dark',
    },
  );

  const getLevel = () =>
    missions.reverse().findLast((level) => user.experience >= level.requiredExp)
      ?.level ?? 0;

  const gainExp = (exp) =>
    setUser((prevUser) => ({
      ...prevUser,
      experience: prevUser.experience + exp,
    }));

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return { user, setUser, getLevel, gainExp };
};

export default useUser;
