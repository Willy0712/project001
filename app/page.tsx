import Image from "next/image";
import heroImage from "@/public/heroimage.webp";
import Card from "./_components/Card";
import germany from "@/public/countries/germany.jpg";
import newyork from "@/public/countries/newyork.jpg";
import shanghai from "@/public/countries/shanghai.jpg";
import StepProcess from "./_components/homepage/StepProcess";
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/16/solid";
import StepItem from "./_components/homepage/StepItem";
import { reverse } from "dns";

const steps = [
  {
    icon: <CloudArrowUpIcon className="text-blue-600" />,
    title: "Upload Your News to Reach a Global Audience",
    description:
      "Share your story with the world by uploading your news directly to the platform. Your content becomes accessible globally.",
    iconColorClass: "text-blue-600",
    reverse: false,
  },
  {
    icon: <CheckCircleIcon className="text-green-600" />,
    title: "Let the Community Verify Your Story",
    description:
      "Once your news is live, the community can engage by verifying its authenticity, ensuring accuracy.",
    iconColorClass: "text-green-600",
    reverse: true,
  },
  {
    icon: <ShieldCheckIcon className="text-indigo-600" />,
    title: "Enjoy Freedom from Misinformation",
    description:
      "Experience a platform where verified stories stand out, building a safer space free from misinformation.",
    iconColorClass: "text-indigo-600",
    reverse: false,
  },
];

export default function Page() {
  return (
    <main>
      <section className="pt-20 md:pt-35">
        <div className="container mx-auto px-8 lg:flex lg:items-center">
          <div className="text-center lg:text-left  lg:w-1/2">
            <h1 className="text-4xl lg:text-4xl xl:text-5xl font-bold leading-none">
              Post your story to be proved
            </h1>
            <p className="text-xl lg:text-2xl mt-6 font-light">
              A platform for sharing news to be verified
            </p>
            <p className="mt-8 md:mt-12">
              <button
                type="button"
                className=" py-4 px-12 bg-primary-800 hover:bg-primary-700 rounded-full text-white"
              >
                Check Countries
              </button>
            </p>
          </div>
          <div className="relative aspect-square lg:w-1/2">
            <Image
              src={heroImage}
              alt="hero"
              className="object-cover opacity-80 rounded-full"
            />
          </div>
        </div>
      </section>
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
      <section id="process" className="py-20">
        <StepProcess steps={steps} />
      </section>
    </main>
  );
}
