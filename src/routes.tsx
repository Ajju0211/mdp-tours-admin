import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./layouts/admin-layout"
import {Dashboard} from "./pages/dashboard"

import { SignUp } from "./components/auth/sign-up"
import { SignIn } from "./components/auth/sign-in"
import { NotFoundError } from "./components/errors/not-found-error"
import AuthProfileLayout from "./layouts/auth-layout"
import CreatePackagePage from "./components/packages/CreatePackagePage"
import SimpleTabs from "./components/packages/CreatePackagePage"
import PackageTablePage from "./components/queries/queries"

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthProfileLayout />}>
          {/* Layout Wrapper */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/query" element={<PackageTablePage />} />
            <Route path="/add-package" element={<SimpleTabs />} />

          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFoundError />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}