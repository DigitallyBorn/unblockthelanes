class ImageMailer < ApplicationMailer
  def success_email(email)
    @email = email
    mail(to: @email, subject: 'Thanks for your submission!')
  end
  
  def fail_email(email)
    @email = email
    mail(to: @email, subject: 'Oops, something didn\'t work with your submission')
  end
end
