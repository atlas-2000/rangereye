import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-300">Page not found</p>
        <Link href="/">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
