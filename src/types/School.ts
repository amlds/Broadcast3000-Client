import batch from './Batch'

export default interface School {
  id?: number,
  city_id: number,
  batches: batch[],
  display_path: string,
  message_display: string,
  nbr_carrousel: number,
  created_at: string,
  updated_at: string
}
