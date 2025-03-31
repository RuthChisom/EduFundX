// // pages/api/funders/[walletAddress].js

// import { connectToDatabase } from '../../utils/db';

// export default async function handler(req, res) {
//   const { walletAddress } = req.query;

//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const db = await connectToDatabase();
//     const fundersCollection = db.collection('funders');

//     const funder = await fundersCollection.findOne({ walletAddress });
    
//     if (!funder) {
//       return res.status(404).json({ message: 'Funder profile not found', profileComplete: false });
//     }

//     res.status(200).json({
//       profileComplete: funder.profileComplete || false,
//     });
//   } catch (error) {
//     console.error('Error fetching funder profile:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
