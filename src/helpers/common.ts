export const generateFourDigitOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
