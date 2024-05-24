import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react';
import missions from './../contants//missions.json';
import dailyMissions from './../contants//dailyMissions.json';
import dayjs from 'dayjs';

const UserContext = createContext();

export function UserContextProvider({ children }) {
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

  const calculateDailyMissions = () => {
    if (
      user.missionExpiration &&
      dayjs().isBefore(dayjs(user.missionExpiration))
    )
      return;
    const currentDailyMissions = getRandomMissions(4);
    setUser((prevUser) => ({
      ...prevUser,
      currentDailyMissions,
      missionExpiration: dayjs().endOf('day').format(),
    }));
  };

  useEffect(() => {
    calculateDailyMissions();
    const intervalId = setInterval(calculateDailyMissions, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, getLevel, gainExp }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
