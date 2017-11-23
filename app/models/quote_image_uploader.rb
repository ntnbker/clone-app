class QuoteImageUploader < Shrine
  # plugins and uploading logic
  plugin :validation_helpers
  plugin :remove_invalid
  Attacher.validate do
    validate_mime_type_inclusion ["image/png", "image/jpeg", "application/pdf"]
  end
  
end