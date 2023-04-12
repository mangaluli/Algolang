const userIsOwnerOrAdmin = (current_user, item_in_question) => {
  if (current_user.is_admin) return true;
  if (current_user._id === item_in_question._id) return true;
  return false;
}

module.exports = userIsOwnerOrAdmin;