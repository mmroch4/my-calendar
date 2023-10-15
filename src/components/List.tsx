import { IRegistry } from "@/types/IRegistry";
import { createId } from "@paralleldrive/cuid2";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HTMLProps } from "react";
import { Card } from "./Card";
import { Empty } from "./Empty";

type Props = HTMLProps<HTMLDivElement> & {
  collection: [string, IRegistry[]][];
  showDays?: boolean;
  showEmpty?: boolean;
  formatDatePattern?: string;
};

export function List({
  children,
  collection,
  showDays = true,
  showEmpty = true,
  formatDatePattern,
  ...props
}: Props) {
  return (
    <section {...props}>
      {children && (
        <h2 className="mb-1 text-xl font-bold uppercase">{children}</h2>
      )}

      <ul className="space-y-2">
        {collection.length
          ? collection.map(([date, registries]) => {
              return (
                <li key={createId()} className="space-y-1">
                  {showDays && (
                    <h3 className="text-lg font-medium">
                      {formatDatePattern
                        ? format(new Date(date), formatDatePattern, {
                            locale: ptBR,
                          })
                        : date}
                    </h3>
                  )}

                  <ul className="space-y-1">
                    {registries.map((registry) => (
                      <li key={createId()}>
                        <Card registry={registry} />
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })
          : showEmpty && <Empty />}
      </ul>
    </section>
  );
}
