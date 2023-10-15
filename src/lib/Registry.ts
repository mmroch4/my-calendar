import { IRegistry } from "@/types/IRegistry";
import { gql } from "@apollo/client";
import { formatISO, isSameWeek } from "date-fns";
import { getClient } from "./client";

interface IClientResponse {
  data: {
    registries: IRegistry[];
  };
}

export class Registry {
  private registries: IRegistry[] = [];
  public readonly today: Date = new Date();
  public readonly todayISO = formatISO(this.today, { representation: "date" });

  private readonly fetchQueryDocument = gql`
    query GetRegistries {
      registries(
        stage: PUBLISHED
        orderBy: date_ASC
        where: { NOT: { date_lt: "${this.todayISO}" } }
        first: 1000
      ) {
        id
        title
        details
        type
        subjects
        startAt
        endAt
        date
      }
    }
  `;

  constructor() {}

  public async fetch(): Promise<void> {
    try {
      const {
        data: { registries },
      } = (await getClient().query({
        query: this.fetchQueryDocument,
      })) as IClientResponse;

      this.registries = [...registries];
    } catch (e) {
      console.error(e);

      this.registries = [];
    }
  }

  public groupByDay(registries: IRegistry[]) {
    const groups = new Map<string, IRegistry[]>();

    for (const registry of registries) {
      if (groups.has(registry.date)) {
        groups.set(registry.date, [
          ...(groups.get(registry.date) || []),
          registry,
        ]);

        continue;
      }

      groups.set(registry.date, [registry]);
    }

    return groups;
  }

  // public groupByWeek() {}

  // public groupByMonth() {}

  public getTodaysRegistries() {
    const todaysRegistries = this.registries.filter(
      ({ date }) => date === this.todayISO,
    );

    return this.groupByDay(todaysRegistries);
  }

  public getWeeksRegistries(baseWeekDate: Date = this.today) {
    const weeksRegistries = this.registries.filter(({ date }) => {
      if (date === this.todayISO) {
        return false;
      } else if (!isSameWeek(baseWeekDate, new Date(date))) {
        return false;
      }

      return true;
    });

    return this.groupByDay(weeksRegistries);
  }

  public getOthersRegistries(baseWeekDate: Date = this.today) {
    const othersRegistries = this.registries.filter(({ date }) => {
      if (date === this.todayISO) {
        return false;
      } else if (isSameWeek(baseWeekDate, new Date(date))) {
        return false;
      }

      return true;
    });

    return this.groupByDay(othersRegistries);
  }
}
