import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"
import { Label } from "../../ui/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { toast } from "react-toastify"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: "",
    phone_no: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isSignupLoading, setIsSignupLoading] = useState(false)

  // Handle login form changes
  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle signup form changes
  const handleSignupChange = (field, value) => {
    setSignupForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle login form submission
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setIsLoginLoading(true)

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("usertoken", data.token);
        localStorage.setItem("login", "true")
        toast.success("Login successful!")
        window.location.href = "/"
      } else {
        const errorData = await response.json()
        toast.error("Login failed: " + (errorData.message || "Unknown error"))
      }
    } catch (error) {
      toast.error("Error during login: " + error.message)
    } finally {
      setIsLoginLoading(false)
    }
  }

  // Handle signup form submission
  const handleSubmitSignUp = async (e) => {
    e.preventDefault()

    // Validate password confirmation
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    setIsSignupLoading(true)

    try {
      const response = await fetch("/api/v1/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          signupForm
        ),
      })

      if (response.ok) {
        toast.success("Account created successfully! Please login.")
        // Reset signup form
        setSignupForm({
          name: "",
          phone_no: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        const errorData = await response.json()
        toast.error("Sign up failed: " + (errorData.msg))
      }
    } catch (error) {
      toast.error("Error during sign up: " + error.message)
    } finally {
      setIsSignupLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">CinemaFlix</h1>
          <p className="text-gray-400">Your gateway to cinematic experiences</p>
        </div>

        <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-center text-white">Welcome</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="signin" className="data-[state=active]:bg-red-600">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-red-600">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSubmitLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => handleLoginChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => handleLoginChange("password", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to="#" className="text-sm text-red-500 hover:text-red-400">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSubmitSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={signupForm.name}
                        onChange={(e) => handleSignupChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_no">Mobile Number</Label>
                      <Input
                        id="phone_no"
                        placeholder="9876543210"
                        value={signupForm.phone_no}
                        onChange={(e) => handleSignupChange("phone_no", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => handleSignupChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => handleSignupChange("password", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={isSignupLoading}
                  >
                    {isSignupLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                By continuing, you agree to our{" "}
                <Link to="#" className="text-red-500 hover:text-red-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-red-500 hover:text-red-400">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
