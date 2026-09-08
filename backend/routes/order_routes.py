from flask import Blueprint
from controllers.order_controller import place_order, get_customer_orders, get_all_orders, update_order_status, assign_order
from middleware.auth import token_required

order_bp = Blueprint('order', __name__)

order_bp.route('/', methods=['POST'])(token_required(['customer'])(place_order))
order_bp.route('/my-orders', methods=['GET'])(token_required(['customer'])(get_customer_orders))

# Admin routes
order_bp.route('/all', methods=['GET'])(token_required(['admin'])(get_all_orders))
order_bp.route('/<order_id>/status', methods=['PUT'])(token_required(['admin'])(update_order_status))
order_bp.route('/<order_id>/assign', methods=['PUT'])(token_required(['admin'])(assign_order))
