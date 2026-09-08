from flask import Blueprint
from controllers.cart_controller import add_to_cart, get_cart_items, remove_from_cart, update_cart_quantity
from middleware.auth import token_required

cart_bp = Blueprint('cart', __name__)

cart_bp.route('/', methods=['GET'])(token_required(['customer'])(get_cart_items))
cart_bp.route('/', methods=['POST'])(token_required(['customer'])(add_to_cart))
cart_bp.route('/<cart_id>', methods=['PUT'])(token_required(['customer'])(update_cart_quantity))
cart_bp.route('/<cart_id>', methods=['DELETE'])(token_required(['customer'])(remove_from_cart))
