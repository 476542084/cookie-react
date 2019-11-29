export const timeSince = (date) => {
    const today = new Date()
    const createdDate = new Date(date)
    const diffYears = Math.floor((today - createdDate) / 31556952000)
    const diffMonths = Math.floor((today - createdDate) / 2592000000)
    const diffWeeks = Math.floor((today - createdDate) / 604800000)
    const diffDays = Math.floor((today - createdDate) / 86400000)
    const diffHrs = Math.floor((today - createdDate) / 3600000)
    const diffMins = Math.round((today - createdDate) / 60000)
    const diffOther = Math.round(today - createdDate)
    const timeFormats = {
        [diffYears]: '年前',
        [diffMonths]: '个月前',
        [diffWeeks]: '周前',
        [diffDays]: '天前',
        [diffHrs]: '小时前',
        [diffMins]: '分钟前',
        [diffOther]: '刚发'
    }
    const timePassed = Math.min(...[diffOther, diffYears, diffMonths, diffWeeks, diffDays, diffHrs, diffMins].filter((num) => {return num > 0}))
    const timeSince = timeFormats[timePassed] !== '刚发' ? timePassed.toString() + timeFormats[timePassed] : timeFormats[timePassed]
    return timeSince
}