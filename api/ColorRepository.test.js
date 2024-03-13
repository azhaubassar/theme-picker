import ColorRepository from './ColorRepository.js'

describe('ColorRepository', () => {
  let colorRepository;

  beforeEach(() => {
    colorRepository = new ColorRepository();
  });

  it('should return all colors when query is empty', () => {
    const result = colorRepository.searchColors('');
    expect(result).toEqual(colorRepository.colors);
  });

  it('should return matching colors when query is provided', () => {
    const expectedResult = [
      { name: "lightgoldenrodyellow", rgb: "FAFAD2" },
      { name: "lightgray", rgb: "D3D3D3" },
      { name: "lightgreen", rgb: "90EE90" },
      { name: "lightgrey", rgb: "D3D3D3" },
    ];
    const query = "lightg";
    const result = colorRepository.searchColors(query);

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array when no matching colors are found', () => {
    const query = 'nonexistent';
    const result = colorRepository.searchColors(query);
    expect(result).toEqual([]);
  });
});
