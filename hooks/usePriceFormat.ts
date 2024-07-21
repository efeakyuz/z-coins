const usePriceFormat = (price: number, currenyShow = true) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: currenyShow ? 'currency' : 'decimal',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(price);
    return formattedPrice;
}

export default usePriceFormat;