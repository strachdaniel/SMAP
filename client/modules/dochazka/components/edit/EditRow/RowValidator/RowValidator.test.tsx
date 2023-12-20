import rowValidator from './RowValidator';

describe('rowValidator', () => {
  let setErrors = () => {};

  beforeEach(() => {
    setErrors = jest.fn();
  });

  it('should return true and set no errors when from, to are null and note is empty', () => {
    const dayData = { from: null, to: null, note: '' };
    const result = rowValidator(dayData, setErrors);
    expect(result).toBe(true);
    expect(setErrors).toHaveBeenCalledWith([]);
  });

  it('should return true and set no errors when from, to are null and note is not empty', () => {
    const dayData = { from: null, to: null, note: 'note' };
    const result = rowValidator(dayData, setErrors);
    expect(result).toBe(true);
    expect(setErrors).toHaveBeenCalledWith([]);
  });

  it('should return false and set error when from is before to', () => {
    const dayData = { from: '2022-01-02', to: '2022-01-01', note: 'note' };
    const result = rowValidator(dayData, setErrors);
    expect(result).toBe(false);
    expect(setErrors).toHaveBeenCalledWith(['Od nemuze mit nizsi hodnotu jak Do']);
  });

  it('should return false and set error when from or to is null', () => {
    const dayData = { from: null, to: '2022-01-01', note: 'note' };
    const result = rowValidator(dayData, setErrors);
    expect(result).toBe(false);
    expect(setErrors).toHaveBeenCalledWith(['Nemuzes mit prazdne od a do']);
  });
});
