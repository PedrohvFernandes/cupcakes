const formattedCurrentYear = () => {
  let date = new Date()
  return { year: date.getFullYear() }
}

const useGetDateFormatted = () => {
  return {
    formattedCurrentYear,
  }
}

export default useGetDateFormatted
