export const VisibleName = ( address ) => {
    if (!address) return "";
    const beginning = address.substring(0, 5)
    const ending = address.substring(address.length - 4)
    return `${beginning}...${ending}`
  }

export function hexToDecimal(hex) {
    return parseInt(String(hex), 16);
  }


export function FormDate (timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}