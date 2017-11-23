class AgencyAdminProfileImageUploader < Shrine
  # plugins and uploading logic
  plugin :validation_helpers

  Attacher.validate do
    validate_mime_type_inclusion ["image/png", "image/jpeg"]
  end
end