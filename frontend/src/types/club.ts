export type ClubStatus = 'active' | 'inactive';

export interface Club {
  id: number;
  name: string;
  description: string;
  category: string;
  faculty_coordinator_id: number;
  club_coordinator_id: number | null;
  status: ClubStatus;
  created_at: string;
}
