/// @codegen json
/// @rename_all camelCase
/// @json content_key "data"
/// @msgpack tag_style "adjacent"
/// @firestore collection "donations"
/// @field user_id rename "userId"
/// @field amount example 42
/// @constructor User rename "user"
pub type Donation {
  User(user_id: String, amount: Int)
}
