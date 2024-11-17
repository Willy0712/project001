import Card from "./_components/Card";
import germany from "@/public/countries/germany.jpg";
import newyork from "@/public/countries/newyork.jpg";
import shanghai from "@/public/countries/shanghai.jpg";

export default function ExploreCountriesSection() {
  return (
    <section className="py-10 my-9" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Countries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card imageSrc={shanghai} country="shanghai">
            Shanghai
          </Card>
          <Card imageSrc={newyork} country="New York">
            New York
          </Card>
          <Card imageSrc={germany} country="Germany">
            Germany
          </Card>
        </div>
      </div>
    </section>
  );
}
