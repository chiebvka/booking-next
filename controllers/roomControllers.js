const Room = require('../models/room');
const ErrorHandler = require('../utils/errorHandler').default;
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures').default;

// Get All Rooms => /api/rooms
const allRooms = catchAsyncErrors( async (req, res, next) => {

        const resPerPage = 4;
        const roomsCount = await Room.countDocuments();

        const apiFeatures = new APIFeatures(Room.find(), req.query)
                .search()
                .filter()

        let rooms = await apiFeatures.query;
        let filteredRoomsCount = rooms.length;
    
        apiFeatures.pagination(resPerPage)
        // added a .clone() method because of mongoose v6 executing query a second time should remove if problems arise
        rooms = await apiFeatures.query.clone();

        res.status(200).json({
            success: true,
            roomsCount,
            resPerPage,
            filteredRoomsCount,
            rooms
        })
})


//Create new Rooms => /api/rooms
const newRooms = catchAsyncErrors(async (req, res) => {

        const room = await Room.create(req.body);
    
        res.status(200).json({
            success: true,
            room
        })

})


//Get Room Detailss => /api/rooms/:id
const getSingleRoom =  catchAsyncErrors(async (req, res, next) => {

        const room = await Room.findById(req.query.id);

        if(!room) {
            return next(new ErrorHandler('Room not found with this ID', 404))
        }
    
        res.status(200).json({
            success: true,
            room
        })

})



//Update Room Details => /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {

        let room = await Room.findById(req.query.id);

        if(!room) {
            return next(new ErrorHandler('Room not found with this ID', 404))
        } 

        room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            success: true,
            room
        })
        

})


//Delete Room => /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {

        const room = await Room.findById(req.query.id);

        if(!room) {
            return next(new ErrorHandler('Room not found with this ID', 404))
        } 

        await room.deleteOne();
    
        res.status(200).json({
            success: true,
            message: 'Room  deleted successfully'
        })

})

export {
    allRooms,
    newRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom
}