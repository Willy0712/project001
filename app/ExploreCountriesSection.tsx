import Card from "./_components/Card";
import germany from "@/public/countries/germany.jpg";
import united from "@/public/countries/newyork.jpg";
import china from "@/public/countries/shanghai.jpg";
import Link from "next/link";

export default function ExploreCountriesSection() {
  return (
    <section id="explore-countries" className="py-10 my-9">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Countries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href={`/listnews/china`}>
            <Card imageSrc={china} country="china">
              China
            </Card>
          </Link>
          <Link href={`/listnews/united`}>
            <Card imageSrc={united} country="united">
              United States
            </Card>
          </Link>
          <Link href={`/listnews/germany`}>
            <Card imageSrc={germany} country="Germany">
              Germany
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
