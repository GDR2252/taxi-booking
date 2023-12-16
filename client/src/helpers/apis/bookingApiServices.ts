import { IBookingServicePayload } from "../../@types/apis/IBookingServices";
import { IApiResponse } from "../IApis";
import { axiosAuthInstance } from "../axois";
import { jsonToForm } from "../helpers";
import { AxiosResponse, CancelTokenSource } from "axios";

class BookingAuthApiServices {
  static signup = async (
    values: IBookingServicePayload,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<IApiResponse<any>>> => {
    const formValues = jsonToForm(values);
    return await axiosAuthInstance.post("/booking/riderRequest", formValues, {
      cancelToken: cancelToken?.token,
    });
  };
}
export default BookingAuthApiServices;
