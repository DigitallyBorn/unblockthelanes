class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def json_request?
    request.format.json?
  end

  def xml_request?
    request.format.xml?
  end
end
