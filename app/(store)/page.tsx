import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {

  return (
    <main className="mt-6">
      <h1 className="text-center text-4xl tracking-wide font-semibold">E-COMMERCE DE <span className="text-red-600 font-bold">PERIFÉRICOS</span></h1>
      <div>

      </div>
      <div className="flex justify-center">
        <Button
          className="bg-red-600 hover:bg-red-700 max-w-48 py-6 w-full font-bold tracking-widest"
          asChild
        >
          <Link href="/store">VER MAIS</Link>
        </Button>
      </div>
    </main>
  );
}

export default Home