class QuoteForm
  include ActiveModel::Model

  def initialize(params)
    @params = params
  end

  def save
    quote =
      if @params[:id]
        Quote.find(@params[:id]).tap { |q| q.assign_attributes(quote_params) }
      else
        Quote.new(quote_params)
      end

    ActiveRecord::Base.transaction do
      @params[:quote_details].each do |detail|
        detail_params = detail_params(quote, detail)
        if detail[:id]
          QuoteDetail.find(detail[:id]).tap do |q|
            q.update(detail_params)
          end
        else
          quote.quote_details.build(detail_params)
        end
      end

      quote.save!
    end
    quote
  end

  private

  def quote_params
    @params.slice(:name, :contact, :quoted_at)
  end

  def detail_params(quote, detail)
    detail.slice(:item_name, :price, :quantity).merge(quote: quote)
  end
end