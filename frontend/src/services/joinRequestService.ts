import { apiClient } from '@/lib/api';
import { JoinRequest } from '@/types';

export const joinRequestService = {
  /**
   * Submit a new request to join a club.
   */
  createJoinRequest: async (clubId: number): Promise<JoinRequest> => {
    const response = await apiClient.post<JoinRequest>('/api/join-requests', {
      club_id: clubId,
    });
    return response.data;
  },

  /**
   * Retrieve all join requests submitted by the current authenticated student.
   */
  getMyJoinRequests: async (): Promise<JoinRequest[]> => {
    const response = await apiClient.get<JoinRequest[]>('/api/join-requests/my');
    return response.data;
  },
};
