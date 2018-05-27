require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsVuejs
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.generators.system_tests = nil
    config.cache_store = :redis_store, ENV['CACHE_STORE_URI'], { expires_in: 90.minutes }
    config.session_store :redis_store, servers: [ENV['SESSION_STORE_URI']], expire_after: 1.day
    config.active_job.queue_adapter = :sidekiq

    config.i18n.default_locale = :ja
    config.time_zone = 'Asia/Tokyo'
  end
end
