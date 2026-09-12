import apiClient from '../../../services/apiClient';
import { API_ENDPOINTS } from '../../../config/api.config';

export const adminService = {
  /**
   * Fetch live metrics and record counts across all 10 collections
   */
  async getStats() {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_STATS);
    return res.data;
  },

  /**
   * Get paginated records for a specific collection
   */
  async getTableRecords(table, { page = 1, limit = 15, search = '', sortBy = '', sortOrder = 'asc' } = {}) {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_TABLE(table), {
      params: { page, limit, search, sortBy, sortOrder }
    });
    return res.data;
  },

  /**
   * Get single document by ID
   */
  async getRecordById(table, id) {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_RECORD(table, id));
    return res.data?.data;
  },

  /**
   * Create new document in table
   */
  async createRecord(table, data) {
    const res = await apiClient.post(API_ENDPOINTS.ADMIN_TABLE(table), data);
    return res.data;
  },

  /**
   * Update document in table
   */
  async updateRecord(table, id, data) {
    const res = await apiClient.put(API_ENDPOINTS.ADMIN_RECORD(table, id), data);
    return res.data;
  },

  /**
   * Delete document by ID
   */
  async deleteRecord(table, id) {
    const res = await apiClient.delete(API_ENDPOINTS.ADMIN_RECORD(table, id));
    return res.data;
  },

  /**
   * Get all role permission matrices
   */
  async getPermissions() {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_PERMISSIONS);
    return res.data?.data;
  },

  /**
   * Get single role permissions
   */
  async getRolePermission(role) {
    const res = await apiClient.get(API_ENDPOINTS.ADMIN_ROLE_PERMISSIONS(role));
    return res.data?.data;
  },

  /**
   * Update role permissions
   */
  async updateRolePermission(role, payload) {
    const res = await apiClient.put(API_ENDPOINTS.ADMIN_ROLE_PERMISSIONS(role), payload);
    return res.data;
  },

  /**
   * Reset all permissions to factory defaults
   */
  async resetPermissions() {
    const res = await apiClient.post(API_ENDPOINTS.ADMIN_RESET_PERMISSIONS);
    return res.data;
  }
};

export default adminService;
