json.data @images.each do |image|
  json.id image.id
  json.url image.file.url
  json.longitude image.longitude
  json.latitude image.latitude
  json.created_at image.file_updated_at
end