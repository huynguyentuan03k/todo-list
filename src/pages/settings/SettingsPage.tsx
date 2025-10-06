// src/pages/SettingsPage.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsPage() {
  const [active, setActive] = useState("profile")

  return (
    <div className="flex p-6 gap-6">
      {/* Left vertical nav */}
      <nav className="w-48 flex flex-col space-y-2 border-r pr-4">
        <Button
          variant={active === "profile" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActive("profile")}
        >
          Profile
        </Button>
        <Button
          variant={active === "account" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActive("account")}
        >
          Account
        </Button>
        <Button
          variant={active === "notifications" ? "default" : "ghost"}
          className="justify-start"
          onClick={() => setActive("notifications")}
        >
          Notifications
        </Button>
      </nav>

      {/* Right content area */}
      <div className="flex-1">
        {active === "profile" && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Profile Settings</h2>
              <p>Manage your profile information here.</p>
            </CardContent>
          </Card>
        )}

        {active === "account" && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
              <p>Update your account details and password.</p>
            </CardContent>
          </Card>
        )}

        {active === "notifications" && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
              <p>Control how you receive notifications.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
