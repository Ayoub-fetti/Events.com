import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// il protege les routes si le token est absent ou invalide
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
