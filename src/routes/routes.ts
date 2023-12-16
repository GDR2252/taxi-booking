import { Router } from 'express'
import userRoutes from "./users.route";
import bookingRoutes from "./riderBooking.route"
const router = Router()

router.use('/api/user',userRoutes)
router.use('/api/booking',bookingRoutes)

const apiRoutes = router

export default apiRoutes