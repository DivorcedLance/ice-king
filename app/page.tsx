// app/page.js
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige al usuario a la página /dashboard
  redirect('/dashboard');
}