import User from "../models/users.model";
import { Request, Response } from "express";
import ResponseCodes from "../utils/ResponseCodes";
// import RiderBooking from "../models/riderBookings.model";
import pickupLocations from "../models/pickup.model";
import destinationLocations from "../models/destination.model";
import RiderRequest from "../models/riderRequests.model";

class BookingController {
  static riderRequests = async (req: any, res: any) => {
    console.log(req.user);
    try {
      const {
        // car_type,
        pickup_location,
        destination_location,
        phone_number,
      } = req.body;

      // Create a new rider booking with references to pickup and destination
      const newRiderRequest: any = new RiderRequest({
        user: req.user.user_id,
        // car_type: car_type,
        pickup_location: pickup_location,
        destination_location: destination_location,
        phone_number: phone_number,
      });
      await newRiderRequest.save();

      res.status(201).json({
        success: true,
        message: "Request added successfully.",
        response_code: ResponseCodes.CREATE_SUCCESS,
        data: newRiderRequest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };
  
  // static addBooking = async (req: any, res: any) => {
  //   try {
  //     const {
  //       first_name,
  //       last_name,
  //       email,
  //       number_of_guest,
  //       pickup_date_time,
  //       addresses,
  //     } = req.body;

  //     // Create a new rider booking with references to pickup and destination
  //     const newRiderBooking: any = new RiderBooking({
  //       first_name: first_name,
  //       last_name: last_name,
  //       email: email,
  //       number_of_guest: number_of_guest,
  //       pickup_date_time: pickup_date_time,
  //     });

  //     // Create new pickup and destination documents
  //     const pickup = new pickupLocations({
  //       rider_booking_id: newRiderBooking._id,
  //       pickup_address: addresses[0].pickup_location.pickup_address,
  //       pickup_city: addresses[0].pickup_location.pickup_city,
  //       pickup_state: addresses[0].pickup_location.pickup_state,
  //       pickup_zip_code: addresses[0].pickup_location.pickup_zip_code,
  //     });

  //     const destination = new destinationLocations({
  //       rider_booking_id: newRiderBooking._id,
  //       destination_address: addresses[1].destination.destination_address,
  //       destination_city: addresses[1].destination.destination_city,
  //       destination_state: addresses[1].destination.destination_state,
  //       destination_zip_code: addresses[1].destination.destination_zip_code,
  //     });

  //     // Save pickup and destination documents to the database
  //     await Promise.all([pickup.save(), destination.save()]);

  //     // Save the rider booking document to the database
  //     (newRiderBooking.pickup_locations = pickup._id),
  //       (newRiderBooking.destination_locations = destination._id),
  //       await newRiderBooking.save();

  //     res.status(201).json({
  //       success: true,
  //       message: "Booking added successfully.",
  //       response_code: ResponseCodes.CREATE_SUCCESS,
  //       data: newRiderBooking,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       data: null,
  //       message: "Internal server error",
  //       errors: error,
  //     });
  //     console.log(
  //       `An error occurred during processing the request. More details: ${error}`
  //     );
  //   }
  // };

  // static getBooking = async (req: any, res: any) => {
  //   try {
  //     const bookings = await RiderBooking.find()
  //       .populate("pickup_locations")
  //       .populate("destination_locations");
  //     res.status(201).json({
  //       success: true,
  //       count: bookings.length,
  //       message: "Booking get successfully",
  //       response_code: ResponseCodes.GET_SUCCESS,
  //       data: bookings,
  //     });
  //   } catch (error) {
  //     console.log(
  //       `An error occurred during processing the request. More details: ${error}`
  //     );
  //     return res.status(200).json({
  //       success: false,
  //       data: null,
  //       errors: error,
  //       message: `Internal Server Error. Unable to retrieve question due to this following errors: ${error}`,
  //     });
  //   }
  // };

  // static deleteBooking = async (req: Request, res: Response) => {
  //   try {
  //     const id = req.params.id;
  //     const rider_booking = await RiderBooking.findByIdAndDelete({ _id: id });
  //     if (rider_booking) {
  //       res.status(201).json({
  //         success: true,
  //         response_code: ResponseCodes.DELETE_SUCCESS,
  //         status: 1,
  //         message: "RiderBooking successfully deleted.",
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: false,
  //         response_code: ResponseCodes.DELETE_FAILED,
  //         status: 0,
  //         message: "something went wrong!",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       error: `${error}`,
  //       message: "Internal Server Error",
  //     });
  //     throw new Error(
  //       `Internal Server Error. Unable to delete subject due to this following errors: ${error}`
  //     );
  //   }
  // };
}

export default BookingController;
