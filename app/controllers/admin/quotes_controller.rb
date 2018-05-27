module Admin
  class QuotesController < AdminController
    def new; end

    def create
      Quote.transaction do
        @quote = Quote.new(quote_params)
        @quote.save!
        quote_detail_params.each do |detail|
          @quote_detail = QuoteDetail.new(detail)
          @quote_detail.save!
        end
      end
    end

    private

    def quote_params
      params.permit(:name)
    end

    def quote_detail_params
      params.permit(details: [:name])
    end
  end
end
