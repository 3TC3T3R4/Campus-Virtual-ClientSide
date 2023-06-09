import { EnumsNumberToStringPipe } from './enums-number-to-string.pipe';

describe('EnumsNumberToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumsNumberToStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct string', () => {
    // Arrange
    const pipe = new EnumsNumberToStringPipe();
    // Act And Assert
    expect(pipe.transform(1, 'role')).toBe('Admin');
  });

  it('should return the incorrect string', () => {
    // Arrange
    const pipe = new EnumsNumberToStringPipe();
    // Act And Assert
    expect(pipe.transform(2, 'role')).not.toBe('Admin');
  });
});
