def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "user"),
        
    }
