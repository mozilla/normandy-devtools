import faker from "faker";

import Factory from "devtools/tests/factories";
import { ExperimenterResponse } from "devtools/types/experimenterApi";

export const experimenterResponseFactory = Factory.fromFields<
  ExperimenterResponse,
  { generateVariantsCount: number }
>({
  public_description: faker.lorem.sentence(),
  proposed_start_date: faker.date.past().getTime(),
  proposed_duration: faker.random.number(),
  start_date: faker.date.past().getTime(),
  end_date: faker.date.recent().getTime(),
  variants: ({ generateVariantsCount = 1 }) =>
    // eslint-disable-next-line prefer-spread
    Array.apply(null, { length: generateVariantsCount }).map(() => ({
      description: faker.lorem.sentence(),
    })),
});
