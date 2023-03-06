import React from "react";

import Course from "../types/Course";
import CourseService from "../services/CourseService";

interface Props {
  id: number;
}

const getCourse = async (id: number) => {
  const course = await CourseService.getCourse(id);
  return course;
}

const CourseView: React.FC<Props> = (props) => {
  const [course, setCourse] = React.useState<Course>(
    {
      id: 0,
      name: '',
    } as Course
  );
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    if (state === 0) {
      getCourse(props.id).then((course) => {
        setCourse(course);
      });
    }
  }, [state]);

  return (
    <>
      <p>{course.name}</p>
    </>
  );
};

export default CourseView;
