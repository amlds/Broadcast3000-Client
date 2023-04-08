import School from "../types/School";

const url = "http://localhost:3001/api/v1";

interface UpdateSchool {
  message_display: string;
  nbr_carrousel: number;
}

const SchoolService = {
  async getSchool(schoolId: number): Promise<School> {
    const response = await fetch(`${url}/schools/${schoolId}`);
    const school = await response.json();
    return school;
  },

  async updateSchool(school: UpdateSchool, schoolId: number, token: any): Promise<School> {
    const response = await fetch(`${url}/schools/${schoolId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(school)
    });
    const updatedSchool = await response.json();
    return updatedSchool;
  }
}

export default SchoolService;
