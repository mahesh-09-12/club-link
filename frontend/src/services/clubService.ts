import { apiClient } from '@/lib/api';
import { Club } from '@/types';

export const clubService = {
  /**
   * Fetch all clubs, optionally filtered by category.
   */
  getClubs: async (category?: string): Promise<Club[]> => {
    const params: Record<string, string> = {};
    if (category && category.toLowerCase() !== 'all') {
      params.category = category;
    }
    const response = await apiClient.get<Club[]>('/api/clubs', { params });
    return response.data;
  },

  /**
   * Fetch a single club by its ID.
   */
  getClubById: async (id: number | string): Promise<Club> => {
    const response = await apiClient.get<Club>(`/api/clubs/${id}`);
    return response.data;
  },
};
