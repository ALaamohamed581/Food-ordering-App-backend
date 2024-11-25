// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { JwtData, JWtsRespnse } from 'src/types/jwtAuthTyoe';

// @Injectable()
// export class JWTAuthService {
//   constructor(private readonly JWt: JwtService) {}

//   secureCookies({
//     res,
//     secrets: { authSecret, payload, refSecret },
//   }: JWtsRespnse) {
//     const { refreshToken, authToken } = this.securedResponse({
//       authSecret,
//       payload,
//       refSecret,
//     });
//     res
//       .cookie('refCookie', refreshToken, {
//         maxAge: 1000 * 60 * 60 * 24, // 24 hours
//         secure: true,
//       })
//       .cookie('authCookie', authToken, {
//         maxAge: 1000 * 60 * 15, // 15 minutes
//         secure: true,
//         httpOnly: true,
//       })
//       .status(200);
//   }

//   securedResponse(jwtData: JwtData) {
//     const refreshToken = this.JWt.sign(
//       {},
//       {
//         secret: jwtData.refSecret,
//         expiresIn: '1d',
//       },
//     );
//     const authToken = this.JWt.sign(
//       { Payload: jwtData.payload },
//       {
//         secret: jwtData.authSecret,
//         expiresIn: '15m',
//       },
//     );

//     return { refreshToken, authToken };
//   }
// }
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtData } from 'src/types/jwtAuthTyoe';

@Injectable()
export class JWTAuthService {
  constructor(private readonly jwtService: JwtService) {}

  securedResponse(jwtData: JwtData) {
    const refreshToken = this.jwtService.sign(
      {},
      {
        secret: jwtData.refSecret,
        expiresIn: '1d',
      },
    );
    const authToken = this.jwtService.sign(
      { payload: jwtData.payload },
      {
        secret: jwtData.authSecret,
        expiresIn: '15m',
      },
    );

    return { refreshToken, authToken };
  }
}
