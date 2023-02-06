import { GameRequestsByOwnerQueryResponseDto } from './game-requests-by-owner-query-response.dto';

describe('given: missing data', () => {
  describe('when: I initialize', () => {
    it('then: error matched snapshot', async () => {
      try {
        expect(new GameRequestsByOwnerQueryResponseDto().init({})).not.toBeDefined();
      } catch (e) {
        expect(e).toMatchSnapshot();
      }
    });
  });
});
