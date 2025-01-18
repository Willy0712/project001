import { fetchAddressFromNominatim } from "@/app/_lib/actions";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json();
  const { street, city, state, country } = body;

  const validatedAddress = await fetchAddressFromNominatim({
    street,
    city,
    state,
    country,
  });

  if (!validatedAddress) {
    return NextResponse.json(
      { error: "Address could not be validated" },
      { status: 400 }
    );
  }

  return NextResponse.json(validatedAddress);
}
