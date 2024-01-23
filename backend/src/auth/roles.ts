// /src/auth/roles.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  CLINIC_ASSISTANT = 'CLINIC_ASSISTANT',
}

export const checkUserRole = (requiredRole: UserRole, userRole: UserRole): boolean => {
  const roleOrder = ['ADMIN', 'DOCTOR', 'CLINIC_ASSISTANT'];

  const requiredIndex = roleOrder.indexOf(requiredRole);
  const userIndex = roleOrder.indexOf(userRole);

  return userIndex >= requiredIndex;
};
