import Batch from "../types/Batch";

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/batchs
const url = "http://localhost:3000/api/v1";

const BatchService = {
  async getBatchs(schoolId: number): Promise<Batch[]> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs`);
    const batchs = await response.json();
    return batchs;
  },

  async getBatch(schoolId: number, batchId: number): Promise<Batch> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs/${batchId}`);
    const batch = await response.json();
    return batch;
  },

  async createBatch(schoolId: number, batch: Batch): Promise<Batch> {
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

  async updateBatch(schoolId: number, batch: Batch): Promise<Batch> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs/${batch.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(batch)
    });
    const updatedBatch = await response.json();
    return updatedBatch;
  },

  async deleteBatch(schoolId: number, batchId: number): Promise<Batch> {
    const response = await fetch(`${url}/schools/${schoolId}/batchs/${batchId}`, {
      method: "DELETE"
    });
    const deletedBatch = await response.json();
    return deletedBatch;
  },
};

export default BatchService;
