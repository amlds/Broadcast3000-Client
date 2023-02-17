import React from "react";

import Lectures from "../data/lectures.json";

type Props = {
  date: string;
}

interface Lecture {
  id: number;
  date: string
  challenge: {
    name: string;
    time: string;
  }
}

const getLecturesByDate = (date: string) => {
  return Object.values(Lectures).filter((Lecture: Lecture) => {
    return Lecture.date === date;
  });
};

const LecturesDay: React.FC<Props> = (date) => {
  const [challengeName, setChallengeName] = React.useState(getLecturesByDate(date.date));

  React.useEffect(() => {
    setChallengeName(getLecturesByDate(date.date));
  }, [date]);

  return (
    <p className="lecturesDay">
      <span className='text-normal'> {challengeName[0].challenge.name}</span>
      <span className='text-normal'> {challengeName[0].challenge.name}</span>
    </p>
  );
}

export default LecturesDay;
