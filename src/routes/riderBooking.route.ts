import BookingController from "../controllers/riderBooking.controller";
import { Router } from "express";
import {verifyToken,is_Login} from "../middleware/auth";

const router = Router();

router.post(`/riderRequest`,is_Login, BookingController.riderRequests);
// router.post(`/`, BookingController.addBooking);
// router.get(`/`, BookingController.getBooking);
// router.delete(`/:id`, BookingController.deleteBooking);



const bookingRoutes = router;

export default bookingRoutes; 