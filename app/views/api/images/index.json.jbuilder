json.data @images.each do |image|
  json.id image.id
  json.full_url image.file.url
  json.thumb_url image.file.url(:thumb)
  json.longitude image.longitude
  json.latitude image.latitude
  json.created_at image.file_updated_at
end