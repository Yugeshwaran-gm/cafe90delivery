from flask import Blueprint
from controllers.food_controller import add_food_item, get_all_food_items, get_single_food_item, update_food_item, delete_food_item
from middleware.auth import token_required

food_bp = Blueprint('food', __name__)

# Public routes
food_bp.route('/', methods=['GET'])(get_all_food_items)
food_bp.route('/<item_id>', methods=['GET'])(get_single_food_item)

# Admin protected routes
food_bp.route('/', methods=['POST'])(token_required(['admin'])(add_food_item))
food_bp.route('/<item_id>', methods=['PUT'])(token_required(['admin'])(update_food_item))
food_bp.route('/<item_id>', methods=['DELETE'])(token_required(['admin'])(delete_food_item))
