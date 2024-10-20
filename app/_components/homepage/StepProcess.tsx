import Image from "next/image";
import React from "react";
import StepItem from "./StepItem";

type Step = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  iconColorClass?: string;
  reverse?: boolean;
};

type ThreeStepProcessProps = {
  steps: Step[];
};
export default function StepProcess({ steps }: ThreeStepProcessProps) {
  return (
    <div className="flex flex-col gap-y-[15rem] md:flex-col items-center justify-between space-y-8 md:space-y-0 md:space-x-8 p-8">
      {steps.map((step, index) => (
        <StepItem
          key={index}
          icon={step.icon}
          title={step.title}
          description={step.description}
          iconColorClass={step.iconColorClass}
          reverse={step.reverse}
        />
      ))}
    </div>
  );
}
