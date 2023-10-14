import { List } from "@/components/List";
import { Registry } from "@/lib/Registry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu calendário",
};

export default async function Hub() {
  const registries = new Registry();
  await registries.fetch();

  const todaysRegistries = registries.getTodaysRegistries();
  const thisWeekRegistries = registries.getWeeksRegistries();
  const othersRegistries = registries.getOthersRegistries();

  return (
    <main className="space-y-4 px-6 py-4">
      <List
        id="todays-registries"
        collection={Array.from(todaysRegistries.entries())}
        showDays={false}
      >
        Hoje
      </List>

      <List
        id="this-weeks-registries"
        collection={Array.from(thisWeekRegistries.entries())}
        formatDatePattern="cccc' • 'd' de 'MMMM"
      >
        Esta semana
      </List>

      <hr className="m-auto  rounded border-gray-6" />

      <List
        id="more-registries"
        collection={Array.from(othersRegistries.entries())}
        formatDatePattern="d' de 'MMMM' 'yyyy' ('cccc')'"
      />
    </main>
  );
}
