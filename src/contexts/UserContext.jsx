import { useEffect, useState, useCallback } from 'react';
import missions from './../contants//missions.json';
import dailyMissions from './../contants//dailyMissions.json';
import dayjs from 'dayjs';

const useUser = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userData')) ?? {
      experience: 0,
      currentDailyMissions: [],
      preferedTheme: 'dark',
    },
  );

  const getLevel = () =>
    missions.reverse().findLast((level) => user.experience >= level.requiredExp)
      ?.level ?? 0;

  const gainExp = useCallback((exp) => {
    console.debug('gain');
    setUser((prevUser) => ({
      ...prevUser,
      experience: prevUser.experience + exp,
    }));
  }, []);

  const getRandomMissions = (count) => {
    const shuffled = dailyMissions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getDailyMissions = useCallback(() => {
    console.log('getDailyMissions');
    if (dayjs().isBefore(dayjs(user.missionExpiration)))
      return user.currentDailyMissions;
    const currentDailyMissions = getRandomMissions(4);
    setUser((prevUser) => ({
      ...prevUser,
      currentDailyMissions,
      missionExpiration: dayjs().endOf('day').format(),
    }));
    return currentDailyMissions;
  }, [user.missionExpiration]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return { user, setUser, getLevel, gainExp, getDailyMissions };
};

export default useUser;
