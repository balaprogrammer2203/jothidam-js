import { Router } from 'express';
import {
  getAdminStats,
  getTableRecords,
  getTableRecordById,
  createTableRecord,
  updateTableRecord,
  deleteTableRecord
} from '../controllers/admin.controller.js';
import {
  getAllPermissions,
  getRolePermission,
  updateRolePermission,
  resetPermissionsToDefault
} from '../controllers/permission.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { enforcePermission } from '../middleware/permission.middleware.js';

const router = Router();

// Stats & Metrics
router.get('/stats', getAdminStats);

// Role Permissions Management (CRUD for role permissions)
router.get('/permissions', getAllPermissions);
router.get('/permissions/:role', getRolePermission);
router.put('/permissions/:role', verifyToken, updateRolePermission);
router.post('/permissions/reset', verifyToken, resetPermissionsToDefault);

// Generic CRUD Operations on any table with permission enforcement
router.get('/:table', enforcePermission('read'), getTableRecords);
router.get('/:table/:id', enforcePermission('read'), getTableRecordById);
router.post('/:table', verifyToken, enforcePermission('create'), createTableRecord);
router.put('/:table/:id', verifyToken, enforcePermission('update'), updateTableRecord);
router.delete('/:table/:id', verifyToken, enforcePermission('delete'), deleteTableRecord);

export default router;

