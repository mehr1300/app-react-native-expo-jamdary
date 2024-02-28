export function formatNumber(input) {
    let num = parseInt(input)
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
