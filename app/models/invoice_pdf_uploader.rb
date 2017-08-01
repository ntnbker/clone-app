class InvoicePdfUploader < Shrine
  # plugins and uploading logic
  Shrine.plugin :determine_mime_type


  # plugin :add_metadata

  # add_metadata do |io, context|
  #   movie = FFMPEG::Movie.new(io.path)

  #   { "duration"   => movie.duration,
  #     "bitrate"    => movie.bitrate,
  #     "resolution" => movie.resolution,
  #     "frame_rate" => movie.frame_rate }
  # end
  



  # InvoicePdfUploader::Attachment.new(:pdf) 

  # add_metadata do |io, context|
  #   pdf = InvoicePdfUploader::Attachment.new(:pdf) 

  #   { "Content-Type"   => pdf.duration,
  #     "bitrate"    => movie.bitrate,
  #     "resolution" => movie.resolution,
  #     "frame_rate" => movie.frame_rate }




  # end




  # add_metadata :Content-Type do |io|
  #   PDF::Reader.new(io.path).page_count
  # end
end