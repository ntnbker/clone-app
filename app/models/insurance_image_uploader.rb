class InsuranceImageUploader < Shrine
  # plugins and uploading logic
  plugin :validation_helpers

  Attacher.validate do
    validate_mime_type_inclusion ["application/pdf","image/png", "image/jpeg"], message: "Please upload a JPEG or PNG image."
  end
end