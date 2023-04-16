import Batch from "../types/Batch";

interface NewBatch {
  batch: {
    number: number;
    start_at: string;
    course_id: number;
  }
}

interface UpdateBatch {
  batch: {
    id: number;
    number: number;
    start_at: string;
    course_id: number;
  }
}


//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/batchs
const url = "http://localhost:3001/api/v1";

const BatchService = {
  async createBatch(schoolId: number, batch: NewBatch, token: any): Promise<Batch> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(batch)
    });
    const newBatch = await response.json();
    return newBatch;
  },

  async updateBatch(batch: UpdateBatch, token: any): Promise<UpdateBatch> {
    console.log(batch);
    const response = await fetch(`${url}/batchs/${batch.batch.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(batch)
    });
    const updatedBatch = await response.json();
    return updatedBatch;
  },

  async deleteBatch(batchId: number, token: any): Promise<Batch> {
    const response = await fetch(`${url}/batchs/${batchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const deletedBatch = await response.json();
    return deletedBatch;
  },
};

export default BatchService;
