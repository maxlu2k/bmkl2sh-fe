import { format, parseISO } from 'date-fns'

export function useDateFormat() {
  /**
   * Hàm định dạng ngày
   * @param {string | Date} date - Ngày cần định dạng
   * @param {string} dateFormat - Định dạng mong muốn (mặc định: "dd/MM/yyyy")
   * @returns {string} Ngày đã định dạng
   */
  const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
    if (!date) return ''
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    return format(parsedDate, dateFormat)
  }

  return { formatDate }
}
