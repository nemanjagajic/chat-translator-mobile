export const limitTextLength = (text, limit) => {
  return text && text.length > limit ? `${(text).substring(0, limit - 3)  }...` : text
}
