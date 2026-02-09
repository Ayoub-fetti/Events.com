import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// pour anooter les endpoints avec les roles autorises
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
