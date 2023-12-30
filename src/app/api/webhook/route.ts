import { NextResponse } from "next/server";
import { createBooking, updateHotelRoom } from "@/libs/apis";
const checkout_session_completed = "checkout.session.completed";

export async function POST(req: Request, res: Response) {
  const content = await req.json();
  const {
    data: { object },
    type,
  } = content;

  switch (type) {
    case checkout_session_completed:
      const { metadata } = object;
      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      }: any = metadata;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      await updateHotelRoom(hotelRoom);

      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      console.log(`Unhandled event type ${type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
