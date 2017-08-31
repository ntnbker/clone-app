require "shrine"
require "shrine/storage/file_system"
require "shrine/storage/s3"

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # temporary
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"), # permanent
}

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data # for forms
Shrine.plugin :logging, logger: Rails.logger
Shrine.plugin :direct_upload
Shrine.plugin :backgrounding



s3_options = {
  access_key_id:     ENV.fetch('AWS_ACCESS_KEY_ID'),
  secret_access_key:  ENV.fetch('AWS_SECRET_ACCESS_KEY'),
  region:            ENV.fetch('AWS_REGION'),
  bucket:            ENV.fetch('S3_BUCKET_NAME'),
}

Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: "cache",upload_options: { acl: 'public-read' } ,**s3_options),
  store: Shrine::Storage::S3.new(prefix: "store",upload_options: { acl: 'public-read' } ,**s3_options),
}





























