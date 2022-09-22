import nc from  'next-connect';
import dbConnect from '../../../config/dbConnect';

import { allRooms, newRooms } from '../../../controllers/roomControllers';



const handler = nc();

dbConnect();

handler.get(allRooms);

handler.post(newRooms);

export default handler;