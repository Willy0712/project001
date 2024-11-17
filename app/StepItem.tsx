import Image from "next/image";
import React from "react";

type StepItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  iconColorClass?: string;
  reverse?: boolean;
};

export default function StepItem({
  icon,
  title,
  description,
  iconColorClass,
  reverse,
}: StepItemProps) {
  return (
    <div
      className={`container  mx-auto px-8 flex flex-col items-center text-center lg:text-left lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Text Content */}
      <div className="lg:w-1/2">
        <div className="lg:pr-12 xl:pr-24">
          <h3 className="text-3xl font-semibold leading-tight">{title}</h3>
          <p className="mt-4 text-xl font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center lg:w-1/2">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center ${iconColorClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
