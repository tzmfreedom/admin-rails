module Admin
  class QuotesController < AdminController
    def new; end

    def show
      render json: Quote.find(1).to_json(include: :quote_details)
    end

    def create
      Quote.transaction do
        @quote = Quote.new(quote_params)
        @quote.save!
        quote_detail_params[:quote_details].each do |detail|
          @quote_detail = QuoteDetail.new(detail)
          @quote_detail.save!
        end
      end
    end

    private

    def quote_params
      params.permit(:name, :quoted_at, :contact)
    end

    def quote_detail_params
      params.permit(quote_details: [:category, :item_name, :price, :quantity, :quoted_id])
    end
  end
end
