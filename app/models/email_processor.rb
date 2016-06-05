class EmailProcessor
  def initialize(email)
    @email = email
  end
  def process
    new_email = Email.new
    new_email.body = @email.body
    new_email.email = @email.from
    new_email.subject = @email.subject
    if new_email.save
      @email.attachments.each do |attachment|
        image = Image.new
        image.email_id = new_email.id
        image.file = attachment
        image.save
      end
    end
  end
end