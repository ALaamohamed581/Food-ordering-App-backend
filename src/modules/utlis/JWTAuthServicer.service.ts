import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtData, TokenData } from 'src/types/jwtAuthTyoe';

@Injectable()
export class JWTAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens({ authSecret, payload, refSecret }: JwtData) {
    if (!refSecret) {
      const authToken = this.jwtService.sign(
        { payload },
        {
          secret: authSecret,
          expiresIn: '15m',
        },
      );
      return { authToken };
    }
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

  VerifyAuthToken({ token, secret }: TokenData) {
    const decoade = this.jwtService.verify(token, {
      secret,
    });
    return decoade;
  }
}
