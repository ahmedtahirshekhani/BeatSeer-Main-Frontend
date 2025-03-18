import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {

try {
    console.log('Cron job is working! This runs every Monday at midnight.');

  return NextResponse.json({ message: 'Cron job Working.' });
} catch (error) {
    console.error("Error in cron job API:", error);
  }
} 
