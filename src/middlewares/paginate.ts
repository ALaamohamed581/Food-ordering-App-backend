// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { Query } from 'mongoose';
// @Injectable()
// export class Paginate implements NestMiddleware {
//   private find: Query<any, any> = 'find';
//   private queryString: any;
//   use(req: any, res: any, next: (error?: Error | any) => void) {
//     this.queryString = req.query;
//     console.log('pass from here');
//     req.queryString = this.filter().sort().limitFields().paginate();
//     next();
//   }
//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     this.find = this.find.find(JSON.parse(queryStr));

//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       this.find = this.find.sort(sortBy);
//     } else {
//       this.find = this.find.sort('-createdAt');
//     }

//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.find = this.find.select(fields);
//     } else {
//       this.find = this.find.select('-__v');
//     }

//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 10;
//     const skip = (page - 1) * limit;

//     this.find = this.find.skip(skip).limit(limit);

//     return this;
//   }
// }
