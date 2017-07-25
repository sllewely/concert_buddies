class ApplicationController < ActionController::Base
  before_action :current_user
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    # @current_user ||= User.find(session[:user_id])
    @current_user ||= User.find_by(name: 'Sarah')
  end
end
