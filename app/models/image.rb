class Image < ActiveRecord::Base
  belongs_to :email
  has_attached_file :file,
                    :storage => :s3,
                    :bucket => "blocked-lane-images",
                    :styles => {:thumb => "x300"}
  after_file_post_process  :post_process_photo
  validates_attachment_content_type :file, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  def post_process_photo
    imgfile = EXIFR::JPEG.new(file.queued_for_write[:original].path)
    return unless imgfile
    self.time = imgfile.date_time
    self.longitude = imgfile.gps.longitude
    self.latitude = imgfile.gps.latitude
  end
end