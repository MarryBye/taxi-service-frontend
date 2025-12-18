import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/admin/maintenances";

import type {
  Maintenance,
  CreateMaintenance,
  UpdateMaintenance,
} from "@/types/maintenances";

export function useMaintenances() {
  return useApiQuery<Maintenance[]>(api.listMaintenances, []);
}

export function useMaintenance(maintenanceId: number) {
  return useApiQuery<Maintenance>(
    () => api.getMaintenance(maintenanceId),
    [maintenanceId]
  );
}

export function useCreateMaintenance() {
  return useApiMutation<CreateMaintenance, Maintenance>(api.createMaintenance);
}

export function useUpdateMaintenance(maintenanceId: number) {
  return useApiMutation<UpdateMaintenance, Maintenance>((payload) =>
    api.updateMaintenance(maintenanceId, payload)
  );
}

export function useDeleteMaintenance() {
  return useApiMutation<number, void>((id) => api.deleteMaintenance(id));
}
