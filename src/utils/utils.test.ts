import { getHighestQualityFormat } from './utils';

describe('Test utils', () => {
  it('should return empty string if formats would be empty', () => {
    expect(getHighestQualityFormat({})).toEqual('');
  });

  it('should return only format if it has one format', () => {
    const formats = {
      one: { res: '1080p', size: 1000 },
    };

    expect(getHighestQualityFormat(formats)).toEqual('one 1080p');
  });

  it('should return highest format if all of format is different in size', () => {
    const formats = {
      one: { res: '720p', size: 700 },
      two: { res: '1080p', size: 1500 },
      three: { res: '720p', size: 800 },
    };

    expect(getHighestQualityFormat(formats)).toEqual('two 1080p');
  });

  it('should return highest format with biggest res if there are formats with same size', () => {
    const formats = {
      one: { res: '720p', size: 700 },
      two: { res: '480p', size: 1500 },
      three: { res: '720p', size: 1500 },
    };

    expect(getHighestQualityFormat(formats)).toEqual('three 720p');
  });
});
