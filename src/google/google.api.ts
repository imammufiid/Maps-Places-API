export const getPlaceDetail = async (placeId: string) => {
  let formattedAddress = 'name,rating,user_ratings_total,geometry,reviews'
  let apiKey = process.env.GOOGLE_MAPS_API_KEY
  let url = `https://maps.googleapis.com/maps/api/place/details/json?fields=${formattedAddress}&place_id=${placeId}&key=${apiKey}`

  let request = await fetch(url)
  let responseJson = await request.json()
  return {
    place_id: placeId,
    ...responseJson.result,
  }
}
