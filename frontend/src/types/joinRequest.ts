export type JoinRequestStatus = 'pending' | 'approved' | 'rejected';

export interface JoinRequest {
  id: number;
  student_id: number;
  club_id: number;
  status: JoinRequestStatus;
  created_at: string;
  updated_at: string;
}
