import Course from '../types/Course';

const CourseService = {
  getCourses: async (): Promise<Course[]> => {
    const response = await fetch('/api/courses');
    return response.json();
  },

  getCourse: async (id: number): Promise<Course> => {
    const response = await fetch(`/api/courses/${id}`);
    return response.json();
  }
};

export default CourseService;
