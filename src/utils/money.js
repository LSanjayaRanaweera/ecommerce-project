export function formatMoney(amountCents) {                          //By exporting we can use this function in other files like CheckoutPage.jsx
  return `$${( amountCents /100).toFixed(2)}`;                      //fist $ for dollar sign, second $ for string interpolation
}