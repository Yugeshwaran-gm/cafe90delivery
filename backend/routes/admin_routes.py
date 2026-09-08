from flask import Blueprint
from controllers.admin_controller import get_dashboard_stats, get_customer_list, get_pending_orders, add_staff, update_staff, delete_staff, get_staff_list
from middleware.auth import token_required

admin_bp = Blueprint('admin', __name__)

admin_bp.route('/dashboard', methods=['GET'])(token_required(['admin'])(get_dashboard_stats))
admin_bp.route('/customers', methods=['GET'])(token_required(['admin'])(get_customer_list))
admin_bp.route('/orders/pending', methods=['GET'])(token_required(['admin'])(get_pending_orders))

# Staff Management
admin_bp.route('/staff', methods=['GET'])(token_required(['admin'])(get_staff_list))
admin_bp.route('/staff', methods=['POST'])(token_required(['admin'])(add_staff))
admin_bp.route('/staff/<staff_id>', methods=['PUT'])(token_required(['admin'])(update_staff))
admin_bp.route('/staff/<staff_id>', methods=['DELETE'])(token_required(['admin'])(delete_staff))
