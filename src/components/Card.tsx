import { IRegistry } from "@/types/IRegistry";
import { createId } from "@paralleldrive/cuid2";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { HTMLProps } from "react";
import { MdArrowOutward, MdSchedule } from "react-icons/md";

const types = {
  test: "teste",
  hw: "tpc",
  work: "trab",
  event: "evento",
  note: "nota",
};

type CardVariantsProps = VariantProps<typeof cardVariants>;

const cardVariants = cva(
  "border border-gray-3 space-y-1 rounded p-2 bg-gray-2 text-gray-12",
  {
    variants: {
      type: {
        test: "bg-yellow-2 text-yellow-12 border-yellow-3",
        hw: "bg-blue-2 text-blue-12 border-blue-3",
        work: "bg-orange-2 text-orange-12 border-orange-3",
      },
    },
  },
);

type CardTimeVariantsProps = VariantProps<typeof cardTimeVariants>;

const cardTimeVariants = cva("flex items-center gap-1", {
  variants: {
    type: {
      test: "text-yellow-11",
      hw: "text-blue-11",
      work: "text-orange-11",
      default: "text-gray-11",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

const boxVariants = cva("rounded px-2 py-1 text-xs font-medium uppercase", {
  variants: {
    type: {
      test: "bg-yellow-5 text-yellow-12",
      hw: "bg-blue-5 text-blue-12",
      work: "bg-orange-5 text-orange-12",
      event: "bg-cyan-5 text-cyan-12",
      note: "bg-crimson-5 text-crimson-12",
    },
    subject: {
      mat: "bg-indigo-5 text-indigo-12",
      ing: "bg-iris-5 text-iris-12",
      por: "bg-grass-5 text-grass-12",
      bio: "bg-jade-5 text-jade-12",
      geo: "bg-mint-5 text-mint-12",
      edf: "bg-purple-5 text-purple-12",
      fis: "bg-plum-5 text-plum-12",
      qui: "bg-ruby-5 text-ruby-12",
      fil: "bg-tomato-5 text-tomato-12",
      ilc: "bg-teal-5 text-teal-12",
      cambridge: "bg-orange-5 text-orange-12",
      biblioteca: "bg-ruby-5 text-ruby-12",
      inline: "bg-green-5 text-green-12",
    },
  },
});

type Props = HTMLProps<HTMLDivElement> & {
  registry: IRegistry;
};

export function Card({
  registry: { type, subjects, title, startAt, endAt },
}: Props) {
  return (
    <div
      key={createId()}
      className={cardVariants({ type } as CardVariantsProps)}
    >
      <div className="flex flex-wrap items-center gap-1">
        <span className={boxVariants({ type })}>{types[type]}</span>

        {subjects.map((subject) => (
          <span key={createId()} className={boxVariants({ subject })}>
            {subject}
          </span>
        ))}
      </div>

      <h3>{title}</h3>

      {(startAt || endAt) && (
        <p className={cardTimeVariants({ type } as CardTimeVariantsProps)}>
          <MdSchedule /> {startAt || "..."} - {endAt || "..."}
        </p>
      )}

      <Link href="/" className="flex items-center gap-1 hover:underline">
        <MdArrowOutward /> Ver detalhes
      </Link>
    </div>
  );
}
