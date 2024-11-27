import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtData } from 'src/types/jwtAuthTyoe';

@Injectable()
export class JWTAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens({ authSecret, payload, refSecret }: JwtData) {
    const refreshToken = this.jwtService.sign(
      {},
      {
        secret: refSecret,
        expiresIn: '1d',
      },
    );
    const authToken = this.jwtService.sign(
      { payload },
      {
        secret: authSecret,
        expiresIn: '15m',
      },
    );

    return { refreshToken, authToken };
  }

  VerifyAuthToken(token: string, secret: string) {
    const decoade = this.jwtService.verify(token, {
      secret,
    });
    return decoade;
  }
}
