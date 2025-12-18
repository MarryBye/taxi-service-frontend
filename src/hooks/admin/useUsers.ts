import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/admin/users";

import type { User, CreateUser, AdminUpdateUser } from "@/types/users";

export function useUsers() {
    return useApiQuery<User[]>(api.listUsers, []);
}

export function useUser(userId: number) {
    return useApiQuery<User>(() => api.getUser(userId), [userId]);
}

export function useCreateUser() {
    return useApiMutation<CreateUser, User>(api.createUser);
}

export function useUpdateUser(userId: number) {
    return useApiMutation<AdminUpdateUser, User>((payload) =>
        api.updateUser(userId, payload)
    );
}

export function useDeleteUser() {
    return useApiMutation<number, void>((id) => api.deleteUser(id));
}
