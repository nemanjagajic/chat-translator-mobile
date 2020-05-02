import moment from 'moment'

export const formatChatPreviewDate = date => {
  const isSameDay = moment(date).isSame(moment(), 'day')
  if (isSameDay) return moment(date).format('HH:mm')

  const isSameYear = moment(date).isSame(moment(), 'year')
  if (isSameYear) return moment(date).format('MMM D')

  return  moment(date).format('MMM DD, YYYY')
}

export const formatMessageDate = date => {
  return moment(date).format('HH:mm')
}
