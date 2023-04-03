import Course from '../types/Course';

const url = 'http://localhost:3001/api/v1/courses/';

const CourseService = {
  getCourses: async (): Promise<Course[]> => {
    const response = await fetch(url);
    return response.json();
  },

  getCourse: async (id: number): Promise<Course> => {
    const response = await fetch(url + id);
    return response.json();
  }
};

export default CourseService;
