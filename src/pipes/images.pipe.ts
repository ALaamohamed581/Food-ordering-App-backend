import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImagesPipe implements PipeTransform {
  constructor() {}

  async transform(value: any) {
    const arrayBuffer = value.buffer.slice(0, 8);

    const magicNumber = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join(' ');

    if (
      magicNumber === '89 50 4e 47 0d 0a 1a 0a' ||
      magicNumber.startsWith('ff d8 ff')
    ) {
      // 1)  make an array of buffers
      const imageFile = value as Express.Multer.File;
      //2) convert it to base 64 strings

      const b64 = Buffer.from(imageFile.buffer).toString('base64');
      //3) new imagesNaems

      const dataUrl = `data:image/jpeg;base64,${b64}`;
      //4) upload to cloundinary

      const img = await cloudinary.uploader.upload(dataUrl);

      const iamgeUrl = await Promise.resolve(img.url);
      return iamgeUrl;
    }

    throw new BadRequestException('Valid image types are .png and .jpeg');
  }
}
