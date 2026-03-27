/**
 * Utility for currency conversion and formatting.
 * User wants pricing to be between 2 and 4 INR but shown in USD.
 */

export const INR_TO_USD_RATE = 0.012; // Approx 1 INR = 0.012 USD (1 USD = 83.33 INR)

/**
 * Converts INR amount to USD string.
 * @param inr The amount in Indian Rupees.
 */
export const formatToUSD = (inr: number): string => {
  const usdInput = inr * INR_TO_USD_RATE;
  // Format to 2 decimal places, but if it's very small, show at least 2 digits.
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(usdInput);
};
