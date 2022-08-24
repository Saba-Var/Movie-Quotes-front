const timeDifference = (createdDate: Date) => {
  const currentDate = new Date()
  const secs = Math.floor(
    Math.abs(Math.floor(+currentDate - +createdDate)) / 1000
  )

  const mins = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)

  let time = mins
  let timeUnit = 'min-ago'

  if (mins > 60) {
    time = hours
    timeUnit = 'hour-ago'
  }

  if (hours > 24) {
    time = days
    timeUnit = 'day-ago'
  }

  return { time, timeUnit }
}

export default timeDifference
