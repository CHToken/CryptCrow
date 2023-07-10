package permissions

// RolePermissions is a map that defines the permissions for each role
var RolePermissions = map[string][]string{
	RoleAdmin:          {"admin_permission", "user_permission", "post_permission"},
	RoleMod:            {"moderator_permission", "user_permission"},
	RoleUser:           {"user_permission"},
	RoleVerifiedVendor: {"vendor_permission", "user_permission"},
}

const (
	RoleAdmin          = "admin"
	RoleMod            = "moderator"
	RoleUser           = "user"
	RoleVerifiedVendor = "verified vendor"
)
