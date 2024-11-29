// let paginate = (query: string) => {
//   const { page } = query || 1;
//   const { limit } = query || 1;
//   const filter = {};
//   if (query.search()) {
//     filter.$or = [ [
//         { name: { $regex: query.searchTerm, $options: 'i' } },
//         { category: { $regex: query.searchTerm, $options: 'i' } },
//         { subCategory: { $regex: query.searchTerm, $options: 'i' } }
//       ];];
//   }
//   const sort = {};
// if (req.query.sortBy) {
//   const [field, order] = req.query.sortBy.split(':');
//   sort[field] = order === 'desc' ? -1 : 1;
// }
// try {
//     // Pagination
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     // Filtering
//     const filter = {};
//     if (req.query.searchTerm) {
//       filter.$or = [
//         { name: { $regex: req.query.searchTerm, $options: 'i' } },
//         // Add other fields you want to search here
//         { category: { $regex: req.query.searchTerm, $options: 'i' } },
//         { subCategory: { $regex: req.query.searchTerm, $options: 'i' } }
//       ];
//     }

//     // Sorting
//     const sort = {};
//     if (req.query.sortBy) {
//       const [field, order] = req.query.sortBy.split(':');
//       sort[field] = order === 'desc' ? -1 : 1;
//     }

//     // Fetch all matching test series without pagination for global search
//     const allMatchingTestSeries = await TestSeries.find(filter).sort(sort);

//     // Apply pagination to the results
//     const totalTestSeries = allMatchingTestSeries.length;
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;
//     const paginatedTestSeries = allMatchingTestSeries.slice(startIndex, endIndex);

//     res.json({
//       testSeries: paginatedTestSeries,
//       totalPages: Math.ceil(totalTestSeries / limit),
//       currentPage: page,
//       totalItems: totalTestSeries
//     });
//   } catch (error) {
//     console.error('Error fetching test series:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// };
