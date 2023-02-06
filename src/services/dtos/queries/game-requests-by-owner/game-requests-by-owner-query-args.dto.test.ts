import { GameRequestsByOwnerQueryArgsDto } from './game-requests-by-owner-query-args.dto';

describe('given: missing data', () => {
  describe('when: I initialize', () => {
    it('then: error matched snapshot', async () => {
      try {
        expect(new GameRequestsByOwnerQueryArgsDto().init({})).not.toBeDefined();
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });
  });
});
