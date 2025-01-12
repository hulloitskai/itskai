# typed: true
# frozen_string_literal: true

module Admin
  class StatusesController < AdminController
    # == Actions
    # GET /admin/statuses
    def index
      scope = authorized_scope(Status.all)
      pagy, statuses = pagy(
        Status.from(scope, Status.table_name)
        .order(created_at: :desc, id: :asc),
      )
      render(inertia: "AdminStatusesPage", props: {
        statuses: StatusSerializer.many(statuses),
        pagination: pagy_metadata(pagy),
      })
    end

    # POST /admin/statuses
    def create
      status_params = params.require(:status).permit(:emoji, :text)
      status = Status.new(status_params)
      if status.save
        render(json: {}, status: :created)
      else
        render(
          json: { errors: status.form_errors },
          status: :unprocessable_entity,
        )
      end
    end

    # DELETE /admin/statuses/:id
    def destroy
      status = Status.find(params.fetch(:id))
      status.destroy!
      render(json: {})
    end
  end
end
