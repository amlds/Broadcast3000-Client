import School from "../types/School";

const url = "http://localhost:3000/api/v1";

const SchoolService = {
  async getSchools(): Promise<School[]> {
    const response = await fetch(`${url}/schools`);
    const schools = await response.json();
    return schools;
  },

  async getSchool(schoolId: number): Promise<School> {
    const response = await fetch(`${url}/schools/${schoolId}`);
    const school = await response.json();
    return school;
  },

  async createSchool(school: School): Promise<School> {
    const response = await fetch(`${url}/schools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(school)
    });
    const newSchool = await response.json();
    return newSchool;
  },

  async updateSchool(school: School): Promise<School> {
    const response = await fetch(`${url}/schools/${school.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(school)
    });
    const updatedSchool = await response.json();
    return updatedSchool;
  }
}

export default SchoolService;
