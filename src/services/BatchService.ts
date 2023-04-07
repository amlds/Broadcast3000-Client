import Batch from "../types/Batch";

interface NewBatch {
  number: number;
  start_at: string;
}
//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/batchs
const url = "http://localhost:3001/api/v1";

const BatchService = {
  async createBatch(schoolId: number, batch: NewBatch): Promise<Batch> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(batch)
    });
    const newBatch = await response.json();
    return newBatch;
  },

  async updateBatch(batch: Batch): Promise<Batch> {
    const response = await fetch(`${url}/batchs/${batch.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(batch)
    });
    const updatedBatch = await response.json();
    return updatedBatch;
  },

  async deleteBatch(batchId: number): Promise<Batch> {
    const response = await fetch(`${url}/batchs/${batchId}`, {
      method: "DELETE"
    });
    const deletedBatch = await response.json();
    return deletedBatch;
  },
};

export default BatchService;
