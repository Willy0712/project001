import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/16/solid";

import HeroSection from "./HeroSection";
import StepProcess from "./StepProcess";
import ExploreCountriesSection from "./ExploreCountriesSection";

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
      <HeroSection />
      <ExploreCountriesSection />

      <section id="process" className="py-20">
        <StepProcess steps={steps} />
      </section>
    </main>
  );
}
