import { agents, difficult, maps, moment, side } from '@/data/data-valorant';

const SIZE_OF_SIDE = 2;
const SIZE_OF_MOMENT = 6;
const SIZE_OF_DIFFICULT = 3;
const SIZE_OF_AGENTS = 17;
const SIZE_OF_MAPS = 7;

describe('data-valorant', () => {
  it('should test resolve query', async () => {
    expect(side()).toHaveLength(SIZE_OF_SIDE);
    expect(moment()).toHaveLength(SIZE_OF_MOMENT);
    expect(difficult()).toHaveLength(SIZE_OF_DIFFICULT);
    expect(agents()).toHaveLength(SIZE_OF_AGENTS);
    expect(maps()).toHaveLength(SIZE_OF_MAPS);
  });
});
