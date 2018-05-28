module Admin
  class QuotesController < AdminController
    def new; end

    def show
      @quote = Quote.eager_load(:quote_details)
                    .find(params[:id])
      respond_to do |format|
        format.html
        format.json do
          render json: @quote.to_json(include: :quote_details)
        end
      end
    end

    def create
      form = ::QuoteForm.new(quote_params)
      quote = form.save
      redirect_to admin_quote_path(quote)
    end

    def update
      form = ::QuoteForm.new(quote_params)
      quote = form.save
      redirect_to admin_quote_path(quote)
    end

    private

    def quote_params
      params.permit(:id, :name, :contact, :quoted_at, quote_details: [:id, :item_name, :price, :quantity])
    end
  end
end
