import { LoginForm } from '@/components/auth/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm type="user" />
    </div>
  )
} 